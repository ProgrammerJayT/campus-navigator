import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { styles } from "./styles";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { AppColors } from "../../../constants/colors";

const HeaderSection = ({ title, icon, handleMenuClick }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {icon && (
        <View
          style={{
            width: "100%",
            position: "absolute",
            paddingHorizontal: 10,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity onPress={handleMenuClick}>
            <AntDesignIcons
              name={icon}
              size={20}
              color={AppColors.background}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HeaderSection;
