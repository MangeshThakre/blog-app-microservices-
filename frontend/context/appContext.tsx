"use client";
import React, { useEffect, useContext, useState, createContext } from "react";
import axios from "axios";
const userService = "http://localhost:8081";
const authorService = "http://localhost:8082";
const blogService = "http://localhost:8083";

export interface User {
  _id: string;
  name: string;
  email: string;
  image: { imageId: string; url: string };
  instagram: string;
  facebook: string;
  linkedin: string;
  bio: string;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  blog_content: string;
  image: { imageId: string; url: string };
  category: string;
  author: string;
  createdAt: string;
}

interface AppContextType {
  user: User | null;
  userLoading: boolean;
  isAuth: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${userService}/api/v1/user/me`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`
        }
      });
      setUser(response.data.user);
      setIsAuth(true);
      setUserLoading(false);
    } catch (error) {
      console.log(error);
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, userLoading, isAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
