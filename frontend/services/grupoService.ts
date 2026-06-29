import { api } from "./api";


export interface Grupo {
  _id: string;
  nome: string;
  descricao: string;
  membros: string[];
  dataCriacao: string;
}

export interface CriarGrupoData {
  nome: string;
  descricao: string;
}

export async function listarGrupos(): Promise<Grupo[]> {
  const response = await api.get<Grupo[]>("/grupos");

  return response.data;
}

export async function criarGrupo(data: CriarGrupoData): Promise<Grupo> {
  try {
    const response = await api.post<Grupo>("/grupos", data);

    return response.data;
  } catch (error: any) {
    // Pega a mensagem enviada pelo backend
    const mensagem =
      error.response?.data?.message || "Erro ao criar grupo.";

    throw new Error(mensagem);
  }
}