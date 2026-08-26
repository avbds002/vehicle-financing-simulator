import bcrypt from 'bcryptjs';

/**
 * Entidade de domínio: User
 * Representa um usuário cadastrado no sistema.
 */
export class User {
  public readonly id: string;
  public readonly fullName: string;
  public readonly email: string;
  public readonly dateOfBirth: Date;
  public readonly cpf: string;
  public readonly username: string;
  public readonly passwordHash: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: {
    id: string;
    fullName: string;
    email: string;
    dateOfBirth: Date;
    cpf: string;
    username: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.email = props.email;
    this.dateOfBirth = props.dateOfBirth;
    this.cpf = props.cpf;
    this.username = props.username;
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  /**
   * Verifica se o usuário possui pelo menos 18 anos completos na data atual.
   */
  isLegalAge(): boolean {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  }

  /**
   * Compara a senha informada com o hash armazenado utilizando bcrypt.
   */
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}
