import { SafeAreaView, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { getUsers } from "../../../services/users";
import TouchableOpacityComponent from "../../../components/touchable-opacity";
import { AppColors } from "../../../constants/colors";
import UsersList from "../../../components/flatlist/users";
import ComponentsStateContext from "../../../state-management/context/components";
import { useFocusEffect } from "@react-navigation/native";
import HeaderSection from "../sections/header";
import { styles } from "./styles";
import Toast from "react-native-root-toast";

const UsersScreen = ({ navigation }) => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [users, setUsers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: true,
        }));
        const response = await getUsers();

        setUsers(response.users.length ? response.users : []);

        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: false,
        }));
      };

      fetchUsers();
    }, [])
  );

  const handleUserClick = (user) => {
    navigation.navigate("User", { user: user });
  };

  const handleCreateUser = () => {
    Toast.show("Please web version to add new users", {
      duration: Toast.durations.LONG,
      backgroundColor: AppColors.success,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      {lottieLoadingComponent.visible ? (
        <View style={styles.loadingTextContainer}>
          <Text style={styles.title}>Checking for users</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {users.length ? (
            <View style={{ flex: 1 }}>
              <HeaderSection title={"Users"} />

              <UsersList
                users={users}
                handleUserClick={(user) => handleUserClick(user)}
              />
            </View>
          ) : (
            <View style={styles.loadingTextContainer}>
              <Text style={styles.title}>No users found</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacityComponent
              handleOnPress={handleCreateUser}
              text={"Create new"}
              type={AppColors.primary}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UsersScreen;
