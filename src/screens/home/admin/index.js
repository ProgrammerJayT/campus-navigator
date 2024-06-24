import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import HomeLogo from "../../../../assets/images/home.png";
import { styles } from "./styles";
import MapComponent from "../../../components/map";
import Icons from "@expo/vector-icons/FontAwesome5";
import ComponentsStateContext from "../../../state-management/context/components";
import LocationStateContext from "../../../state-management/context/location";
import AuthContext from "../../../state-management/context/auth";
import { AppColors } from "../../../constants/colors";
import PromptModal from "../../../components/modal/prompt";
import Toast from "react-native-root-toast";
import { logout } from "../../../services/auth";
import NavigationStateContext from "../../../state-management/context/navigation";

const AdminHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const { location, loading } = useContext(LocationStateContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const { interestsPlace, setInterestsPlace } = useContext(
    NavigationStateContext
  );

  const [modal, setModal] = useState({
    logout: false,
  });

  const handleNavigation = (route) => {
    navigation.navigate(route);
  };

  useEffect(() => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: loading,
    }));
  }, [loading]);

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
    <View style={styles.root}>
      <View style={[styles.container, { opacity: modal.logout ? 0.1 : 1 }]}>
        {location && (
          <View style={styles.map}>
            <MapComponent coords={location} />
          </View>
        )}

        <View
          style={{
            marginBottom: 20,
            paddingHorizontal: 10,
            marginTop: -35,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: AppColors.primary,
              height: 2,
              marginRight: 10,
            }}
          />

          <TouchableOpacity
            onLongPress={() => setModal({ ...modal, logout: true })}
            style={styles.usernameButton}
          >
            <Text style={styles.usernameText}>Hello, {user.name}</Text>

            <View style={styles.userTypeTextContainer}>
              {user.type === "admin" && (
                <Text style={styles.userTypeText}>Administrator</Text>
              )}
            </View>
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              backgroundColor: AppColors.primary,
              height: 2,
              marginLeft: 10,
            }}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation("Users")}
          >
            <Text style={styles.buttonText}>Users</Text>
            <View style={{ marginHorizontal: 5 }} />
            <Icons name="users" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation("Interests Places")}
          >
            <Text style={styles.buttonText}>Interests Places</Text>
            <View style={{ marginHorizontal: 5 }} />
            <Icons name="volleyball-ball" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {modal.logout && (
        <PromptModal
          message={"Are you sure you want to logout?"}
          handleClick={handleLogoutPromptClick}
        />
      )}
    </View>
  );
};

export default AdminHomeScreen;
