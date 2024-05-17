import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TouchableOpacityComponent from "../../../components/touchable-opacity";
import { AppColors } from "../../../constants/colors";
import Icons from "@expo/vector-icons/FontAwesome5";
import ComponentsStateContext from "../../../state-management/context/components";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { fetchInterestsPlaces } from "../../../services/interests-places";
import InterestsPlacesList from "../../../components/flatlist/interests-places";
import { styles } from "./styles";

const InterestsPlacesScreen = ({ navigation }) => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [interestsPlaces, setInterestsPlaces] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: true,
        }));
        const response = await fetchInterestsPlaces();

        setInterestsPlaces(
          response.interestsPlaces.length ? response.interestsPlaces : []
        );

        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: false,
        }));
      };

      fetchUsers();
    }, [])
  );

  const gotoCreateScreen = () => {
    navigation.navigate("Create Interests Place");
  };

  const handleInterestsPlaceClick = (interestsPlace) => {
    navigation.navigate("Interests Place", {
      interestsPlace: interestsPlace,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {interestsPlaces.length ? (
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: "#fff" }]}>
              Interests Places
            </Text>
            <View style={{ marginHorizontal: 5 }} />
            <Icons name="volleyball-ball" size={20} color="white" />
          </View>

          <InterestsPlacesList
            interestsPlaces={interestsPlaces}
            handleInterestsPlaceClick={(interestsPlace) =>
              handleInterestsPlaceClick(interestsPlace)
            }
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

      {!lottieLoadingComponent.visible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacityComponent
            handleOnPress={gotoCreateScreen}
            text={"Create new"}
            type={AppColors.secondary}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default InterestsPlacesScreen;
