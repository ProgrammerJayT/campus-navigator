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
import HeaderSection from "../../components/screens/header";
import NavigationStateContext from "../../state-management/context/navigation";
import VisitsList from "../../components/flatlist/visits";

const UserVisitsScreen = ({ navigation, route }) => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const { interestsPlace } = useContext(NavigationStateContext);

  const [header, setHeader] = useState("");

  const [visits, setVisits] = useState([]);

  useEffect(() => {
    console.log("Params interests place id", interestsPlace);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      callFetchVisits();
    }, [])
  );

  const callFetchVisits = async () => {
    toggleLoader(true);

    let filters = {
      userId: user?.id,
      interestsPlaceId: interestsPlace?.id,
    };

    const fetchVisitsResponse = await fetchVisits(filters);

    let requestFailed = fetchVisitsResponse?.response ? true : false;

    if (requestFailed) {
      setVisits([]);
      toastMessage(failedRequest(fetchVisitsResponse).message, "danger");
    } else {
      setVisits(fetchVisitsResponse?.visits);
    }

    toggleLoader(false);
  };

  const toastMessage = (message, severity) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: AppColors[severity],
    });
  };

  const toggleLoader = (visibility) => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: visibility,
    }));
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <HeaderSection title={`${interestsPlace?.name} visits`} />
        {visits.length ? (
          <View style={{ flex: 1 }}>
            <VisitsList visits={[]} />
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
      </View>
    </SafeAreaView>
  );
};

export default UserVisitsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.background,
  },

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
