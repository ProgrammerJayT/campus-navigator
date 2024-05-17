import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../../services/users";
import TouchableOpacityComponent from "../../components/touchable-opacity";
import { AppColors } from "../../constants/colors";
import SpinnerComponent from "../../components/spinner";
import UsersList from "../../components/flatlist/users";
import Icons from "@expo/vector-icons/FontAwesome5";
import ComponentsStateContext from "../../state-management/context/components";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { fetchUsersLogins } from "../../services/users-logins";
import { failedRequest } from "../../services/exception";
import UsersLoginsList from "../../components/flatlist/users-logins";

const UsersLoginsScreen = ({ navigation }) => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [usersLogins, setUsersLogins] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: true,
        }));
        const response = await fetchUsersLogins();

        console.log("Response", failedRequest(response));

        setUsersLogins(response.usersLogins.length ? response.usersLogins : []);

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
      {usersLogins.length ? (
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: "#fff" }]}>Login History</Text>
            <View style={{ marginHorizontal: 5 }} />
            <Icons name="users" size={20} color="white" />
          </View>

          <UsersLoginsList usersLogins={usersLogins} />
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

export default UsersLoginsScreen;

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
