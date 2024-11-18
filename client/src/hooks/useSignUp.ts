import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../api/axios";
import axios from "axios";

export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post(
        "/auth/admin/signup",
        {
          username,
          email,
          password,
        },
      );

      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response));
        dispatch({ type: "LOGIN", payload: response.data });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An error occurred";
        setError(message);
      } else {
        setError("An error occurred while signing up the user");
      }
    }
  };
  return { signUp, isLoading, error };
};
