import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userInfo = await AsyncStorage.getItem("user_info");
      setIsLoggedIn(!!userInfo);
    };
    checkLoginStatus();
  }, []);

  const login = async (accessToken: string) => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem("user_info", JSON.stringify({ accessToken }));
  };

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("user_info");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
