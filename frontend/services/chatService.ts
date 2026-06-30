import { api } from "./api";


export interface Mensagem {
  _id:string;
  remetente:string;
  destinatario:string;
  conteudo:string;
  data:string;
}

export interface Conversa {
  usuarioId: string;
  nome: string;
  bio: string;
  foto: string | null;
  ultimaMensagem: string;
  data: string;
}

export async function listarConversas() {
  const response = await api.get<Conversa[]>("/chat/conversas");
  return response.data;
}


export async function enviarMensagem(
  destinatario:string,
  conteudo:string
){

 const response = await api.post("/chat",{
   destinatario,
   conteudo
 });

 return response.data;

}



export async function buscarMensagens(
 usuarioId:string
){

 const response = await api.get<Mensagem[]>(
   `/chat/${usuarioId}`
 );

 return response.data;

}