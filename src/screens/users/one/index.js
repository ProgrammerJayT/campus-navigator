import {
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { AppColors } from "../../../constants/colors";
import ComponentsStateContext from "../../../state-management/context/components";
import {
  deleteUser,
  getUser,
  manageAccess,
  updateUser,
} from "../../../services/users";
import HeaderSection from "../sections/header";
import UserForm from "../../../components/form/users";
import { styles } from "./styles";
import Toast from "react-native-root-toast";
import { failedRequest } from "../../../services/exception";
import PromptModal from "../../../components/modal/prompt";
import { fetchVisits } from "../../../services/visits";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UserScreen = ({ navigation, route }) => {
  const { paramsUserId } = route.params;

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [form, setForm] = useState({
    visible: false,
    delete: false,
    lock: false,
  });

  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    type: "",
    status: "",
  });

  const [userType, setUserType] = useState();
  const [userLogins, setUserLogins] = useState(0);
  const [visitsCount, setVisitsCount] = useState(0);

  const callGetUser = async () => {
    const getUserResponse = await getUser(paramsUserId);

    if (getUserResponse.response)
      return toastMessage(failedRequest(getUserResponse).message, "danger");

    const fetchedUser = getUserResponse.user;

    if (fetchedUser) {
      setUser((prevUser) => {
        const updatedUser = { ...prevUser, ...fetchedUser };
        setUserType(updatedUser.type);
        return updatedUser;
      });
    }

    setUserLogins(fetchedUser?.logins?.count);

    console.log("Response", fetchedUser);
  };

  useEffect(() => {
    callFetchVisits();
    callGetUser();
  }, []);

  const handleDeleteUser = async () => {
    toggleLoader(true);
    const response = await deleteUser(paramsUserId);
    toggleLoader(false);

    if (response.message)
      return navigation.navigate("Users", { message: response.message });

    console.log("Delete response", response);
  };

  const handleAccountAccess = async (intention) => {
    toggleLoader(true);
    const accountAccessResponse = await manageAccess(paramsUserId, intention);
    toggleLoader(false);

    setForm({ ...form, lock: false });

    let requestFailed = accountAccessResponse?.response ? true : false;

    toastMessage(
      requestFailed
        ? failedRequest(accountAccessResponse).message
        : accountAccessResponse.message,
      requestFailed ? "danger" : "success"
    );

    if (!requestFailed) return callGetUser();
  };

  const handleFormSubmit = async (values) => {
    //
    values["type"] = userType;
    values["id"] = paramsUserId;

    console.log("Values", values);

    toggleLoader(true);
    const updateUserResponse = await updateUser(values);

    let requestFailed = updateUserResponse?.response ? true : false;

    toastMessage(
      requestFailed
        ? failedRequest(updateUserResponse).message
        : updateUserResponse.message,
      requestFailed ? "danger" : "success"
    );

    if (updateUserResponse.message) {
      await callGetUser();
    }

    setForm({ ...form, visible: false });

    toggleLoader(false);
  };

  const handleDeletePrompt = (intent) => {
    if (intent === "cancel") {
      return setForm({ ...form, lock: false, delete: false });
    }
    console.log("Intent", intent);

    if (form.delete) return handleDeleteUser();

    if (form.lock) return handleAccountAccess("locked");
  };

  const callFetchVisits = async () => {
    toggleLoader(true);

    let filters = {
      userId: paramsUserId,
    };

    const fetchVisitsResponse = await fetchVisits(filters);

    console.log("Fetch visits response", fetchVisitsResponse);

    let requestFailed = fetchVisitsResponse?.response ? true : false;

    if (requestFailed) {
      setVisitsCount(0);
      toastMessage(failedRequest(fetchVisitsResponse).message, "danger");
    } else {
      setVisitsCount(fetchVisitsResponse?.visits?.length);
    }

    toggleLoader(false);
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
    <SafeAreaView style={styles.root}>
      <View
        style={[
          styles.container,
          { opacity: form.visible || form.delete || form.lock ? 0.1 : 1 },
        ]}
      >
        <HeaderSection title={`${user?.name} ${user?.surname}`} />

        <View style={{ marginBottom: 50 }} />

        <Text style={{ textAlign: "center" }}>
          Email address: {user?.email}
        </Text>

        <Text style={{ textAlign: "center" }}>Account Type: {user?.type}</Text>

        <Text style={{ textAlign: "center", marginVertical: 20 }}>
          Account Status: {user?.status}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <View
            style={{ flex: 1, paddingHorizontal: 10, alignItems: "center" }}
          >
            <Text style={{ fontSize: 60 }}>{userLogins}</Text>
            <Text>logins</Text>

            <View style={{ marginBottom: 10 }} />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("User Logins", {
                  paramsUserId: paramsUserId,
                });
              }}
              style={{
                backgroundColor: AppColors.primary,
                borderRadius: 5,
                width: "100%",
                padding: 5,
              }}
            >
              <Text
                style={{ color: AppColors.background, textAlign: "center" }}
              >
                Login History
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ flex: 1, paddingHorizontal: 10, alignItems: "center" }}
          >
            <Text style={{ fontSize: 60 }}>{visitsCount}</Text>
            <Text>visits</Text>

            <View style={{ marginBottom: 10 }} />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("User Visits", {
                  paramsUserId: paramsUserId,
                })
              }
              style={{
                backgroundColor: AppColors.primary,
                borderRadius: 5,
                width: "100%",
                padding: 5,
              }}
            >
              <Text
                style={{ color: AppColors.background, textAlign: "center" }}
              >
                Visit History
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.buttonsContainer}>
          <View style={{ flex: 1, textAlign: "center" }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                if (user?.status === "active")
                  return setForm({ ...form, lock: true });

                return handleAccountAccess("active");
              }}
            >
              <MaterialCommunityIcons
                name={`account-lock${user?.status === "locked" ? "-open" : ""}`}
                size={20}
                color={
                  AppColors[user?.status === "locked" ? "success" : "danger"]
                }
              />
              <Text>{user?.status === "locked" ? "Unlock" : "Lock"}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, marginBottom: 10, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => setForm({ ...form, delete: !form.delete })}
              style={{
                alignItems: "center",
                backgroundColor: AppColors.danger,
                padding: 10,
                borderRadius: 1000,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 1,
                shadowRadius: 5,
                width: 70,
                height: 70,
              }}
            >
              <MaterialCommunityIcons
                name="delete-empty-outline"
                size={50}
                color={AppColors.background}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => setForm({ ...form, visible: true })}
            >
              <MaterialCommunityIcons
                name="account-edit"
                size={20}
                color={AppColors.success}
              />
              <Text>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {form.visible && (
        <View style={styles.formContainer}>
          <View style={{ alignItems: "center", marginBottom: -12, zIndex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setForm({ ...form, visible: false });
              }}
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

          <HeaderSection title={"Update Account Information"} />

          <View style={{ marginHorizontal: 10, marginTop: 20 }}>
            <UserForm
              handleFormSubmit={handleFormSubmit}
              setUserType={(e) => setUserType(e)}
              userType={userType}
              user={user}
            />
          </View>
        </View>
      )}

      {(form.delete || form.lock) && (
        <PromptModal
          message={`Are you sure that you want to ${
            form.delete ? "delete" : form.lock ? "lock" : ""
          } this account?`}
          handleClick={handleDeletePrompt}
        />
      )}
    </SafeAreaView>
  );
};

export default UserScreen;
