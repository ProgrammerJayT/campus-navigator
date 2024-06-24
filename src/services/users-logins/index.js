import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUsersLogins = async (id = '') => {
  console.log("ID", id);
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/v1/users-logins?userId=${id}`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
