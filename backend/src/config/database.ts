import dns from "dns";
import mongoose from "mongoose";

// Define DNS público para evitar erro de resolução do MongoDB Atlas em algumas redes
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log(" OK MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("X Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}