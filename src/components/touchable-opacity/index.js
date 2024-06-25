import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AppColors } from "../../constants/colors";

const TouchableOpacityComponent = ({
  size,
  type,
  text,
  handleOnPress,
  disabled,
}) => {
  const [fontSize, setFontSize] = useState(0); // State for font size

  useEffect(() => {
    // Calculate font size based on size prop
    switch (size) {
      case "s":
        setFontSize(10);
        break;

      case "m":
        setFontSize(15);
        break;

      case "l":
        setFontSize(20);
        break;

      default:
        break;
    }
  }, [size]);

  const buttonTextStyles = {
    fontSize: fontSize,
    color: "#fff",
  };

  const buttonStyles = {
    backgroundColor: type || AppColors.primary,
  };

  return (
    <TouchableOpacity
      disabled={disabled || false}
      style={[styles.button, buttonStyles]}
      onPress={handleOnPress}
    >
      <Text style={[styles.buttonText, buttonTextStyles]}>
        {text || "Missing text"}
      </Text>
    </TouchableOpacity>
  );
};

export default TouchableOpacityComponent;

export const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: "100%",
  },

  buttonText: {
    paddingVertical: 15,
    textAlign: "center",
  },
});
