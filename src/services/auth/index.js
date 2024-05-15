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
