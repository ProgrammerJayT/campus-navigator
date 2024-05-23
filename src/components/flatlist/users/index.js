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

const Item = ({ user, handleClick }) => (
  <TouchableOpacity style={styles.item} onPress={() => handleClick(user)}>
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}
    >
      <Icons name="user-alt" size={20} color={AppColors.secondary} />
      <View style={{ marginHorizontal: 5 }} />
      <Text style={styles.title}>{`${user.name} ${user.surname}`}</Text>
    </View>

    <Text style={styles.email}>Email: {`${user.email}`}</Text>
    <Text style={styles.email}>
      Privileges: {`${user.type === "admin" ? user.type : "basic"}`}
    </Text>
  </TouchableOpacity>
);

const UsersList = ({ users, handleUserClick }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Item user={item} handleClick={(user) => handleUserClick(user)} />
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

export default UsersList;
