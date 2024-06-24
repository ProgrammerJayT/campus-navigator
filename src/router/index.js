import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import WelcomeScreen from "../screens/welcome";
import RegisterScreen from "../screens/auth/register";
import UsersScreen from "../screens/users/layout";
import UserScreen from "../screens/users/one";
import LoginScreen from "../screens/auth/login";
import CreateInterestsPlace from "../screens/interests-places/create";
import UsersLoginsScreen from "../screens/users-logins";
import InterestsPlacesScreen from "../screens/interests-places/all";
import InterestsPlaceScreen from "../screens/interests-places/one";
import ProfileScreen from "../screens/profile";
import InterestsPlaceBoundsScreen from "../screens/bounds/all/layout";
import NavigationScreen from "../screens/navigation/layout";
import NavigationListener from "../screens/navigation/extension";
import UserLoginsScreen from "../screens/users-logins/one";
import UserVisitsScreen from "../screens/visits/user";

const Stack = createNativeStackNavigator();

const RouteStack = () => {
  return (
    <>
      <NavigationListener />
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

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Users" component={UsersScreen} />

        <Stack.Screen name="User" component={UserScreen} />

        <Stack.Screen name="Users Logins" component={UsersLoginsScreen} />

        <Stack.Screen name="User Logins" component={UserLoginsScreen} />

        <Stack.Screen name="User Visits" component={UserVisitsScreen} />

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
