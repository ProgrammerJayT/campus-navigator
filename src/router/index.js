import { StyleSheet, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import WelcomeScreen from "../screens/welcome";
import RegisterScreen from "../screens/auth/register";
import VisitsScreen from "../screens/visits";
import UsersScreen from "../screens/users/all";
import UserScreen from "../screens/users/one";
import LoginScreen from "../screens/auth/login";
import CreateInterestsPlace from "../screens/interests-places/create";
import UsersLoginsScreen from "../screens/users-logins";
import InterestsPlacesScreen from "../screens/interests-places/all";
import InterestsPlaceScreen from "../screens/interests-places/one";
import ProfileScreen from "../screens/profile";
import InterestsPlaceBoundsScreen from "../screens/bounds/all/layout";
import NavigationScreen from "../screens/navigation/layout";

const Stack = createNativeStackNavigator();

const RouteStack = () => {
  return (
    <>
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

        <Stack.Screen name="Profile" component={ProfileScreen} />

        <Stack.Screen name="User Logins" component={UsersLoginsScreen} />

        <Stack.Screen name="Visits" component={VisitsScreen} />

        <Stack.Screen
          name="Interests Places"
          component={InterestsPlacesScreen}
        />

        <Stack.Screen name="Interests Place" component={InterestsPlaceScreen} />

        <Stack.Screen
          name="Navigate to Interests Place"
          component={NavigationScreen}
        />

        <Stack.Screen
          name="Interests Place Bounds"
          component={InterestsPlaceBoundsScreen}
        />

        <Stack.Screen
          name="Create Interests Place"
          component={CreateInterestsPlace}
        />
      </Stack.Navigator>
    </>
  );
};

export default RouteStack;
