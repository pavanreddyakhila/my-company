import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    toast.success("Login successful");
    return res.data;
  };

  const register = async (data) => {
    const res = await apiRegister(data);
    toast.success("Registration successful");
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
