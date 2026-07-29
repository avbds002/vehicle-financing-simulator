import type { RegisteredUser } from "../types";

export interface RegisterErrors {
  fullName?: string;
  email?: string;
  dateOfBirth?: string;
  cpf?: string;
  username?: string;
  password?: string;
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  dateOfBirth: string;
  cpf: string;
  username: string;
  password: string;
}

const USERNAME_MIN_LENGTH = 10;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 12;

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isOfLegalAge = (dateStr: string): boolean => {
  const birthDate = new Date(dateStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 18;
};

export const isValidCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  // Reject known invalid sequences (all same digit)
  if (/^(\d)\1{10}$/.test(digits)) return false;

  // Validate check digits
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits.charAt(10))) return false;

  return true;
};

export const formatCPF = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

export const isValidPassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

/**
 * Validates all register form fields.
 * Returns an errors object — empty means all fields are valid.
 */
export function validateRegisterForm(
  values: RegisterFormValues
): RegisterErrors {
  const errors: RegisterErrors = {};

  // Full name
  if (!values.fullName.trim()) {
    errors.fullName = "Nome completo é obrigatório.";
  }

  // Email
  if (!values.email.trim()) {
    errors.email = "E-mail é obrigatório.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  // Date of birth
  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Data de nascimento é obrigatória.";
  } else if (!isOfLegalAge(values.dateOfBirth)) {
    errors.dateOfBirth =
      "Você deve ter pelo menos 18 anos para se registrar.";
  }

  // CPF
  if (!values.cpf.trim()) {
    errors.cpf = "CPF é obrigatório.";
  } else if (!isValidCPF(values.cpf)) {
    errors.cpf = "Informe um CPF válido.";
  }

  // Username
  if (!values.username.trim()) {
    errors.username = "Usuário é obrigatório.";
  } else if (values.username.length < USERNAME_MIN_LENGTH) {
    errors.username = `O usuário deve ter no mínimo ${USERNAME_MIN_LENGTH} caracteres.`;
  } else if (values.username.length > USERNAME_MAX_LENGTH) {
    errors.username = `O usuário deve ter no máximo ${USERNAME_MAX_LENGTH} caracteres.`;
  }

  // Password
  if (!values.password.trim()) {
    errors.password = "Senha é obrigatória.";
  } else if (values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`;
  } else if (values.password.length > PASSWORD_MAX_LENGTH) {
    errors.password = `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres.`;
  } else if (!isValidPassword(values.password)) {
    errors.password =
      "A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial.";
  }

  return errors;
}

/**
 * Attempts to register a new user. Returns an error message string
 * if the username already exists, or null on success.
 */
export function registerUser(values: RegisterFormValues): string | null {
  const newUser: RegisteredUser = {
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    dateOfBirth: values.dateOfBirth,
    cpf: values.cpf.replace(/\D/g, ""),
    username: values.username.trim(),
    password: values.password,
  };

  const stored = localStorage.getItem("users");
  const users: RegisteredUser[] = stored ? JSON.parse(stored) : [];

  const userExists = users.some((u) => u.username === newUser.username);
  if (userExists) {
    return "Este usuário já está cadastrado.";
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return null;
}
