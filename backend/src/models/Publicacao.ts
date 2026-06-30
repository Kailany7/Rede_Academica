import mongoose, { Schema, Document } from "mongoose";

export interface IPublicacao extends Document {
  autor: mongoose.Types.ObjectId;
  conteudo: string;
  curtidas: number;
  curtidoPor: mongoose.Types.ObjectId[];
  comentarios: mongoose.Types.ObjectId[];
  data: Date;
}

const PublicacaoSchema = new Schema<IPublicacao>({
  autor:      { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  conteudo:   { type: String, required: true, trim: true },
  curtidas:   { type: Number, default: 0 },
  curtidoPor: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
  comentarios: [{ type: Schema.Types.ObjectId, ref: "Comentario" }],
  data:       { type: Date, default: Date.now },
});

export default mongoose.model<IPublicacao>("Publicacao", PublicacaoSchema);
