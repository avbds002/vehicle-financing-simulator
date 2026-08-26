import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * AuthMiddleware
 * Intercepta rotas protegidas, valida o Bearer token JWT e
 * anexa o payload decodificado em `req.user`.
 */
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Acesso negado. Token de autenticação não fornecido.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({ error: 'Configuração de autenticação inválida.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload & {
      id: string;
      username: string;
    };

    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expirado. Faça login novamente.' });
    } else {
      res.status(401).json({ error: 'Token inválido.' });
    }
  }
}
