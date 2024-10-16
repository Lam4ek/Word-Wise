import axios from "axios";

const API_URL = "http://localhost:8080";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Registration failed. Please try again.");
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
};
