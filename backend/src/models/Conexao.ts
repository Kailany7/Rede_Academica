import mongoose, { Schema, Document } from "mongoose";

export interface IConexao extends Document {
  usuario1: mongoose.Types.ObjectId;
  usuario2: mongoose.Types.ObjectId;
}

const ConexaoSchema = new Schema<IConexao>(
  {
    usuario1: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    usuario2: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IConexao>(
  "Conexao",
  ConexaoSchema
);