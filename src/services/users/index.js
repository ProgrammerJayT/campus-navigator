import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUsers = async () => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.get(`${process.env.API_URL}/api/v1/users`);

    return response.data;
  } catch (error) {
    return error;
  }
};
