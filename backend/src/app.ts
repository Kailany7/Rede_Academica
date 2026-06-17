import express from "express";
import cors from "cors";

import grupoRoutes from "./routes/grupoRoutes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/grupos", grupoRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    message: "API Rede Acadêmica rodando!",
  });
});

export default app;