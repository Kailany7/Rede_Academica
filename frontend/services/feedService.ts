import { api } from "./api";

export interface AutorInfo {
  _id: string;
  nome: string;
  email: string;
  curso: string;
  avatarColor: string;
}

export interface ComentarioApi {
  _id: string;
  autor: AutorInfo;
  conteudo: string;
  data: string;
}

export interface PublicacaoApi {
  _id: string;
  autor: AutorInfo;
  conteudo: string;
  curtidas: number;
  curtido: boolean;
  comentarios: ComentarioApi[];
  data: string;
}

export async function listarPublicacoes(): Promise<PublicacaoApi[]> {
  const response = await api.get<PublicacaoApi[]>("/feed");
  return response.data;
}

export async function criarPublicacao(conteudo: string): Promise<PublicacaoApi> {
  const response = await api.post<PublicacaoApi>("/feed", { conteudo });
  return response.data;
}

export async function curtirPublicacao(id: string): Promise<PublicacaoApi> {
  const response = await api.post<PublicacaoApi>(`/feed/${id}/curtir`);
  return response.data;
}

export async function comentarPublicacao(
  id: string,
  conteudo: string
): Promise<ComentarioApi> {
  const response = await api.post<ComentarioApi>(`/feed/${id}/comentar`, {
    conteudo,
  });
  return response.data;
}
