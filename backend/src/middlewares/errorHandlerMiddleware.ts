import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../services/AuthService';

/**
 * ErrorHandlerMiddleware
 * Middleware global do Express para capturar e formatar todos os erros da aplicação.
 * Deve ser registrado como o último middleware em `app.ts`.
 */
export function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Erros de validação do Zod — retorna detalhes de cada campo inválido
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    res.status(400).json({
      error: 'Dados de entrada inválidos',
      details: errors,
    });
    return;
  }

  // Erros de negócio conhecidos (AppError) — retorna o status e mensagem corretos
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Erros inesperados — responde com 500 Internal Server Error
  console.error('[ErrorHandler] Erro inesperado:', err);
  res.status(500).json({
    error: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
  });
}
