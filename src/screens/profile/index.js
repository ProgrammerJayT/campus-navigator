import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icons from "@expo/vector-icons/FontAwesome5";
import { AppColors } from "../../constants/colors";
import ComponentsStateContext from "../../state-management/context/components";
import SlideButton from "rn-slide-button";
import { logout } from "../../services/auth";
import AuthContext from "../../state-management/context/auth";
import Toast from "react-native-root-toast";
import { failedRequest } from "../../services/exception";

const ProfileScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  useEffect(() => {
    console.log("Current user", user);
  }, []);

  const handleReachedToEnd = async () => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: true,
    }));

    const response = await logout();

    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: false,
    }));

    console.log("Logout response", response);

    if (response.message) return navigation.navigate("Welcome");

    Toast.show(failedRequest(response).message, {
      duration: Toast.durations.LONG,
      backgroundColor: "red",
      position: 20,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Icons name="user-alt" size={100} color={AppColors.secondary} />
        <Text style={styles.name}>{`${user?.name} ${user?.surname}`}</Text>
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.buttonsContainer}>
        {/* <View style={[styles.buttonContainer, { flex: 1 }]}>
          <TouchableOpacityComponent text={"Edit"} type={AppColors.secondary} />
        </View> */}

        <View style={[styles.buttonContainer, { flex: 1 }]}>
          <SlideButton
            title={"Logout"}
            autoReset
            underlayStyle={{ backgroundColor: "red" }}
            containerStyle={{
              padding: 0,
              backgroundColor: "red",
            }}
            autoResetDelay={100}
            onReachedToEnd={handleReachedToEnd}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  name: {
    fontSize: 20,
    marginTop: 10,
    color: AppColors.secondary,
    fontWeight: "bold",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    // flex: 1,
    marginHorizontal: 20,
  },
});
