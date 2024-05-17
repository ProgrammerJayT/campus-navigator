import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchVisits = async () => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.get(`${process.env.API_URL}/api/v1/visits`);

    return response.data;
  } catch (error) {
    return error;
  }
};
