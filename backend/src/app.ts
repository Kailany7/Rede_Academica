import express from "express";
import cors from "cors";

import grupoRoutes from "./routes/grupoRoutes";
import buscaRoutes from "./routes/buscaRoutes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/grupos", grupoRoutes);
app.use("/busca", buscaRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    message: "API Rede Acadêmica rodando!",
  });
});

export default app;