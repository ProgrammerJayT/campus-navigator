import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchVisits = async (filters = {}) => {
  await AsyncStorage.getItem("token");

  try {
    let queryParams = [];

    if (filters.userId) {
      queryParams.push(`userId:eq=${filters.userId}`);
    }

    if (filters.interestsPlaceId) {
      queryParams.push(`interestsPlaceId:eq=${filters.interestsPlaceId}`);
    }

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    const response = await axios.get(
      `${process.env.API_URL}/api/v1/visits${queryString}`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createVisit = async (userId, interestsPlaceId) => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.post(`${process.env.API_URL}/api/v1/visits`, {
      user_id: userId,
      interests_place_id: interestsPlaceId,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
