import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { CreateUserDto, LoginUserDto } from '../dtos/AuthDto';
import { CpfValidatorService } from './CpfValidatorService';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * AuthService
 * Responsável pelos casos de uso de registro e autenticação de usuários.
 */
export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * UC01 — Cadastrar Novo Usuário
   * Valida CPF, maioridade, unicidade e cria o usuário com senha em hash.
   */
  async registerUser(dto: CreateUserDto) {
    // 1. Sanitiza e valida o CPF
    const sanitizedCpf = CpfValidatorService.sanitize(dto.cpf);
    if (!CpfValidatorService.validate(sanitizedCpf)) {
      throw new AppError('CPF inválido', 400);
    }

    // 2. Converte data de nascimento (DD/MM/AAAA → Date)
    const [day, month, year] = dto.dateOfBirth.split('/').map(Number);
    const dateOfBirth = new Date(year, month - 1, day);

    if (isNaN(dateOfBirth.getTime())) {
      throw new AppError('Data de nascimento inválida', 400);
    }

    // 3. Valida maioridade (≥ 18 anos)
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    if (age < 18) {
      throw new AppError('Você deve ter pelo menos 18 anos para se registrar', 400);
    }

    // 4. Verifica unicidade: username, email e CPF
    const [existingByUsername, existingByEmail, existingByCpf] = await Promise.all([
      this.userRepository.findByUsername(dto.username),
      this.userRepository.findByEmail(dto.email),
      this.userRepository.findByCpf(sanitizedCpf),
    ]);

    if (existingByUsername) {
      throw new AppError('Este nome de usuário já está cadastrado', 409);
    }
    if (existingByEmail) {
      throw new AppError('Este e-mail já está cadastrado', 409);
    }
    if (existingByCpf) {
      throw new AppError('Este CPF já está cadastrado', 409);
    }

    // 5. Gera hash bcrypt da senha
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // 6. Persiste o novo usuário
    const user = await this.userRepository.create({
      fullName: dto.fullName,
      email: dto.email,
      dateOfBirth,
      cpf: sanitizedCpf,
      username: dto.username,
      passwordHash,
    });

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
    };
  }

  /**
   * UC02 — Autenticar Usuário (Login)
   * Verifica credenciais e emite token JWT.
   */
  async loginUser(dto: LoginUserDto) {
    const user = await this.userRepository.findByUsername(dto.username);

    if (!user) {
      throw new AppError('Usuário ou senha incorretos', 401);
    }

    const isPasswordValid = await user.validatePassword(dto.password);
    if (!isPasswordValid) {
      throw new AppError('Usuário ou senha incorretos', 401);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET não configurado nas variáveis de ambiente');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      jwtSecret,
      { expiresIn: (process.env.JWT_EXPIRES_IN ?? '24h') as jwt.SignOptions['expiresIn'] }
    );

    return {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
      },
    };
  }

  /**
   * Valida e decodifica um token JWT.
   */
  validateToken(token: string): jwt.JwtPayload {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET não configurado nas variáveis de ambiente');
    }

    try {
      return jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    } catch {
      throw new AppError('Token inválido ou expirado', 401);
    }
  }
}
