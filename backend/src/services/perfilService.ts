import User from "../models/Usuario";
import Solicitacao from "../models/Solicitacao";
import Conexao from "../models/Conexao";

// buscar meu perfil
export const getMyPerfil = async (userId: string) => {
  return await User.findById(userId).select("-senha");
};

// buscar perfil por ID
export const getPerfilById = async (id: string) => {
  return await User.findById(id).select("-senha");
};

// editar perfil 
export const updatePerfil = async (userId: string, data: any) => {
  const updated = await User.findByIdAndUpdate(
    userId,
    {
      nome: data.nome,
      biografia: data.biografia,
      curso: data.curso,
      instituicao: data.instituicao,
      fotoPerfil: data.fotoPerfil,
      habilidades: data.habilidades,
    },
    { new: true }
  ).select("-senha");

  return updated;
};

// listar conexões
export const getConnections = async (userId: string) => {
  const conexoes = await Conexao.find({
    $or: [{ usuario1: userId }, { usuario2: userId }],
  })
    .populate("usuario1", "nome curso fotoPerfil biografia instituicao")
    .populate("usuario2", "nome curso fotoPerfil biografia instituicao");

  return conexoes.map((conn) => {
    return String(conn.usuario1._id) === userId ? conn.usuario2 : conn.usuario1;
  });
};

// listar solicitações recebidas pendentes
export const getRequests = async (userId: string) => {
  const solicitacoes = await Solicitacao.find({
    destinatario: userId,
    status: "pendente",
  }).populate("remetente", "nome curso fotoPerfil");

  return solicitacoes;
};

// enviar solicitação de conexão
export const sendRequest = async (senderId: string, receiverId: string) => {
  if (senderId === receiverId)
    throw new Error("Você não pode enviar solicitação para si mesmo.");

  const receiver = await User.findById(receiverId);
  if (!receiver) throw new Error("Usuário destinatário não encontrado.");

  // verifica se já existe uma conexão ativa entre eles
  const jaConectados = await Conexao.findOne({
    $or: [
      { usuario1: senderId, usuario2: receiverId },
      { usuario1: receiverId, usuario2: senderId },
    ],
  });
  if (jaConectados) throw new Error("Vocês já são conexões.");

  // verifica se existe uma solicitação pendente
  const solicitacaoExistente = await Solicitacao.findOne({
    remetente: senderId,
    destinatario: receiverId,
    status: "pendente",
  });
  if (solicitacaoExistente) throw new Error("Solicitação já enviada e pendente.");

  // ccria a nova solicitação no banco
  await Solicitacao.create({
    remetente: senderId,
    destinatario: receiverId,
    status: "pendente",
  });

  return { message: "Solicitação enviada." };
};

// altera o status da solicitação e cria uma conexão
export const acceptRequest = async (userId: string, requestId: string) => {
  const solicitacao = await Solicitacao.findById(requestId);

  if (!solicitacao) throw new Error("Solicitação não encontrada.");
  if (String(solicitacao.destinatario) !== userId)
    throw new Error("Esta solicitação não foi enviada para você.");
  if (solicitacao.status !== "pendente")
    throw new Error("Esta solicitação já foi respondida.");

  // atualiza o status da solicitação
  solicitacao.status = "aceita";
  await solicitacao.save();

  // cria o vínculo de conexão
  await Conexao.create({
    usuario1: solicitacao.remetente,
    usuario2: solicitacao.destinatario,
  });

  return { message: "Conexão aceita." };
};

// recusa solicitação
export const rejectRequest = async (userId: string, requestId: string) => {
  const solicitacao = await Solicitacao.findById(requestId);

  if (!solicitacao) throw new Error("Solicitação não encontrada.");
  if (String(solicitacao.destinatario) !== userId)
    throw new Error("Ação não autorizada.");

  solicitacao.status = "recusada";
  await solicitacao.save();

  return { message: "Solicitação recusada." };
};