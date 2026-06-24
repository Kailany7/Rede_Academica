import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // =========================================================================
  // AMBIENTE DE TESTES: Autenticação manual temporária
  // =========================================================================
  
  req.user = {
    id: "6a3c2a5d11df0d8f22add551", // Seu ID gerado no MongoDB
    email: "teste@academic.com",     // E-mail fictício para o payload
  };

  // Chama o próximo passo (controller) ignorando a checagem do token real
  next(); 

  // =========================================================================
  // CÓDIGO ORIGINAL (Comentei para quando seu colega finalizar o Login)
  // =========================================================================
  /*
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: "Token não informado.",
    });
    return;
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    res.status(401).json({
      message: "Token inválido.",
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (typeof decoded === "string") {
      res.status(401).json({
        message: "Token inválido.",
      });
      return;
    }

    req.user = {
      id: String(decoded.id),
      email: String(decoded.email),
    };

    next();
  } catch {
    res.status(401).json({
      message: "Token expirado ou inválido.",
    });
  }
  */
}