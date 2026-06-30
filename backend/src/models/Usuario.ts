import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IExperiencia {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;
  curso: string;
  semestre: string;
  bio: string;
  avatarColor: string;
  experiences: IExperiencia[];
  dataCriacao: Date;
  compararSenha(senhaDigitada: string): Promise<boolean>;
}

const ExperienciaSchema = new Schema<IExperiencia>(
  {
    title: { type: String, default: "" },
    company: { type: String, default: "" },
    period: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false },
);

const UsuarioSchema = new Schema<IUsuario>({
  nome: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  senha: { type: String, required: true },
  curso: { type: String, default: "" },
  semestre: { type: String, default: "" },
  bio: { type: String, default: "" },
  avatarColor: { type: String, default: "#1B4F8A" },
  experiences: { type: [ExperienciaSchema], default: [] },
  dataCriacao: { type: Date, default: Date.now },
});

// Hash da senha antes de salvar
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Método para comparar senha no login
UsuarioSchema.methods.compararSenha = async function (
  senhaDigitada: string,
): Promise<boolean> {
  return bcrypt.compare(senhaDigitada, this.senha);
};

export default mongoose.model<IUsuario>("Usuario", UsuarioSchema);