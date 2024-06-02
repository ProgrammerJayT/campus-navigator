import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import NavigationStateContext from "../../../state-management/context/navigation";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

const NavigationListener = () => {
  const navigation = useNavigation();
  const { isNavigating, interestsPlace } = useContext(NavigationStateContext);

  const handleOnPress = () => {
    navigation.navigate("Navigate to Interests Place");
  };

  return isNavigating ? (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.buttonText}>
          Navigating to {interestsPlace?.name}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  ) : null;
};

export default NavigationListener;
