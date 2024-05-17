import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../../services/users";
import TouchableOpacityComponent from "../../components/touchable-opacity";
import { AppColors } from "../../constants/colors";
import SpinnerComponent from "../../components/spinner";
import Icons from "@expo/vector-icons/FontAwesome5";
import ComponentsStateContext from "../../state-management/context/components";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { failedRequest } from "../../services/exception";
import UsersLoginsList from "../../components/flatlist/users-logins";
import { fetchVisits } from "../../services/visits";

const VisitsScreen = ({ navigation }) => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [visits, setVisits] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLottieLoadingComponent((lottieLoadingComponent) => ({
          ...lottieLoadingComponent,
          visible: true,
        }));
        const response = await fetchVisits();

        console.log("Response", failedRequest(response));

        setVisits(response.visits.length ? response.visits : []);

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
      {visits.length ? (
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
              ? "Fetching visits"
              : "No visits found"}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default VisitsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
