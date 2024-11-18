import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../api/axios";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.post(
        "/auth/admin/login",
        { email, password },
      );

      if (response.status === 200) {
        // Save user to local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Update the auth context
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        const message = error.response?.data?.message || "An error occurred";
        setError(message);
      } else {
        // Handle unexpected errors
        setError("An error occurred while logging in the user");
      }
    }
  };

  return { login, isLoading, error };
};
