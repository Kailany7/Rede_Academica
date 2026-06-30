import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  listarPublicacoes,
  criarPublicacao,
  curtirPublicacao,
  comentarPublicacao,
  PublicacaoApi,
} from "../services/feedService";
import { useAuth } from "./AuthContext";

export interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: string;
  authorCourse: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface PostsContextType {
  posts: Post[];
  loading: boolean;
  refreshing: boolean;
  fetchPosts: () => Promise<void>;
  addPost: (content: string) => Promise<void>;
  toggleLike: (id: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
}

function formatTimestamp(data: string): string {
  const agora = new Date();
  const dt = new Date(data);
  const diffMs = agora.getTime() - dt.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Agora";
  if (diffMin < 60) return `Há ${diffMin} min`;
  const diffHoras = Math.floor(diffMin / 60);
  if (diffHoras < 24) return `Há ${diffHoras} hora${diffHoras > 1 ? "s" : ""}`;
  const diffDias = Math.floor(diffHoras / 24);
  if (diffDias < 7) return `Há ${diffDias} dia${diffDias > 1 ? "s" : ""}`;
  return dt.toLocaleDateString("pt-BR");
}

function mapApiToPost(api: PublicacaoApi): Post {
  return {
    id: api._id,
    author: api.autor?.nome || "Desconhecido",
    authorCourse: api.autor?.curso || "",
    authorAvatar: api.autor?.avatarColor || "#1B4F8A",
    content: api.conteudo,
    timestamp: formatTimestamp(api.data),
    likes: api.curtidas,
    comments: (api.comentarios || []).map((c) => ({
      id: c._id,
      author: c.autor?.nome || "Desconhecido",
      authorAvatar: c.autor?.avatarColor || "#1B4F8A",
      content: c.conteudo,
      timestamp: formatTimestamp(c.data),
    })),
    isLiked: api.curtido,
  };
}

const PostsContext = createContext({} as PostsContextType);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { usuario } = useAuth();

  const fetchPosts = useCallback(async () => {
    try {
      const data = await listarPublicacoes();
      setPosts(data.map(mapApiToPost));
    } catch (error) {
      console.error("Erro ao carregar publicações:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (usuario) {
      fetchPosts();
    }
  }, [usuario, fetchPosts]);

  async function addPost(content: string) {
    try {
      const nova = await criarPublicacao(content);
      setPosts((prev) => [mapApiToPost(nova), ...prev]);
    } catch (error) {
      console.error("Erro ao criar publicação:", error);
    }
  }

  async function toggleLike(id: string) {
    const postAtual = posts.find((p) => p.id === id);
    const optimisticLikes = postAtual
      ? postAtual.isLiked
        ? postAtual.likes - 1
        : postAtual.likes + 1
      : 0;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isLiked: !p.isLiked, likes: optimisticLikes }
          : p
      )
    );

    try {
      const atualizada = await curtirPublicacao(id);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, likes: atualizada.curtidas, isLiked: atualizada.curtido }
            : p
        )
      );
    } catch (error) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, isLiked: postAtual?.isLiked ?? false, likes: postAtual?.likes ?? 0 }
            : p
        )
      );
      console.error("Erro ao curtir:", error);
    }
  }

  async function addComment(postId: string, conteudo: string) {
    try {
      const novo = await comentarPublicacao(postId, conteudo);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  {
                    id: novo._id,
                    author: novo.autor?.nome || "Desconhecido",
                    authorAvatar: novo.autor?.avatarColor || "#1B4F8A",
                    content: novo.conteudo,
                    timestamp: formatTimestamp(novo.data),
                  },
                ],
              }
            : p
        )
      );
    } catch (error) {
      console.error("Erro ao comentar:", error);
    }
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        refreshing,
        fetchPosts,
        addPost,
        toggleLike,
        addComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
