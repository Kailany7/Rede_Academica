import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log(" OK MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("X Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}