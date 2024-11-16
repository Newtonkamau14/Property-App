import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../api/axios";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      },{
        withCredentials: true
      });

      if (response.status === 200) {
        //save user to local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        //update the auth context
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        const message = error.response?.data?.message || "An error occurred";
        setError(message);
      } else {
        setError("An error occurred while logging in the user");
      }
    }
  };

  return { login, isLoading, error };
};