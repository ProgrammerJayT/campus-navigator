import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";

const Stack = createNativeStackNavigator();

const RouteStack = () => {
  return (
    <View style={styles.root}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default RouteStack;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
