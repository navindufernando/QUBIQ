import axios from "axios";
import { UserType } from "../enums/userType";

const API_URL = "http://localhost:3000/user";

interface SignupParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const signup = async (params: SignupParams) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      ...params,
      role: params.role.toString()
    });
    return {
      success: true,
      data: response.data,
      token: response.data.data.token,
      user: {
        id: response.data.data.id,
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        role: params.role as UserType
      }
    };
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const signin = async (email: string, password: string, role: UserType) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, {
      email,
      password,
      role: role.toString()
    });
    return {
      success: true,
      data: response.data,
      token: response.data.data.token,
      user: {
        id: response.data.data.id,
        email: email,
        role: role,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName
      }
    };
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};

export const googleAuth = async (googleToken: string, role: UserType) => {
  try {
    const response = await axios.post(`${API_URL}/google-auth`, { googleToken, role });
    return response.data;
  } catch (error) {
    console.error("Error during Google authentication: ", error);
    throw error;
  }
};

export const forgotPassword = async (email: string, role: UserType) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email, role });
    return response.data;
  } catch (error) {
    console.error("Error during password reset request: ", error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token: ", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateProfile = async (profileData: any) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(`${API_URL}/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const uploadProfilePicture = async (file: File) => {
  try {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("picture", file);

    const response = await axios.post(`${API_URL}/profile/picture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};