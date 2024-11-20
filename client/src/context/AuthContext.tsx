import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import { IUser } from "../types/user";

type AuthState = {
  user: IUser | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: IUser }
  | { type: "LOGOUT"; payload: null };

type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<{children: ReactNode}> = ({
    children,
}) => {
    const [state,dispatch] = useReducer(authReducer,{user:null});

    useEffect(() => {
        const userString = localStorage.getItem('user')
        if(userString){
            const user: IUser = JSON.parse(userString)
            dispatch({type: "LOGIN",payload:user})
        }
    },[])

    return (
        <AuthContext.Provider value={{state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
