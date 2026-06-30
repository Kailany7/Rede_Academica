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

interface UsuarioApi {
  _id: string;
  nome: string;
  curso: string;
  semestre: string;
  bio: string;
  avatarColor: string;
}

interface GrupoApi {
  _id: string;
  nome: string;
  descricao: string;
  membros: string[];
  dataCriacao: string;
}

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

interface BuscaResponse {
  usuarios: UsuarioApi[];
  publicacoes: PublicacaoApi[];
  grupos: GrupoApi[];
}

export async function buscarConteudos(termo: string): Promise<SearchResult[]> {
  const response = await api.get<BuscaResponse>("/busca", {
    params: {
      termo,
    },
  });

  const usuariosFormatados: SearchResult[] = response.data.usuarios.map((usuario) => ({
    id: usuario._id,
    type: "user",
    title: usuario.nome,
    subtitle: `${usuario.curso || "Curso não informado"} • ${usuario.semestre || "Semestre não informado"}`,
    avatarColor: usuario.avatarColor || "#1B4F8A",
    course: usuario.curso,
    semester: usuario.semestre,
  }));

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

  return [
    ...usuariosFormatados,
    ...gruposFormatados,
    ...publicacoesFormatadas,
  ];
}