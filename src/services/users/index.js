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

export const getUser = async (id) => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/v1/users/${id}`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (user) => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.post(`${process.env.API_URL}/api/v1/users`, {
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      password: user?.password,
      password_confirmation: user?.verifyPassword,
      type: user?.type,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const manageAccess = async (id, intention) => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/v1/manage-access`,
      {
        userId: id,
        intention: intention,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (user) => {
  await AsyncStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${process.env.API_URL}/api/v1/users/${user?.id}`,
      {
        name: user?.name,
        surname: user?.surname,
        password: user?.password,
        password_confirmation: user?.verifyPassword,
        type: user?.type,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  await AsyncStorage.getItem("token");

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
