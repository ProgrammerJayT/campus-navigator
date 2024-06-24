import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles.js";
import MapComponent from "../../../components/map/index.js";
import LocationStateContext from "../../../state-management/context/location/index.js";
import InterestsPlacesList from "../../../components/flatlist/interests-places/index.js";
import NavigationStateContext from "../../../state-management/context/navigation/index.js";
import { AppColors } from "../../../constants/colors/index.js";
import AntDesignIcons from "@expo/vector-icons/AntDesign.js";
import HeaderSection from "../../../components/screens/header/index.js";
import AuthContext from "../../../state-management/context/auth/index.js";
import PromptModal from "../../../components/modal/prompt/index.js";
import ComponentsStateContext from "../../../state-management/context/components/index.js";
import { logout } from "../../../services/auth/index.js";
import Toast from "react-native-root-toast";
import { failedRequest } from "../../../services/exception/index.js";

const UserHome = ({ interestsPlaces, navigation }) => {
  const { user } = useContext(AuthContext);

  const { setLottieLoadingComponent } = useContext(ComponentsStateContext);

  const { interestsPlace, setInterestsPlace } = useContext(
    NavigationStateContext
  );

  const [modal, setModal] = useState({
    logout: false,
  });

  useEffect(() => {
    //
  }, []);

  const [search, setSearch] = useState("");

  const { location } = useContext(LocationStateContext);

  const handleInterestsPlaceClick = (place) => {
    //
    setInterestsPlace(place);
    navigation.navigate("Navigate to Interests Place");
  };

  const handleLogoutPromptClick = async (option) => {
    if (option === "cancel") {
      setModal({ ...modal, logout: false });
    } else {
      toggleLoader(true);

      const logoutResponse = await logout();

      toggleLoader(false);

      let requestFailed = logoutResponse?.response ? true : false;

      if (requestFailed) {
        toastMessage(failedRequest(logoutResponse).message, "danger");
      } else {
        setInterestsPlace(() => ({}));
        return navigation.navigate("Welcome");
      }
    }
    console.log("Option selected", option);
  };

  const toggleLoader = (visibility) => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: visibility,
    }));
  };

  const toastMessage = (message, severity) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      backgroundColor: AppColors[severity],
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { opacity: modal.logout ? 0.1 : 1 }]}
      >
        <HeaderSection
          title={`${user?.name} ${user?.surname}`}
          icon={"logout"}
          handleMenuClick={() => setModal({ ...modal, logout: true })}
        />

        <MapComponent coords={location} markers={interestsPlaces} />

        <View style={styles.listContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={setSearch}
            value={search}
            placeholder="Search for place of interests"
          />

          <InterestsPlacesList
            interestsPlaces={interestsPlaces}
            direction="horizontal"
            handleInterestsPlaceClick={handleInterestsPlaceClick}
            search={search}
          />
        </View>
      </KeyboardAvoidingView>

      {modal.logout && (
        <PromptModal
          message={"Are you sure you want to logout?"}
          handleClick={handleLogoutPromptClick}
        />
      )}
    </SafeAreaView>
  );
};

export default UserHome;
