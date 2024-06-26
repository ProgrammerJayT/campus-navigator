import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchInterestsPlaces = async () => {
  const token = await AsyncStorage.getItem("token");

  console.log("This is your token", token);

  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/v1/interests-places`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchBounds = async (interestsPlaceId) => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.get(`${process.env.API_URL}/api/v1/bounds`, {
      params: { interestsPlaceId: interestsPlaceId },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createBound = async (bound) => {
  console.log("Bound", bound);
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.post(`${process.env.API_URL}/api/v1/bounds`, {
      latitude: bound?.latitude.toString(),
      longitude: bound.longitude.toString(),
      interests_place_id: bound?.interestsPlaceId,
      surroundings: bound?.surroundings,
    });

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
