import { useAuthContext } from "./useAuthContext";
import { usePropertiesContext } from "./usePropertiesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: propertiesDispatch } = usePropertiesContext();

  const logout = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT", payload: null });
    propertiesDispatch({ type: "SET_PROPERTIES", payload: null });
  };

  return { logout };
};
