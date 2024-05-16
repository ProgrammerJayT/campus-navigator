import React, { useState } from "react";
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
} from "react-native";
import RegisterLogo from "../../../../assets/images/register.png";
import { Formik } from "formik";
import * as Yup from "yup";
import TouchableOpacityComponent from "../../../components/touchable-opacity";
import { AppColors } from "../../../constants/colors";
import { styles } from "./styles";
import SpinnerComponent from "../../../components/spinner";
import { login } from "../../../services/auth";
import { failedRequest } from "../../../services/exception";
import Toast from "react-native-root-toast";
import { axiosHeaders } from "../../../services/config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", values);

    setLoading(true);
    const response = await login(values);
    setLoading(false);

    if (!response.token) {
      Toast.show(failedRequest(response).message, {
        duration: Toast.durations.LONG,
        backgroundColor: "red",
      });

      console.log("Login response", failedRequest(response).message);
    } else {
      console.log("Token", response.token);

      const saveToken = async () => {
        await AsyncStorage.setItem("token", response.token);
      };

      saveToken();
      axiosHeaders();

      navigation.navigate("Home", { old: true });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text
              style={{ textAlign: "center", fontSize: 25, marginBottom: 15 }}
            >
              Login
            </Text>
            <Image source={RegisterLogo} style={styles.logo} />

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Invalid email")
                  .required("Email is required"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={handleFormSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Email"
                      style={styles.textInput}
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Password"
                      style={styles.textInput}
                      secureTextEntry
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    {errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={{ marginTop: 50 }}>
                    <TouchableOpacityComponent
                      size={"m"}
                      type={AppColors.secondary}
                      text={"Submit"}
                      disabled={!isValid}
                      handleOnPress={handleSubmit}
                    />
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
