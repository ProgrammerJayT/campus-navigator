import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./styles";
import InterestsPlacesBoundsList from "../sections/list";
import {
  createBound,
  fetchBounds,
} from "../../../../services/interests-places";
import { failedRequest } from "../../../../services/exception";
import { AppColors } from "../../../../constants/colors";
import BoundsModalComponent from "../modal/add-bound";
import LocationStateContext from "../../../../state-management/context/location";
import ComponentsStateContext from "../../../../state-management/context/components";
import Toast from "react-native-root-toast";
import NavigationStateContext from "../../../../state-management/context/navigation";
import HeaderSection from "../../../../components/screens/header";

const InterestsPlaceBoundsScreen = ({ navigation, route }) => {
  const [bounds, setBounds] = useState([]);

  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const { location } = useContext(LocationStateContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const { interestsPlace } = useContext(NavigationStateContext);

  useEffect(() => {
    //

    callFetchBounds();
  }, []);

  const callFetchBounds = async () => {
    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: true,
    }));

    const boundsResponse = await fetchBounds(interestsPlace?.id);

    console.log("Received bounds", boundsResponse);

    if (boundsResponse.response) {
      setBounds([]);

      Toast.show(
        boundsResponse.response
          ? failedRequest(boundsResponse).message
          : boundsResponse.message,
        {
          duration: Toast.durations.LONG,
          backgroundColor:
            AppColors[boundsResponse.response ? "danger" : "success"],
        }
      );
    } else {
      setBounds(boundsResponse.bounds);
    }

    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: false,
    }));

    console.log(
      "Bounds response",
      boundsResponse.response
        ? failedRequest(boundsResponse).message
        : boundsResponse
    );
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("vakues", values);

    setLoading(true);
    const boundResponse = await createBound({
      latitude: location?.latitude,
      longitude: location?.longitude,
      interestsPlaceId: interestsPlace?.id,
      surroundings: values?.surroundings,
    });

    setLoading(false);

    if (boundResponse?.bound) {
      resetForm();
      callFetchBounds();
    }

    console.log("Response", failedRequest(boundResponse).message);

    Toast.show(
      boundResponse.response
        ? failedRequest(boundResponse).message
        : "Bound marked successfully",
      {
        duration: Toast.durations.LONG,
        backgroundColor:
          AppColors[boundResponse.response ? "danger" : "success"],
      }
    );
  };

  const handleSetLoading = () => {
    setLoading(false);
  };

  return (
    <SafeAreaView style={[styles.container, { opacity: `${modal ? 0.1 : 1}` }]}>
      <BoundsModalComponent
        visible={modal}
        setVisible={(visibility) => {
          setModal(visibility);
        }}
        coords={location}
        submit={handleSubmit}
        setLoading={handleSetLoading}
        loading={loading}
      />
      <View style={styles.content}>
        <HeaderSection title={"Bounds"} />
        <Text style={styles.title}>{interestsPlace?.name || "No title"}</Text>

        <InterestsPlacesBoundsList bounds={bounds} />
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={{ backgroundColor: AppColors.primary, borderRadius: 10 }}
        >
          <Text style={[styles.title, { color: AppColors.background }]}>
            New
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InterestsPlaceBoundsScreen;
