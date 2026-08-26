import { z } from 'zod';

/**
 * DTO para cadastro de novo usuário.
 * Valida todos os campos conforme as regras de negócio documentadas.
 */
export const CreateUserSchema = z.object({
  fullName: z
    .string({ required_error: 'Nome completo é obrigatório' })
    .min(3, 'Nome completo deve ter pelo menos 3 caracteres')
    .max(100, 'Nome completo deve ter no máximo 100 caracteres'),

  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('Formato de e-mail inválido'),

  dateOfBirth: z
    .string({ required_error: 'Data de nascimento é obrigatória' })
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data de nascimento deve estar no formato DD/MM/AAAA'
    ),

  cpf: z
    .string({ required_error: 'CPF é obrigatório' })
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'Formato de CPF inválido'),

  username: z
    .string({ required_error: 'Nome de usuário é obrigatório' })
    .min(10, 'Nome de usuário deve ter entre 10 e 20 caracteres')
    .max(20, 'Nome de usuário deve ter entre 10 e 20 caracteres')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Nome de usuário só pode conter letras, números e underscores'
    ),

  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(8, 'Senha deve ter entre 8 e 12 caracteres')
    .max(12, 'Senha deve ter entre 8 e 12 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
    .regex(/[^a-zA-Z0-9]/, 'Senha deve conter pelo menos um caractere especial'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

// -----------------------------------------------------------------------

/**
 * DTO para autenticação de usuário (login).
 */
export const LoginUserSchema = z.object({
  username: z
    .string({ required_error: 'Nome de usuário é obrigatório' })
    .min(1, 'Nome de usuário é obrigatório'),

  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(1, 'Senha é obrigatória'),
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>;
