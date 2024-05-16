import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AnimatedLoader from "react-native-animated-loader";
import loading from "../../../../assets/animations/lottie/loading.json";

const LottieSpinnerComponent = ({ visible }) => {
  return (
    <AnimatedLoader
      source={loading}
      speed={2}
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
    />
  );
};

export default LottieSpinnerComponent;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },

  text: {
    fontSize: 20,
    color: "black",
  },
});
