import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const register = async (registration) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/v1/register`,
      {
        name: registration.name,
        surname: registration.surname,
        email: registration.email,
        password: registration.password,
        password_confirmation: registration.password,
        type: "user",
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/api/v1/login`, {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const verifyToken = async () => {
  console.log("API URL ", `${process.env.API_URL}/api/v1/verify-token`);

  await AsyncStorage.getItem("token");

  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/v1/verify-token`
    );

    return response;
  } catch (error) {
    return error;
  }
};
