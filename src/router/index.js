import { StyleSheet, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import WelcomeScreen from "../screens/welcome";
import RegisterScreen from "../screens/auth/register";
import InterestsPlacesScreen from "../screens/interests-places";
import VisitsScreen from "../screens/visits";
import UserLoginsScreen from "../screens/user-logins";
import UsersScreen from "../screens/users";
import UserScreen from "../screens/user";
import LoginScreen from "../screens/auth/login";

const Stack = createNativeStackNavigator();

const RouteStack = () => {
  return (
    <View style={styles.root}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="User Logins" component={UserLoginsScreen} />
        <Stack.Screen name="Visits" component={VisitsScreen} />
        <Stack.Screen
          name="Interests Places"
          component={InterestsPlacesScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

export default RouteStack;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 25,
  },
});
