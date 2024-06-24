import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TouchableOpacityComponent from "../../../components/touchable-opacity";
import { AppColors } from "../../../constants/colors";
import Icons from "@expo/vector-icons/FontAwesome5";
import ComponentsStateContext from "../../../state-management/context/components";
import { useFocusEffect } from "@react-navigation/native";
import { fetchInterestsPlaces } from "../../../services/interests-places";
import InterestsPlacesList from "../../../components/flatlist/interests-places";
import { styles } from "./styles";
import { failedRequest } from "../../../services/exception";
import AuthContext from "../../../state-management/context/auth";
import Toast from "react-native-root-toast";
import NavigationStateContext from "../../../state-management/context/navigation";
import HeaderSection from "../sections/header";

const InterestsPlacesScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const { setInterestsPlace } = useContext(NavigationStateContext);

  const [interestsPlaces, setInterestsPlaces] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const callFetchInterestsPlaces = async () => {
        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: true,
        }));

        const fetchInterestsPlacesResponse = await fetchInterestsPlaces();

        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: false,
        }));

        if (fetchInterestsPlacesResponse.response) {
          Toast.show(failedRequest(fetchInterestsPlacesResponse), {
            duration: Toast.durations.LONG,
            backgroundColor: AppColors.success,
          });

          return setInterestsPlaces([]);
        }

        return setInterestsPlaces(fetchInterestsPlacesResponse.interestsPlaces);
      };

      callFetchInterestsPlaces();
    }, [])
  );

  const handleInterestsPlaceClick = (interestsPlace) => {
    setInterestsPlace(interestsPlace);
    navigation.navigate("Navigate to Interests Place");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSection title={"Interests Places"} />

      {interestsPlaces.length ? (
        <View style={{ flex: 1 }}>
          <InterestsPlacesList
            interestsPlaces={interestsPlaces}
            handleInterestsPlaceClick={handleInterestsPlaceClick}
          />
        </View>
      ) : (
        <View style={styles.noUsersContainer}>
          <Text style={styles.title}>
            {lottieLoadingComponent.visible
              ? "Fetching places of interests"
              : "No places of interests found"}
          </Text>
        </View>
      )}

      {!lottieLoadingComponent.visible && user.type === "admin" && (
        <View style={styles.buttonContainer}>
          <TouchableOpacityComponent
            handleOnPress={() => navigation.navigate("Create Interests Place")}
            text={"Create new"}
            type={AppColors.primary}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default InterestsPlacesScreen;
