import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import WelcomeLogo from "../../../assets/images/welcome.png";
import TouchableOpacityComponent from "../../components/touchable-opacity";
import { AppColors } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpinnerComponent from "../../components/spinner";
import { verifyToken } from "../../services/auth";
import { failedRequest } from "../../services/exception";
import Toast from "react-native-root-toast";
import ComponentsStateContext from "../../state-management/context/components";

const WelcomeScreen = ({ navigation }) => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      setLottieLoadingComponent((lottieLoadingComponent) => ({
        ...lottieLoadingComponent,
        visible: true,
      }));

      const token = await AsyncStorage.getItem("token");

      if (token) {
        const tokenValid = await verifyToken();

        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: false,
        }));

        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: false,
        }));

        if (tokenValid?.response) {
          Toast.show("Session ended. Please login", {
            duration: Toast.durations.LONG,
            backgroundColor: "red",
            position: 20,
          });
        } else {
          handleNavigation("Home");
        }
      }
    };

    checkToken();
  }, []);

  const handleNavigation = (route) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      {lottieLoadingComponent && (
        <SpinnerComponent visible={lottieLoadingComponent} />
      )}

      <Image source={WelcomeLogo} style={styles.logo} resizeMode="contain" />

      {!lottieLoadingComponent.visible && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacityComponent
              size={"m"}
              type={AppColors.primary}
              text={"Sign Up"}
              handleOnPress={() => {
                handleNavigation("Register");
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacityComponent
              size={"m"}
              type={AppColors.secondary}
              text={"Sign In"}
              handleOnPress={() => {
                handleNavigation("Login");
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  logo: {
    flex: 1, // Take up available space
    width: "100%",
  },

  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
