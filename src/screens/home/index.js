import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import GetUserLocation from "../../utils/location";
import HomeLogo from "../../../assets/images/home.png";
import TouchableOpacityComponent from "../../components/touchable-opacity";
import { AppColors } from "../../constants/colors";
import { styles } from "./styles";
import MapComponent from "../../components/map";
import Icons from "@expo/vector-icons/FontAwesome5";
import ComponentsStateContext from "../../state-management/context/components";
import LocationStateContext from "../../state-management/context/location";
import AuthContext from "../../state-management/context/auth";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const { location, loading } = useContext(LocationStateContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const handleNavigation = (route) => {
    navigation.navigate(route);
  };

  useEffect(() => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: loading,
    }));
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {location && (
          <View style={styles.map}>
            <MapComponent coords={location} />
          </View>
        )}

        <View style={{ flex: 1 }} />

        <Image source={HomeLogo} style={styles.logo} resizeMode="contain" />

        <View style={{ flex: 1 }} />

        <View
          style={{
            marginBottom: 20,
            paddingHorizontal: 10,
            marginTop: -25,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: AppColors.secondary,
              height: 2,
              marginRight: 10,
            }}
          />

          <TouchableOpacity
            onPress={() => handleNavigation("Profile")}
            style={{
              borderRadius: 20,
              backgroundColor: AppColors.secondary,
              width: "50%",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                padding: 20,
              }}
            >
              Hello, {user.name}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              backgroundColor: AppColors.secondary,
              height: 2,
              marginLeft: 10,
            }}
          />
        </View>

        <View style={styles.buttonsContainer}>
          {user.type === "admin" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNavigation("Users")}
            >
              <Text style={styles.buttonText}>Users</Text>
              <View style={{ marginHorizontal: 5 }} />
              <Icons name="users" size={20} color="white" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation("User Logins")}
          >
            <Text style={styles.buttonText}>User Logins</Text>
            <View style={{ marginHorizontal: 5 }} />
            <Icons name="clipboard-list" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation("Interests Places")}
          >
            <Text style={styles.buttonText}>Interests Places</Text>
            <View style={{ marginHorizontal: 5 }} />
            <Icons name="volleyball-ball" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation("Visits")}
          >
            <Text style={styles.buttonText}>Visits</Text>
            <View style={{ marginHorizontal: 5 }} />
            <Icons name="hospital-user" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
