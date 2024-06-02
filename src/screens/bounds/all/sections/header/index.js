import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { styles } from "./styles";
import Icons from "@expo/vector-icons/Entypo";
import AuthContext from "../../../../../state-management/context/auth";
import { AppColors } from "../../../../../constants/colors";

const HeaderSection = ({ title }) => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {user?.type === "admin" && (
        <View
          style={{
            width: "100%",
            position: "absolute",
            paddingHorizontal: 10,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("3 dots pressed");
            }}
          >
            <Icons
              name="dots-three-vertical"
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
