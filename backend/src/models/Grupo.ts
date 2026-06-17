import mongoose, { Schema, Document } from "mongoose";

export interface IGrupo extends Document {
  nome: string;
  descricao: string;
  membros: mongoose.Types.ObjectId[];
  dataCriacao: Date;
}

const GrupoSchema = new Schema<IGrupo>({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  descricao: {
    type: String,
    required: true,
    trim: true,
  },
  membros: [
    {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  ],
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IGrupo>("Grupo", GrupoSchema);