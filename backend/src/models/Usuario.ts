import mongoose, { Schema, Document } from "mongoose";

export interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;

  curso?: string;
  instituicao?: string;
  biografia?: string;
  fotoPerfil?: string;

  habilidades: string[];
}

const UsuarioSchema = new Schema<IUsuario>(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    senha: {
      type: String,
      required: true,
    },

    curso: {
      type: String,
      default: "",
    },

    instituicao: {
      type: String,
      default: "",
    },

    biografia: {
      type: String,
      default: "",
    },

    fotoPerfil: {
      type: String,
      default: "",
    },

    habilidades: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUsuario>("Usuario", UsuarioSchema);