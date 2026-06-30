import Grupo from "../models/Grupo";
import Publicacao from "../models/Publicacao";
import Usuario from "../models/Usuario";

export async function buscarConteudos(termo: string) {
  const usuarios = await Usuario.find({
    $or: [
      { nome: { $regex: termo, $options: "i" } },
      { curso: { $regex: termo, $options: "i" } },
      { semestre: { $regex: termo, $options: "i" } },
      { bio: { $regex: termo, $options: "i" } },
    ],
  }).select("-senha");

  const grupos = await Grupo.find({
    $or: [
      { nome: { $regex: termo, $options: "i" } },
      { descricao: { $regex: termo, $options: "i" } },
    ],
  });

  const publicacoes = await Publicacao.find({
    $or: [
      { conteudo: { $regex: termo, $options: "i" } },
      { autor: { $regex: termo, $options: "i" } },
      { autorCurso: { $regex: termo, $options: "i" } },
    ],
  }).sort({ data: -1 });

  return {
    usuarios,
    publicacoes,
    grupos,
  };
}