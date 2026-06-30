import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://localhost:3000", // ajuste para sua URL real
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const getMyPerfil = async () => {
  const res = await api.get("/perfil");
  return res.data;
};

export const updatePerfil = async (data: any) => {
  const res = await api.put("/perfil", data);
  return res.data;
};

export const login = async (email: string, senha: string) => {
  const res = await api.post("/login", { email, senha });
  const { token } = res.data;
  await AsyncStorage.setItem("token", token);
  return res.data;
};
