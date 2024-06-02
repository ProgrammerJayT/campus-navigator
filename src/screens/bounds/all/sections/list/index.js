import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icons from "@expo/vector-icons/Entypo";
import { AppColors } from "../../../../../constants/colors";

const Item = ({ bound, handleInterestsPlaceClick }) => (
  <TouchableOpacity style={styles.item}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icons name="location-pin" size={20} color={AppColors.primary} />
      <Text
        style={styles.coordinatesText}
      >{`${bound.latitude}, ${bound.longitude}`}</Text>
    </View>
  </TouchableOpacity>
);

const InterestsPlacesBoundsList = ({ bounds, handleInterestsPlaceClick }) => {
  useEffect(() => {
    //
    console.log("Bounds", bounds);
  }, [bounds]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bounds}
        renderItem={({ item }) => (
          <Item
            bound={item}
            handleInterestsPlaceClick={(bound) =>
              handleInterestsPlaceClick(bound)
            }
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  coordinatesText: {
    fontSize: 10,
    marginTop: 5,
  },
});

export default InterestsPlacesBoundsList;
