import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppColors } from "../../../constants/colors";
import { styles } from "./styles";
import HeaderSection from "../../screens/header";
import AntDesignIcons from "@expo/vector-icons/AntDesign";

const PromptModal = ({ message, handleClick }) => {
  return (
    <View style={styles.formContainer}>
      <View style={{ alignItems: "center", marginBottom: -12, zIndex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            handleClick("cancel");
          }}
          style={{
            borderRadius: 100,
            backgroundColor: AppColors.primary,
          }}
        >
          <AntDesignIcons
            name="closecircleo"
            size={25}
            color={AppColors.background}
          />
        </TouchableOpacity>
      </View>

      <HeaderSection title={"Caution"} />

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.confirmMessageText}>{message}</Text>
      </View>

      <View style={{ alignItems: "center", paddingHorizontal: "25%" }}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => handleClick("confirm")}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromptModal;
