import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  authService,
  UsuarioLogado,
  DadosCadastro,
  DadosLogin,
} from "../services/authService";

interface AuthContextData {
  usuario: UsuarioLogado | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (dados: DadosLogin) => Promise<void>;
  cadastrar: (dados: DadosCadastro) => Promise<void>;
  logout: () => Promise<void>;
  atualizarUsuario: (usuario: UsuarioLogado) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ao abrir o app, verifica se já tem sessão salva
  useEffect(() => {
    async function carregarSessao() {
      try {
        const token = await AsyncStorage.getItem("@token");
        const usuarioSalvo = await AsyncStorage.getItem("@usuario");

        if (token && usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch {
        // sessão inválida, ignora
      } finally {
        setIsLoading(false);
      }
    }
    carregarSessao();
  }, []);

  async function login(dados: DadosLogin) {
    const resposta = await authService.login(dados);
    await AsyncStorage.setItem("@token", resposta.token);
    await AsyncStorage.setItem("@usuario", JSON.stringify(resposta.usuario));
    setUsuario(resposta.usuario);
  }

  async function cadastrar(dados: DadosCadastro) {
    const resposta = await authService.cadastrar(dados);
    await AsyncStorage.setItem("@token", resposta.token);
    await AsyncStorage.setItem("@usuario", JSON.stringify(resposta.usuario));
    setUsuario(resposta.usuario);
  }

  async function logout() {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@usuario");
    setUsuario(null);
  }

  function atualizarUsuario(usuarioAtualizado: UsuarioLogado) {

    setUsuario(usuarioAtualizado);

    AsyncStorage.setItem(
      "@usuario",
      JSON.stringify(usuarioAtualizado)
    );

  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        isLoading,
        login,
        cadastrar,
        logout,
        atualizarUsuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
