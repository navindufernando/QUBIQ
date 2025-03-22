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
    console.log("Signup params:", params);
    // Important: Ensure role is passed as a string
    const response = await axios.post(`${API_URL}/signup`, {
      ...params,
      role: params.role.toString()
    });
    
    return {
      success: true,
      data: response.data,
      token: response.data.token,
      user: {
        id: response.data.userId,
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
      token: response.data.token,
      user: {
        id: response.data.userId,
        email: email,
        role: role,
        firstName: response.data.firstName,
        lastName: response.data.lastName
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
