import React, { createContext, ReactNode, useReducer } from "react";
import { IProperty } from "../models/property";

interface PropertyState {
  properties: IProperty[] | null;
}

type PropertyAction =
  | { type: "SET_PROPERTIES"; payload: IProperty[] | null }
  | { type: "CREATE_PROPERTY"; payload: IProperty }
  | { type: "DELETE_PROPERTY"; payload: IProperty };

// Define the context type
interface PropertyContextType {
  state: PropertyState;
  dispatch: React.Dispatch<PropertyAction>;
}

export const PropertyContext = createContext<PropertyContextType | null>(null);


// Reducer function
export const propertiesReducer = (
    state: PropertyState,
    action: PropertyAction
  ): PropertyState => {
    switch (action.type) {
      case "SET_PROPERTIES":
        return {
          properties: action.payload,
        };
      case "CREATE_PROPERTY":
        return {
          properties: [action.payload, ...(state.properties || [])],
        };
      case "DELETE_PROPERTY":
        return {
          properties: state.properties?.filter(
            (property) => property.property_id !== action.payload.property_id
          ),
        };
      default:
        return state;
    }
  };


  // Context provider component
export const PropertyContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [state, dispatch] = useReducer(propertiesReducer, {
      properties: null,
    });
  
    return (
      <PropertyContext.Provider value={{ state, dispatch }}>
        {children}
      </PropertyContext.Provider>
    );
  };