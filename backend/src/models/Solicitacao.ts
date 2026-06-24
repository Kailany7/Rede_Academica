import mongoose, { Schema, Document } from "mongoose";

export interface ISolicitacao extends Document {
  remetente: mongoose.Types.ObjectId;
  destinatario: mongoose.Types.ObjectId;
  status: "pendente" | "aceita" | "recusada";
}

const SolicitacaoSchema = new Schema<ISolicitacao>(
  {
    remetente: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    destinatario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    status: {
      type: String,
      enum: ["pendente", "aceita", "recusada"],
      default: "pendente",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISolicitacao>(
  "Solicitacao",
  SolicitacaoSchema
);