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

// Formato que vem do backend para publicações
interface PublicacaoApi {
  _id: string;
  autor: string;
  autorCurso: string;
  avatarColor: string;
  conteudo: string;
  curtidas: number;
  comentarios: string[];
  data: string;
}

// Formato da resposta da rota GET /busca
interface BuscaResponse {
  usuarios: [];
  publicacoes: PublicacaoApi[];
  grupos: GrupoApi[];
}

// Busca no backend pelo termo digitado
export async function buscarConteudos(termo: string): Promise<SearchResult[]> {
  const response = await api.get<BuscaResponse>("/busca", {
    params: {
      termo,
    },
  });


  const gruposFormatados: SearchResult[] = response.data.grupos.map((grupo) => ({
    id: grupo._id,
    type: "group",
    title: grupo.nome,
    subtitle: `${grupo.membros.length} membros`,
    avatarColor: "#0A4A7A",
  }));

  
  const publicacoesFormatadas: SearchResult[] = response.data.publicacoes.map(
    (publicacao) => ({
      id: publicacao._id,
      type: "post",
      title: publicacao.conteudo,
      subtitle: `Por ${publicacao.autor}`,
      avatarColor: publicacao.avatarColor || "#1B4F8A",
      course: publicacao.autorCurso,
    })
  );

  
  return [...gruposFormatados, ...publicacoesFormatadas];
}