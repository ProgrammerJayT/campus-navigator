import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const UserLoginsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>User Logins Screen</Text>
    </SafeAreaView>
  );
};

export default UserLoginsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
