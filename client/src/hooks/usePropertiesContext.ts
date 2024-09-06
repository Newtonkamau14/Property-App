import { PropertyContext } from "../context/PropertyContext";
import { useContext } from "react";

export const usePropertiesContext = () => {
  const context = useContext(PropertyContext);

  if (!context) {
    throw Error(
      "usePropertiesContext must be used inside an PropertyContextProvider"
    );
  }

  return context;
};