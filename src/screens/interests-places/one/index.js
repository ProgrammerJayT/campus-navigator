import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icons from "@expo/vector-icons/Entypo";
import ComponentsStateContext from "../../../state-management/context/components";
import { deleteInterestsPlace } from "../../../services/interests-places";
import { styles } from "./styles";
import { AppColors } from "../../../constants/colors";
import AuthContext from "../../../state-management/context/auth";
import LocationStateContext from "../../../state-management/context/location";
import HeaderSection from "./sections/header";
import NavigationStateContext from "../../../state-management/context/navigation";

const InterestsPlaceScreen = ({ navigation, route }) => {
  const haversine = require("haversine");

  const { user } = useContext(AuthContext);

  const { location } = useContext(LocationStateContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const { interestsPlace } = useContext(NavigationStateContext);

  const handleDeleteUser = async () => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: true,
    }));

    const response = await deleteInterestsPlace(interestsPlace.id);

    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: false,
    }));

    if (response.message)
      return navigation.navigate("Interests Places", {
        message: response.message,
      });

    console.log("Delete response", response);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSection title={interestsPlace?.name} />

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Icons name="location" size={20} color={"black"} />
        <Text style={{ marginHorizontal: 10, fontSize: 11 }}>
          GPS: {`${interestsPlace.latitude}, ${interestsPlace.longitude}`}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Icons name="calendar" size={20} color={"black"} />
        <Text style={{ marginHorizontal: 10, fontSize: 10 }}>
          Date created: {`${interestsPlace.createDate}`}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Icons name="users" size={20} color={"black"} />
        <Text style={{ marginHorizontal: 10, fontSize: 10 }}>
          Visits: {`${interestsPlace.createDate}`}
        </Text>
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.buttonsContainer}>
        {user.type !== "admin" ? (
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              flex: 1,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "white",
                textAlign: "center",
                paddingVertical: 10,
                marginHorizontal: 5,
              }}
            >
              Go now
            </Text>
            <Icons name="direction" size={20} color={AppColors.background} />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "black",
                marginRight: 10,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Interests Place Bounds", {
                  interestsPlace: interestsPlace,
                })
              }
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  textAlign: "center",
                  paddingVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                Manage
              </Text>
              <Icons name="cog" size={20} color={AppColors.background} />
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "black",
                marginLeft: 10,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Navigate to Interests Place")}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  textAlign: "center",
                  paddingVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                Directions
              </Text>
              <Icons name="direction" size={20} color={AppColors.background} />
            </TouchableOpacity> */}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default InterestsPlaceScreen;
