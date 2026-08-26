import { IUserRepository } from '../domain/repositories/IUserRepository';
import { User } from '../domain/entities/User';
import { prisma } from '../config/prisma';

/**
 * Implementação concreta do IUserRepository utilizando Prisma ORM + PostgreSQL.
 */
export class UserRepositoryImpl implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id } });
    if (!record) return null;
    return this.toEntity(record);
  }

  async findByUsername(username: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { username } });
    if (!record) return null;
    return this.toEntity(record);
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { email } });
    if (!record) return null;
    return this.toEntity(record);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { cpf } });
    if (!record) return null;
    return this.toEntity(record);
  }

  async create(data: {
    fullName: string;
    email: string;
    dateOfBirth: Date;
    cpf: string;
    username: string;
    passwordHash: string;
  }): Promise<User> {
    const record = await prisma.user.create({ data });
    return this.toEntity(record);
  }

  private toEntity(record: {
    id: string;
    fullName: string;
    email: string;
    dateOfBirth: Date;
    cpf: string;
    username: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User({
      id: record.id,
      fullName: record.fullName,
      email: record.email,
      dateOfBirth: record.dateOfBirth,
      cpf: record.cpf,
      username: record.username,
      passwordHash: record.passwordHash,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
