import mongoose, { Schema, Document } from "mongoose";

export interface IPublicacao extends Document {
  autor: string;
  autorCurso: string;
  avatarColor: string;
  conteudo: string;
  curtidas: number;
  comentarios: mongoose.Types.ObjectId[];
  data: Date;
}

const PublicacaoSchema = new Schema<IPublicacao>({
  autor:        { type: String, required: true },
  autorCurso:   { type: String, default: "" },
  avatarColor:  { type: String, default: "#1B4F8A" },
  conteudo:     { type: String, required: true, trim: true },
  curtidas:     { type: Number, default: 0 },
  comentarios:  [{ type: Schema.Types.ObjectId, ref: "Comentario" }],
  data:         { type: Date, default: Date.now },
});

export default mongoose.model<IPublicacao>("Publicacao", PublicacaoSchema);
