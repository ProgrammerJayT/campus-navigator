import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchInterestsPlaces = async () => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/v1/interests-places`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createInterestsPlace = async (place) => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/v1/interests-places`,
      {
        name: place.name,
        latitude: place.latitude,
        longitude: place.longitude,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteInterestsPlace = async (id) => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${process.env.API_URL}/api/v1/interests-places/${id}`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
