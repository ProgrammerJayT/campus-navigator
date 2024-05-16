import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const VisitsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Visits Screen</Text>
    </SafeAreaView>
  );
};

export default VisitsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
