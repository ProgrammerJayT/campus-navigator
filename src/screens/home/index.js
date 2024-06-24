import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import GetUserLocation from "../../utils/location";
import HomeLogo from "../../../assets/images/home.png";
import TouchableOpacityComponent from "../../components/touchable-opacity";
import { AppColors } from "../../constants/colors";
import { styles } from "./styles";
import MapComponent from "../../components/map";
import Icons from "@expo/vector-icons/FontAwesome5";
import ComponentsStateContext from "../../state-management/context/components";
import LocationStateContext from "../../state-management/context/location";
import AuthContext from "../../state-management/context/auth";
import AdminHomeScreen from "./admin";
import UserHome from "./user";
import { fetchInterestsPlaces } from "../../services/interests-places";

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const { location, locationLoading } = useContext(LocationStateContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [interestsPlaces, setInterestsPlaces] = useState([]);

  useEffect(() => {
    const callFetchInterestsPlaces = async () => {
      const fetchingInterestsPlacesResponse = await fetchInterestsPlaces();

      setInterestsPlaces(
        fetchingInterestsPlacesResponse?.interestsPlaces || []
      );
      setLoading(false);
    };

    callFetchInterestsPlaces();
  }, []);

  const handleNavigation = (route) => {
    navigation.navigate(route);
  };

  useEffect(() => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: loading || locationLoading,
    }));
  }, [loading, locationLoading]);

  return user?.type === "admin" ? (
    <AdminHomeScreen navigation={navigation}/>
  ) : (
    <UserHome interestsPlaces={interestsPlaces} navigation={navigation} />
  );
};

export default HomeScreen;
