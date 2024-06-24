import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Icons from "@expo/vector-icons/FontAwesome5";
import { AppColors } from "../../../constants/colors";

const Item = ({ visit }) => (
  <View style={[styles.item]}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icons name="map" size={20} color={AppColors.primary} />
      <View style={{ marginHorizontal: 5 }} />
      <Text style={styles.title}>{`${visit?.interestsPlace.name}`}</Text>
    </View>
    <Text style={styles.email}>{`${visit?.date} ${visit?.time}`}</Text>
    <Text
      style={[styles.email, { fontWeight: "bold" }]}
    >{`${visit?.user?.name} ${visit?.user?.surname}`}</Text>
  </View>
);

const VisitsList = ({ visits, search }) => {
  const filteredPlaces = search
    ? visits.filter((place) =>
        place.name.toLowerCase().includes(search.toLowerCase())
      )
    : visits;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <FlatList
          data={filteredPlaces}
          renderItem={({ item }) => <Item visit={item} />}
          keyExtractor={(user) => user.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

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
    marginHorizontal: 10,
  },

  title: {
    fontSize: 15,
  },

  email: {
    fontSize: 10,
    marginTop: 5,
  },
});

export default VisitsList;
