import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import HeaderSection from "../sections/header";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { AppColors } from "../../../constants/colors";
import ComponentsStateContext from "../../../state-management/context/components";
import { fetchBounds } from "../../../services/interests-places";
import Toast from "react-native-root-toast";
import Compass from "../../../utils/compass";
import LocationStateContext from "../../../state-management/context/location";
import MapComponent from "../../../components/map";
import NavigationStateContext from "../../../state-management/context/navigation";
import { cardinalPoints } from "../../../utils/cardinal-points";
import AuthContext from "../../../state-management/context/auth";
import { fetchVisits } from "../../../services/visits";

const NavigationScreen = ({ navigation, route }) => {
  const {
    isNavigating,
    setIsNavigating,
    visits,
    setVisits,
    setBounds,
    distance,
    interestsPlace,
    bearingToDestination,
  } = useContext(NavigationStateContext);

  const { user } = useContext(AuthContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const { location } = useContext(LocationStateContext);

  useEffect(() => {
    callFetchBounds();
  }, []);

  const toggleLoader = (visibility) => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: visibility,
    }));
  };

  const callFetchBounds = async () => {
    const fetchBoundsResponse = await fetchBounds();

    console.log(
      "Fetch bounds response in navigation layout",
      fetchBoundsResponse
    );

    if (fetchBoundsResponse?.response) {
      setBounds([]);
      toastMessage(failedRequest(fetchBoundsResponse).message, "danger");
    } else {
      setBounds(fetchBoundsResponse.bounds);
    }
  };

  const toastMessage = (message, severity) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: AppColors[severity],
    });
  };

  return (
    <View style={styles.container}>
      <MapComponent coords={location} />
      <View style={styles.content}>
        <HeaderSection
          title={isNavigating ? "En Route" : "Ready to navigate"}
          isNavigating={isNavigating}
        />

        {user?.type === "admin" && (
          <SafeAreaView
            style={{
              zIndex: 1,
              width: "100%",
              alignSelf: "center",
              alignItems: "center",
              marginTop: -10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: AppColors.background,
                padding: 15,
                borderRadius: 1000,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 1,
                shadowRadius: 5,
              }}
              onPress={() => {
                //
                navigation.navigate("Interests Place", {
                  paramsInterestsPlaceId: interestsPlace?.id,
                });
              }}
            >
              <FontAwesome5 name={"cogs"} size={20} color={AppColors.dark} />
            </TouchableOpacity>
          </SafeAreaView>
        )}

        <Compass />

        <View style={{ flex: 1 }} />

        <Text style={[styles.tripInfoText]}>Destination</Text>

        <Text
          style={[styles.tripInfoText, { fontSize: 20, fontWeight: "bold" }]}
        >
          {interestsPlace?.name}
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("User Visits", {
              paramsUserId: user.id,
              paramsInterestsPlaceId: interestsPlace.id,
            })
          }
          onLongPress={() =>
            navigation.navigate("User Visits", {
              paramsUserId: user.id,
            })
          }
        >
          <Text style={[styles.tripInfoText]}>Visits</Text>

          <Text
            style={[styles.tripInfoText, { fontSize: 20, fontWeight: "bold" }]}
          >
            {visits?.length}
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <View style={styles.footerContainer}>
          <View style={styles.tripInfoContainer}>
            <MaterialCommunityIcons
              name={"map-marker-distance"}
              size={20}
              color={AppColors.success}
            />
            <Text style={[styles.tripInfoHeader, styles.tripInfoText]}>
              {distance}M
            </Text>
            <Text style={[styles.tripInfoText, { fontSize: 10 }]}>
              to destination
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.navigateButton,
              { shadowColor: AppColors[isNavigating ? "danger" : "success"] },
            ]}
            onPress={() => {
              //
              setIsNavigating(!isNavigating);
            }}
          >
            <FontAwesome5
              name={`${isNavigating ? "flag-checkered" : "map-marked-alt"}`}
              size={35}
              color={AppColors.dark}
            />
          </TouchableOpacity>

          <View style={styles.tripInfoContainer}>
            <FontAwesome5
              name={"walking"}
              size={20}
              color={AppColors.success}
            />
            <Text style={[styles.tripInfoHeader, styles.tripInfoText]}>
              {bearingToDestination}°
            </Text>
            <Text style={[styles.tripInfoText, { fontSize: 10 }]}>
              {cardinalPoints(bearingToDestination)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NavigationScreen;
