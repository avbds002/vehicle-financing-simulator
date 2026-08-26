import { User } from '../entities/User';

/**
 * Interface de repositório para operações de persistência de usuários.
 * Segue o Dependency Inversion Principle (DIP).
 */
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  create(user: {
    fullName: string;
    email: string;
    dateOfBirth: Date;
    cpf: string;
    username: string;
    passwordHash: string;
  }): Promise<User>;
}
