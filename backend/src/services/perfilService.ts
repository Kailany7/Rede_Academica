import User from "../models/User";

export const getMyPerfil = async (userId: string) => {
  return await User.findById(userId).select("-senha");
};

export const getPerfilById = async (id: string) => {
  return await User.findById(id).select("-senha");
};

export const updatePerfil = async (userId: string, data: any) => {
  const updated = await User.findByIdAndUpdate(
    userId,
    {
      nome: data.nome,
      bio: data.bio,
      curso: data.curso,
      semestre: data.semestre,
      avatar: data.avatar,
    },
    { new: true }
  ).select("-senha");

  return updated;
};

export const getConnections = async (userId: string) => {
  const user = await User.findById(userId).populate(
    "conexoes",
    "nome curso avatar bio semestre"
  );

  return user?.conexoes;
};

export const getRequests = async (userId: string) => {
  const user = await User.findById(userId).populate(
    "solicitacoesRecebidas",
    "nome curso avatar"
  );

  return user?.solicitacoesRecebidas;
};

export const sendRequest = async (
  senderId: string,
  receiverId: string
) => {
  if (senderId === receiverId)
    throw new Error("Você não pode enviar solicitação para si mesmo.");

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver)
    throw new Error("Usuário não encontrado.");

  if (sender.conexoes.includes(receiver._id))
    throw new Error("Vocês já são conexões.");

  if (sender.solicitacoesEnviadas.includes(receiver._id))
    throw new Error("Solicitação já enviada.");

  sender.solicitacoesEnviadas.push(receiver._id);
  receiver.solicitacoesRecebidas.push(sender._id);

  await sender.save();
  await receiver.save();

  return { message: "Solicitação enviada." };
};

export const acceptRequest = async (
  userId: string,
  requesterId: string
) => {
  const user = await User.findById(userId);
  const requester = await User.findById(requesterId);

  if (!user || !requester)
    throw new Error("Usuário não encontrado.");

  user.conexoes.push(requester._id);
  requester.conexoes.push(user._id);

  user.solicitacoesRecebidas =
    user.solicitacoesRecebidas.filter(
      (id: any) => id.toString() !== requesterId
    );

  requester.solicitacoesEnviadas =
    requester.solicitacoesEnviadas.filter(
      (id: any) => id.toString() !== userId
    );

  await user.save();
  await requester.save();

  return { message: "Conexão aceita." };
};

export const rejectRequest = async (
  userId: string,
  requesterId: string
) => {
  const user = await User.findById(userId);
  const requester = await User.findById(requesterId);

  if (!user || !requester)
    throw new Error("Usuário não encontrado.");

  user.solicitacoesRecebidas =
    user.solicitacoesRecebidas.filter(
      (id: any) => id.toString() !== requesterId
    );

  requester.solicitacoesEnviadas =
    requester.solicitacoesEnviadas.filter(
      (id: any) => id.toString() !== userId
    );

  await user.save();
  await requester.save();

  return { message: "Solicitação recusada." };
};