import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icons from "@expo/vector-icons/FontAwesome5";
import { AppColors } from "../../constants/colors";
import ComponentsStateContext from "../../state-management/context/components";
import SlideButton from "rn-slide-button";
import { deleteUser } from "../../services/users";

const UserScreen = ({ navigation, route }) => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const { user } = route.params;

  useEffect(() => {
    console.log("Current user", user);
  }, []);

  const handleDeleteUser = async () => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: true,
    }));

    const response = await deleteUser(user.id);

    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: false,
    }));

    if (response.message)
      return navigation.navigate("Users", { message: response.message });

    console.log("Delete response", response);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Icons name="user-alt" size={100} color={AppColors.secondary} />
        <Text style={styles.name}>{`${user?.name} ${user?.surname}`}</Text>
      </View>

      <View style={{ flex: 1 }} />

      <View style={styles.buttonsContainer}>
        {/* <View style={[styles.buttonContainer, { flex: 1 }]}>
          <TouchableOpacityComponent text={"Edit"} type={AppColors.secondary} />
        </View> */}

        <View style={[styles.buttonContainer, { flex: 1 }]}>
          <SlideButton
            title={"Delete user"}
            autoReset
            underlayStyle={{ backgroundColor: "red" }}
            containerStyle={{
              padding: 0,
              backgroundColor: "red",
            }}
            autoResetDelay={100}
            onReachedToEnd={handleDeleteUser}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  name: {
    fontSize: 20,
    marginTop: 10,
    color: AppColors.secondary,
    fontWeight: "bold",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    // flex: 1,
    marginHorizontal: 20,
  },
});
