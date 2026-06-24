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
}