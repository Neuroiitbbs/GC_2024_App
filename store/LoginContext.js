import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  user: null,
  setUser: () => {},
  logout: () => {},
});

const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const logout = async () => {
    await AsyncStorage.removeItem("userInfo");
    // await signOut(auth);
    setIsLogin(false);
    setIsAdmin(false);
    setUser(null);
    console.log("Logged out");
  };
  const context = {
    isLogin,
    setIsLogin,
    isAdmin,
    setIsAdmin,
    user,
    setUser,
    logout,
  };
  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
};

export { LoginProvider, LoginContext };
