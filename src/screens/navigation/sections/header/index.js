import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { styles } from "./styles";
import AuthContext from "../../../../state-management/context/auth";
import Icons from "@expo/vector-icons/Entypo";
import { AppColors } from "../../../../constants/colors";

const HeaderSection = ({ title, isNavigating }) => {
  const { user } = useContext(AuthContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${AppColors[isNavigating ? "success" : "dark"]}`,
        },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default HeaderSection;
