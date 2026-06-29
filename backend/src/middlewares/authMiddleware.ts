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
  next: NextFunction,
): void {

  // INFORMAÇÕES DE AUTENTICAÇÃO SIMULADAS PARA TESTES

  req.user = {
    id: "6b4d3e6f7a8b9c0d1e2f3a4b",
    email: "mariana@academic.com",
  };

  next();

}
