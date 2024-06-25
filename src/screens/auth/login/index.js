import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import LoginImage from "../../../../assets/images/login.png";
import { Formik } from "formik";
import * as Yup from "yup";
import TouchableOpacityComponent from "../../../components/touchable-opacity";
import { AppColors } from "../../../constants/colors";
import { styles } from "./styles";
import {
  createPassword,
  fetchUser,
  login,
  verifyAccount,
} from "../../../services/auth";
import { failedRequest } from "../../../services/exception";
import Toast from "react-native-root-toast";
import { axiosHeaders } from "../../../services/config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ComponentsStateContext from "../../../state-management/context/components";
import AuthContext from "../../../state-management/context/auth";
import HeaderSection from "../../../components/screens/header";
import LoginPasswordFormComponent from "../../../components/form/set-password/login";
import LoginForm from "../../../components/form/login";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import CreatePasswordFormComponent from "../../../components/form/set-password/create";

const LoginScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [modal, setModal] = useState({
    password: false,
    email: "",
  });

  const [intention, setIntention] = useState("create");

  const handleFormSubmitVerify = async (values) => {
    toggleLoader(true);
    const verifyAccountResponse = await verifyAccount(values?.email);

    let requestFailed = verifyAccountResponse.response ? true : false;

    if (requestFailed) {
      toggleLoader(false);
      return toastMessage(
        failedRequest(verifyAccountResponse).message,
        "danger"
      );
    }

    let status = verifyAccountResponse.status;

    if (status === "locked") {
      toggleLoader(false);
      return toastMessage(
        "Your account has been locked by the administrator",
        "danger"
      );
    }

    let isPasswordSet = verifyAccountResponse.password === "set" ? true : false;

    setIntention(isPasswordSet ? "login" : "create");
    setModal({ ...modal, password: true, email: values?.email });
    return toggleLoader(false);
  };

  const handleFormSubmitLogin = async (values, { resetForm }) => {
    toggleLoader(true);

    const loginResponse = await login({
      email: modal.email,
      password: values?.password,
    });

    let requestFailed = loginResponse.response ? true : false;

    if (requestFailed) {
      toggleLoader(false);
      return toastMessage(failedRequest(loginResponse).message, "danger");
    }

    const saveToken = async () => {
      await AsyncStorage.setItem("token", loginResponse.token);
    };

    saveToken();
    axiosHeaders();

    const loggedUserResponse = await fetchUser();
    setUser((user) => ({ ...user, ...loggedUserResponse?.user }));
    toggleLoader(false);

    return navigation.navigate("Home", { old: true });
  };

  const handleFormSubmitCreatePassword = async (values, { resetForm }) => {
    toggleLoader(true);

    let credentials = {
      email: modal.email,
      password: values?.password,
      verifyPassword: values?.verifyPassword,
    };

    const createPasswordResponse = await createPassword(credentials);

    let requestFailed = createPasswordResponse.response ? true : false;

    if (requestFailed) {
      toggleLoader(false);
      return toastMessage(
        failedRequest(createPasswordResponse).message,
        "danger"
      );
    }

    toastMessage(createPasswordResponse.message, "success");

    const loginResponse = await login({
      email: modal.email,
      password: values?.password,
    });

    requestFailed = loginResponse.response ? true : false;

    if (requestFailed) {
      toggleLoader(false);
      return toastMessage(failedRequest(loginResponse).message, "danger");
    }

    const saveToken = async () => {
      await AsyncStorage.setItem("token", loginResponse.token);
    };

    saveToken();
    axiosHeaders();

    const loggedUserResponse = await fetchUser();
    setUser((user) => ({ ...user, ...loggedUserResponse?.user }));
    toggleLoader(false);

    return navigation.navigate("Home", { old: true });
  };

  const toggleLoader = (visibility) => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: visibility,
    }));
  };

  const toastMessage = (message, severity) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: AppColors[severity],
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.root}>
          <View
            style={[styles.container, { opacity: modal.password ? 0.1 : 1 }]}
          >
            <HeaderSection title={"Login"} />
            <ScrollView
              contentContainerStyle={styles.formContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={{ flex: 1 }}>
                <Image source={LoginImage} style={styles.logo} />
              </View>

              <LoginForm handleFormSubmit={handleFormSubmitVerify} />
            </ScrollView>
          </View>

          {modal.password && (
            <View style={styles.passwordFormContainer}>
              <View
                style={{ alignItems: "center", marginBottom: -12, zIndex: 1 }}
              >
                <TouchableOpacity
                  onPress={() => setModal({ ...modal, password: false })}
                  style={{
                    borderRadius: 100,
                    backgroundColor: AppColors.primary,
                  }}
                >
                  <AntDesignIcons
                    name="closecircleo"
                    size={25}
                    color={AppColors.background}
                  />
                </TouchableOpacity>
              </View>
              {intention === "login" && (
                <LoginPasswordFormComponent
                  email={modal.email}
                  handleFormSubmit={handleFormSubmitLogin}
                />
              )}
              {intention === "create" && (
                <CreatePasswordFormComponent
                  email={modal.email}
                  handleFormSubmit={handleFormSubmitCreatePassword}
                />
              )}
              {/* {intention === "update" && <LoginPasswordFormComponent />} */}
            </View>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
