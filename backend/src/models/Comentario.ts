import mongoose, { Schema, Document } from "mongoose";

export interface IComentario extends Document {
  autor: string;
  autorCurso: string;
  avatarColor: string;
  publicacao: mongoose.Types.ObjectId;
  conteudo: string;
  data: Date;
}

const ComentarioSchema = new Schema<IComentario>({
  autor:       { type: String, required: true },
  autorCurso:  { type: String, default: "" },
  avatarColor: { type: String, default: "#1B4F8A" },
  publicacao:  { type: Schema.Types.ObjectId, ref: "Publicacao", required: true },
  conteudo:    { type: String, required: true, trim: true },
  data:        { type: Date, default: Date.now },
});

export default mongoose.model<IComentario>("Comentario", ComentarioSchema);
