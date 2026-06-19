import Grupo from "../models/Grupo";

export async function buscarConteudos(termo: string) {
  // Busca grupos pelo nome ou pela descrição
  const grupos = await Grupo.find({
    $or: [
      { nome: { $regex: termo, $options: "i" } },
      { descricao: { $regex: termo, $options: "i" } },
    ],
  });

  /*
    Retor esse formato já no futuro.

    Hoje:
    usuarios e publicacoes ficam vazios.

    Depois:
    adicionar as buscas reais no arrays.
  */
  return {
    usuarios: [],
    publicacoes: [],
    grupos,
  };
}