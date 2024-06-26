import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import WelcomeLogo from "../../../assets/images/welcome.png";
import TouchableOpacityComponent from "../../components/touchable-opacity";
import { AppColors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpinnerComponent from "../../components/spinner";
import { fetchUser, verifyToken } from "../../services/auth";
import { failedRequest } from "../../services/exception";
import Toast from "react-native-root-toast";
import ComponentsStateContext from "../../state-management/context/components";
import AuthContext from "../../state-management/context/auth";
import { styles } from "./styles";

const WelcomeScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  useEffect(() => {
    const checkToken = async () => {
      toggleLoader(true);

      const token = await AsyncStorage.getItem("token");

      if (token) {
        const tokenValid = await verifyToken();

        if (tokenValid.response) return toggleLoader(false);

        const fetchUserResponse = await fetchUser();
        toggleLoader(false);

        let requestFailed = fetchUserResponse.response ? true : false;

        if (requestFailed) {
          return toastMessage(
            failedRequest(fetchUserResponse).message,
            "danger"
          );
        } else {
          setUser((user) => ({
            ...user,
            ...fetchUserResponse?.user,
          }));

          return handleNavigation("Home");
        }
      }

      return toggleLoader(false);
    };

    checkToken();
  }, []);

  const handleNavigation = (route) => {
    navigation.navigate(route);
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
      <View style={styles.container}>
        <Text style={styles.headingText}>Campus Orient</Text>

        <Image source={WelcomeLogo} style={styles.logo} resizeMode="contain" />

        {!lottieLoadingComponent.visible && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacityComponent
                size={"m"}
                type={AppColors.primary}
                text={"Get Started"}
                handleOnPress={() => {
                  handleNavigation("Login");
                }}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
