import { api } from "./api";

export type ResultType = "user" | "post" | "group";

export interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  subtitle: string;
  avatarColor: string;
  course?: string;
  semester?: string;
}

// Formato que vem do backend para grupos
interface GrupoApi {
  _id: string;
  nome: string;
  descricao: string;
  membros: string[];
  dataCriacao: string;
}

// Formato da resposta da rota GET /busca
interface BuscaResponse {
  usuarios: [];
  publicacoes: [];
  grupos: GrupoApi[];
}

// Busca no backend pelo termo digitado
export async function buscarConteudos(termo: string): Promise<SearchResult[]> {
  const response = await api.get<BuscaResponse>("/busca", {
    params: {
      termo,
    },
  });

  // obs: Por enquanto transformamos apenas grupos em resultados da tela, falta transformar usuários e publicações
  const gruposFormatados: SearchResult[] = response.data.grupos.map((grupo) => ({
    id: grupo._id,
    type: "group",
    title: grupo.nome,
    subtitle: `${grupo.membros.length} membros`,
    avatarColor: "#0A4A7A",
  }));

  return gruposFormatados;
}