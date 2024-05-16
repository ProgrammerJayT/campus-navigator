import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import SpinnerComponent from "../spinner";
import ComponentsStateContext from "../../state-management/context/components";
import LottieSpinnerComponent from "../spinner/lottie";

const ComponentsContainer = () => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  return (
    <SafeAreaView>
      <LottieSpinnerComponent visible={lottieLoadingComponent.visible} />
    </SafeAreaView>
  );
};

export default ComponentsContainer;
