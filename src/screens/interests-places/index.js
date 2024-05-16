import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const InterestsPlacesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Interests Places Screen</Text>
    </SafeAreaView>
  );
};

export default InterestsPlacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
