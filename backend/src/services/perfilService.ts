import User from "../models/Usuario";
import Solicitacao from "../models/Solicitacao";
import Conexao from "../models/Conexao";
import Publicacao from "../models/Publicacao";

// monta o perfil já com as estatísticas reais (posts e conexões)
const montarPerfilComEstatisticas = async (usuario: any) => {
  if (!usuario) return null;

  const [posts, connections] = await Promise.all([
    Publicacao.countDocuments({ autor: usuario.nome }),
    Conexao.countDocuments({
      $or: [{ usuario1: usuario._id }, { usuario2: usuario._id }],
    }),
  ]);

  return {
    ...usuario.toObject(),
    posts,
    connections,
  };
};

// buscar meu perfil
export const getMyPerfil = async (userId: string) => {
  const usuario = await User.findById(userId).select("-senha");
  return montarPerfilComEstatisticas(usuario);
};

// buscar perfil por ID
export const getPerfilById = async (id: string) => {
  const usuario = await User.findById(id).select("-senha");
  return montarPerfilComEstatisticas(usuario);
};

// editar perfil 
export const updatePerfil = async (userId: string, data: any) => {
  const usuario = await User.findByIdAndUpdate(
    userId,
    {
      nome: data.nome,
      curso: data.curso,
      semestre: data.semestre,
      bio: data.bio,
      avatarColor: data.avatarColor,
      experiences: data.experiences,
    },
    { new: true }
  ).select("-senha");

  return montarPerfilComEstatisticas(usuario);
};

// listar conexões
export const getConnections = async (userId: string) => {
  const conexoes = await Conexao.find({
    $or: [{ usuario1: userId }, { usuario2: userId }],
  })
    .populate("usuario1", "nome curso semestre bio avatarColor")
    .populate("usuario2", "nome curso semestre bio avatarColor");

  return conexoes.map((conn) => {
    return String(conn.usuario1._id) === userId ? conn.usuario2 : conn.usuario1;
  });
};

// remover uma conexão existente
export const removeConnection = async (userId: string, outroUserId: string) => {
  const resultado = await Conexao.findOneAndDelete({
    $or: [
      { usuario1: userId, usuario2: outroUserId },
      { usuario1: outroUserId, usuario2: userId },
    ],
  });

  if (!resultado) throw new Error("Conexão não encontrada.");

  return { message: "Conexão removida." };
};

// listar solicitações recebidas pendentes
export const getRequests = async (userId: string) => {
  const solicitacoes = await Solicitacao.find({
    destinatario: userId,
    status: "pendente",
  }).populate("remetente", "nome curso semestre avatarColor");

  return solicitacoes;
};

// listar sugestões de conexão (usuários que ainda não são conexão)
export const getSuggestions = async (userId: string) => {
  const [conexoes, solicitacoesEnviadas] = await Promise.all([
    Conexao.find({ $or: [{ usuario1: userId }, { usuario2: userId }] }),
    Solicitacao.find({ remetente: userId, status: "pendente" }),
  ]);

  const idsConectados = conexoes.map((c) =>
    String(c.usuario1) === userId ? String(c.usuario2) : String(c.usuario1)
  );
  const idsSolicitados = solicitacoesEnviadas.map((s) => String(s.destinatario));

  const usuarios = await User.find({
    _id: { $nin: [...idsConectados, userId] },
  }).select("nome curso semestre avatarColor");

  return usuarios.map((u) => ({
    ...u.toObject(),
    solicitacaoEnviada: idsSolicitados.includes(String(u._id)),
  }));
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