import mongoose, { Schema, Document } from "mongoose";

export interface IComentario extends Document {
  autor: mongoose.Types.ObjectId;
  publicacao: mongoose.Types.ObjectId;
  conteudo: string;
  data: Date;
}

const ComentarioSchema = new Schema<IComentario>({
  autor:      { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  publicacao: { type: Schema.Types.ObjectId, ref: "Publicacao", required: true },
  conteudo:   { type: String, required: true, trim: true },
  data:       { type: Date, default: Date.now },
});

export default mongoose.model<IComentario>("Comentario", ComentarioSchema);
