import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    senha: {
      type: String,
      required: true,
    },

    curso: {
      type: String,
      required: true,
    },

    semestre: {
      type: Number,
      required: true,
    },

    bio: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    conexoes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    solicitacoesRecebidas: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    solicitacoesEnviadas: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);