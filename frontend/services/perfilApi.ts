import api from "./api";

export interface Experiencia {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface PerfilCompleto {
  _id: string;
  nome: string;
  email: string;
  curso: string;
  semestre: string;
  bio: string;
  avatarColor: string;
  experiences: Experiencia[];
  posts: number;
  connections: number;
}

export interface UsuarioResumo {
  _id: string;
  nome: string;
  curso: string;
  semestre: string;
  avatarColor: string;
}

export interface Solicitacao {
  _id: string;
  remetente: UsuarioResumo;
  destinatario: string;
  status: "pendente" | "aceita" | "recusada";
}

export interface Sugestao extends UsuarioResumo {
  solicitacaoEnviada: boolean;
}

export const getMyPerfil = async (): Promise<PerfilCompleto> => {
  const res = await api.get("/perfil");
  return res.data;
};

export const getPerfilById = async (id: string): Promise<PerfilCompleto> => {
  const res = await api.get(`/perfil/${id}`);
  return res.data;
};

export const updatePerfil = async (data: Partial<PerfilCompleto>) => {
  const res = await api.put("/perfil", data);
  return res.data;
};

export const getConnections = async (): Promise<UsuarioResumo[]> => {
  const res = await api.get("/perfil/conexoes");
  return res.data;
};

export const removeConnection = async (id: string) => {
  const res = await api.delete(`/perfil/conexoes/${id}`);
  return res.data;
};

export const getRequests = async (): Promise<Solicitacao[]> => {
  const res = await api.get("/perfil/solicitacoes");
  return res.data;
};

export const getSuggestions = async (): Promise<Sugestao[]> => {
  const res = await api.get("/perfil/sugestoes");
  return res.data;
};

export const sendRequest = async (id: string) => {
  const res = await api.post(`/perfil/conectar/${id}`);
  return res.data;
};

export const acceptRequest = async (id: string) => {
  const res = await api.post(`/perfil/aceitar/${id}`);
  return res.data;
};

export const rejectRequest = async (id: string) => {
  const res = await api.post(`/perfil/recusar/${id}`);
  return res.data;
};