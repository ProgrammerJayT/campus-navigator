import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AppColors } from "../../constants/colors";

const DropdownComponent = ({
  label = "Dropdown label",
  placeholder = "Select item",
  data,
  userType,
  setUserType,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchText, setSearchText] = useState("");

  const renderLabel = () => {
    if (userType || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: AppColors.primary }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: AppColors.primary }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={(data || []).filter((item) =>
          item.label.toLowerCase().includes(searchText.toLowerCase())
        )}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        value={userType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setUserType(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={AppColors[isFocus ? "primary" : "dark"]}
            name="user"
            size={20}
          />
        )}
        renderInputSearch={() => (
          <TextInput
            style={styles.inputSearchStyleCustom}
            value={searchText}
            onChangeText={(e) => setSearchText(e)}
            placeholder="Search..."
            placeholderTextColor="rgba(0,0,0,.5)"
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 15,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputSearchStyleCustom: {
    borderWidth: 0.5,
    borderColor: "#DDDDDD",
    paddingHorizontal: 8,
    marginBottom: 5,
    margin: 6,
    height: 45,
    borderRadius: 5,
  },
});
