import Grupo from "../models/Grupo";
import Publicacao from "../models/Publicacao";

export async function buscarConteudos(termo: string) {
  const grupos = await Grupo.find({
    $or: [
      { nome: { $regex: termo, $options: "i" } },
      { descricao: { $regex: termo, $options: "i" } },
    ],
  });

  const publicacoes = await Publicacao.find({
    conteudo: { $regex: termo, $options: "i" },
  });

  return {
    usuarios: [],
    publicacoes,
    grupos,
  };
}