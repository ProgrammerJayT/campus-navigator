import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icons from "@expo/vector-icons/FontAwesome5";
import { AppColors } from "../../../constants/colors";

const Item = ({ interestsPlace, handleInterestsPlaceClick, direction }) => (
  <TouchableOpacity
    style={[
      styles.item,
      direction === "horizontal"
        ? { marginRight: 10 }
        : { marginHorizontal: 16 },
    ]}
    onPress={() => handleInterestsPlaceClick(interestsPlace)}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icons name="volleyball-ball" size={20} color={AppColors.primary} />
      <View style={{ marginHorizontal: 5 }} />
      <Text style={styles.title}>{`${interestsPlace.name}`}</Text>
    </View>
    <Text
      style={styles.email}
    >{`${interestsPlace.latitude}, ${interestsPlace.longitude}`}</Text>
  </TouchableOpacity>
);

const InterestsPlacesList = ({
  interestsPlaces,
  handleInterestsPlaceClick,
  direction = "vertical",
  search,
}) => {
  const filteredPlaces = search
    ? interestsPlaces.filter((place) =>
        place.name.toLowerCase().includes(search.toLowerCase())
      )
    : interestsPlaces;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={direction === "horizontal" ? true : false}
        data={filteredPlaces}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Item
            direction={direction}
            interestsPlace={item}
            handleInterestsPlaceClick={(interestsPlace) =>
              handleInterestsPlaceClick(interestsPlace)
            }
          />
        )}
        keyExtractor={(user) => user.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  title: {
    fontSize: 15,
  },

  email: {
    fontSize: 10,
    marginTop: 5,
  },
});

export default InterestsPlacesList;
