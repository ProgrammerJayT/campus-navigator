import { StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import React from "react";

const SpinnerComponent = ({visible}) => {
  return (
    <View>
      <Spinner
        visible={visible}
        textContent={"Please wait"}
        textStyle={styles.text}
      />
    </View>
  );
};

export default SpinnerComponent;

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
});
