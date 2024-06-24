import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AppColors } from "../../../constants/colors";
import ComponentsStateContext from "../../../state-management/context/components";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { fetchUsersLogins } from "../../../services/users-logins";
import { failedRequest } from "../../../services/exception";
import UsersLoginsList from "../../../components/flatlist/users-logins";
import HeaderSection from "../../../components/screens/header";

const UserLoginsScreen = ({ navigation, route }) => {
  const { paramsUserId } = route.params;

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [userLogins, setUserLogins] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: true,
        }));
        const response = await fetchUsersLogins(paramsUserId);

        // console.log("Response", failedRequest(response));
        console.log("Response", response);

        setUserLogins(response.usersLogins.length ? response.usersLogins : []);

        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: false,
        }));
      };

      fetchData();
    }, [])
  );

  const handleUserClick = (user) => {
    navigation.navigate("User", { user: user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSection title={"User Login History"} />

      {userLogins.length ? (
        <View style={{ flex: 1 }}>
          <UsersLoginsList usersLogins={userLogins} />
        </View>
      ) : (
        <View style={styles.noUsersContainer}>
          <Text style={styles.title}>
            {lottieLoadingComponent.visible
              ? "Fetching users logins"
              : "No users logins found"}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserLoginsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  noUsersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginVertical: 20,
    fontSize: 20,
    textAlign: "center",
  },

  buttonContainer: {
    width: "100%",
    paddingHorizontal: "25%",
  },

  headerContainer: {
    elevation: 10,
    backgroundColor: AppColors.secondary,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
