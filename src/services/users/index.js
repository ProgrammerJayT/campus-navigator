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

export const deleteUser = async (id) => {
  try {
    console.log("Profile id", id);
    const response = await axios.delete(
      `${process.env.API_URL}/api/v1/users/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
