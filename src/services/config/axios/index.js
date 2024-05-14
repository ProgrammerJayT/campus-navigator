import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosHeaders = async () => {
  const token = await AsyncStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["Accept"] = "application/json";
};
