import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../../services/users";
import TouchableOpacityComponent from "../../components/touchable-opacity";
import { AppColors } from "../../constants/colors";
import SpinnerComponent from "../../components/spinner";
import UsersList from "../../components/flatlist/users";
import Icons from "@expo/vector-icons/FontAwesome5";
import ComponentsStateContext from "../../state-management/context/components";

const UsersScreen = ({ navigation }) => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: true,
    }));

    const fetchUsers = async () => {
      const response = await getUsers();

      if (response.users.length) setUsers(response.users);

      setLottieLoadingComponent((lottieLoadingComponent) => ({
        ...lottieLoadingComponent,
        visible: false,
      }));

      console.log("Users response", response.users);
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    navigation.navigate("User", { user: user });
  };

  return (
    <SafeAreaView style={styles.container}>
      {users.length ? (
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: "#fff" }]}>Users</Text>
            <View style={{ marginHorizontal: 5 }} />
            <Icons name="users" size={20} color="white" />
          </View>

          <UsersList
            users={users}
            handleUserClick={(user) => handleUserClick(user)}
          />
        </View>
      ) : (
        <View style={styles.noUsersContainer}>
          <Text style={styles.title}>
            {lottieLoadingComponent.visible
              ? "Checking for users"
              : "No users found"}
          </Text>

          {!lottieLoadingComponent.visible && (
            <View style={styles.buttonContainer}>
              <TouchableOpacityComponent
                text={"Create new"}
                type={AppColors.secondary}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default UsersScreen;

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
