import {
  SafeAreaView,
  Text,
  View,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  KeyboardAvoidingView,
  UIManager,
} from "react-native";
import React, { useContext, useState } from "react";
import { createUser, getUsers } from "../../../services/users";
import TouchableOpacityComponent from "../../../components/touchable-opacity";
import { AppColors } from "../../../constants/colors";
import UsersList from "../../../components/flatlist/users";
import ComponentsStateContext from "../../../state-management/context/components";
import { useFocusEffect } from "@react-navigation/native";
import HeaderSection from "../sections/header";
import { styles } from "./styles";
import Toast from "react-native-root-toast";
import UserForm from "../../../components/form/users";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { failedRequest } from "../../../services/exception";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UsersScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    visible: false,
    submitted: false,
  });

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [users, setUsers] = useState([]);

  const [userType, setUserType] = useState("user");

  const fetchUsers = async () => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: true,
    }));
    const response = await getUsers();

    setUsers(response.users.length ? response.users : []);

    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: false,
    }));
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleUserClick = (user) => {
    navigation.navigate("User", { paramsUserId: user?.id });
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    values["type"] = userType;
    console.log("Values", values);

    setLottieLoadingComponent((loading) => ({ ...loading, visible: true }));

    const createUserResponse = await createUser(values);

    if (createUserResponse.message) {
      resetForm();
      fetchUsers();
    }

    console.log("User create response", createUserResponse);

    setLottieLoadingComponent((loading) => ({ ...loading, visible: false }));
    Toast.show(
      createUserResponse?.response
        ? failedRequest(createUserResponse).message
        : "User registered successfully",
      {
        duration: Toast.durations.LONG,
        backgroundColor:
          AppColors[createUserResponse?.response ? "danger" : "success"],
      }
    );
  };

  const handleCreateUserClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setForm({ ...form, visible: !form.visible });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container]}
    >
      <SafeAreaView style={[styles.root]}>
        <View style={styles.container}>
          <View style={[styles.container, { opacity: form.visible ? 0.1 : 1 }]}>
            {users.length ? (
              <View style={{ flex: 1 }}>
                <HeaderSection title={"Users"} />

                <UsersList
                  users={users}
                  handleUserClick={(user) => handleUserClick(user)}
                />
              </View>
            ) : (
              <View style={styles.loadingTextContainer}>
                <Text style={styles.title}>No users found</Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacityComponent
                handleOnPress={handleCreateUserClick}
                text={"Create new"}
                type={AppColors.primary}
              />
            </View>
          </View>

          {form.visible && (
            <View style={styles.formContainer}>
              <View
                style={{ alignItems: "center", marginBottom: -12, zIndex: 1 }}
              >
                <TouchableOpacity
                  onPress={handleCreateUserClick}
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
              <HeaderSection title={"New Account Form"} />
              <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <UserForm
                  handleFormSubmit={handleFormSubmit}
                  setUserType={(e) => setUserType(e)}
                  userType={userType}
                />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default UsersScreen;
