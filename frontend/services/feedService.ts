import { api } from "./api";

export interface PublicacaoApi {
  _id: string;
  autor: string;
  autorCurso: string;
  avatarColor: string;
  conteudo: string;
  curtidas: number;
  comentarios: ComentarioApi[];
  data: string;
}

export interface ComentarioApi {
  _id: string;
  autor: string;
  autorCurso: string;
  avatarColor: string;
  conteudo: string;
  data: string;
}

export interface CriarPublicacaoData {
  autor: string;
  autorCurso?: string;
  avatarColor?: string;
  conteudo: string;
}

export interface ComentarData {
  autor: string;
  autorCurso?: string;
  avatarColor?: string;
  conteudo: string;
}

export async function listarPublicacoes(): Promise<PublicacaoApi[]> {
  const response = await api.get<PublicacaoApi[]>("/feed");
  return response.data;
}

export async function criarPublicacao(data: CriarPublicacaoData): Promise<PublicacaoApi> {
  const response = await api.post<PublicacaoApi>("/feed", data);
  return response.data;
}

export async function curtirPublicacao(id: string): Promise<PublicacaoApi> {
  const response = await api.post<PublicacaoApi>(`/feed/${id}/curtir`);
  return response.data;
}

export async function comentarPublicacao(id: string, data: ComentarData): Promise<ComentarioApi> {
  const response = await api.post<ComentarioApi>(`/feed/${id}/comentar`, data);
  return response.data;
}
