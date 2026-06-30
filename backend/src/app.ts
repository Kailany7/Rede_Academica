import express from "express";
import cors from "cors";

import grupoRoutes from "./routes/grupoRoutes";
import buscaRoutes from "./routes/buscaRoutes";
import feedRoutes from "./routes/feedRoutes";
import authRoutes from "./routes/authRoutes";
import perfilRoutes from "./routes/perfilRoutes";
import onboardingRoutes from "./routes/onboardingRoutes";
import chatRoutes from "./routes/chatRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";

const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/grupos", grupoRoutes);
app.use("/busca", buscaRoutes);
app.use("/feed", feedRoutes);
app.use("/perfil", perfilRoutes);
app.use("/onboarding", onboardingRoutes);
app.use("/chat",chatRoutes);
app.use("/usuarios", usuarioRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    message: "API Rede Acadêmica rodando!",
  });
});

export default app;
