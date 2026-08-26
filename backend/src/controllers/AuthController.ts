import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { CreateUserSchema, LoginUserSchema } from '../dtos/AuthDto';
import { UserRepositoryImpl } from '../repositories/UserRepositoryImpl';

const userRepository = new UserRepositoryImpl();
const authService = new AuthService(userRepository);

/**
 * AuthController
 * Handlers HTTP para os endpoints de autenticação:
 *   POST /api/auth/register
 *   POST /api/auth/login
 */
export class AuthController {
  /**
   * POST /api/auth/register
   * UC01 — Cadastrar Novo Usuário
   */
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = CreateUserSchema.parse(req.body);
      const user = await authService.registerUser(dto);

      res.status(201).json({
        message: 'Usuário cadastrado com sucesso',
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/auth/login
   * UC02 — Autenticar Usuário (Login)
   */
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = LoginUserSchema.parse(req.body);
      const result = await authService.loginUser(dto);

      res.status(200).json({
        message: 'Login realizado com sucesso',
        ...result,
      });
    } catch (err) {
      next(err);
    }
  }
}
