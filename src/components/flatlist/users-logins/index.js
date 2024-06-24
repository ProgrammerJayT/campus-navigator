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
import Icons from "@expo/vector-icons/FontAwesome5";
import { AppColors } from "../../../constants/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Item = ({ item }) => (
  <TouchableWithoutFeedback style={styles.item}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icons name="user-alt" size={20} color={AppColors.primary} />
      <View style={{ marginHorizontal: 5 }} />
      <Text style={styles.title}>{`${item?.name} ${item?.surname}`}</Text>
    </View>

    <Text style={styles.email}>{`${item?.email}`}</Text>
    <Text style={styles.email}>{`Last login: ${item?.timestamp}`}</Text>
  </TouchableWithoutFeedback>
);

const UsersLoginsList = ({ usersLogins }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={usersLogins}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
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

  title: {
    fontSize: 15,
  },

  email: {
    fontSize: 10,
    marginTop: 5,
  },
});

export default UsersLoginsList;
