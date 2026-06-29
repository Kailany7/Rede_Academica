import api from "./api";

export interface UsuarioLogado {
  id: string;
  nome: string;
  email: string;
  curso: string;
  semestre: string;
  bio: string;
  avatarColor: string;
}

export interface RespostaAuth {
  token: string;
  usuario: UsuarioLogado;
}

export interface DadosCadastro {
  nome: string;
  email: string;
  senha: string;
  curso: string;
  bio: string;
}

export interface DadosLogin {
  email: string;
  senha: string;
}

export const authService = {
  async login(dados: DadosLogin): Promise<RespostaAuth> {
    const response = await api.post<RespostaAuth>("/auth/login", dados);
    return response.data;
  },

  async cadastrar(dados: DadosCadastro): Promise<RespostaAuth> {
    const response = await api.post<RespostaAuth>("/auth/cadastro", dados);
    return response.data;
  },

  async getPerfil(): Promise<UsuarioLogado> {
    const response = await api.get<UsuarioLogado>("/auth/perfil");
    return response.data;
  },
};
