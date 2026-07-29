import { useState } from "react";
import type { RegisteredUser } from "../../../types";

interface RegisterFormProps {
  onSwitchToSignIn: () => void;
}

const USERNAME_MIN_LENGTH = 10;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 12;

interface RegisterErrors {
  fullName?: string;
  email?: string;
  dateOfBirth?: string;
  cpf?: string;
  username?: string;
  password?: string;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isOfLegalAge = (dateStr: string): boolean => {
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

const isValidCPF = (cpf: string): boolean => {
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

const formatCPF = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

const isValidPassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

export const RegisterForm = ({ onSwitchToSignIn }: RegisterFormProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cpf, setCpf] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: RegisterErrors = {};

    // Full name
    if (!fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório.";
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Informe um e-mail válido.";
    }

    // Date of birth
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Data de nascimento é obrigatória.";
    } else if (!isOfLegalAge(dateOfBirth)) {
      newErrors.dateOfBirth =
        "Você deve ter pelo menos 18 anos para se registrar.";
    }

    // CPF
    if (!cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório.";
    } else if (!isValidCPF(cpf)) {
      newErrors.cpf = "Informe um CPF válido.";
    }

    // Username
    if (!username.trim()) {
      newErrors.username = "Usuário é obrigatório.";
    } else if (username.length < USERNAME_MIN_LENGTH) {
      newErrors.username = `O usuário deve ter no mínimo ${USERNAME_MIN_LENGTH} caracteres.`;
    } else if (username.length > USERNAME_MAX_LENGTH) {
      newErrors.username = `O usuário deve ter no máximo ${USERNAME_MAX_LENGTH} caracteres.`;
    }

    // Password
    if (!password.trim()) {
      newErrors.password = "Senha é obrigatória.";
    } else if (password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`;
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      newErrors.password = `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres.`;
    } else if (!isValidPassword(password)) {
      newErrors.password =
        "A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validate()) return;

    // Build the new user
    const newUser: RegisteredUser = {
      fullName: fullName.trim(),
      email: email.trim(),
      dateOfBirth,
      cpf: cpf.replace(/\D/g, ""),
      username: username.trim(),
      password,
    };

    // Read existing users from localStorage
    const stored = localStorage.getItem("users");
    const users: RegisteredUser[] = stored ? JSON.parse(stored) : [];

    // Check if username already exists
    const userExists = users.some((u) => u.username === newUser.username);
    if (userExists) {
      setErrors({ username: "Este usuário já está cadastrado." });
      return;
    }

    // Save updated array
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Reset form
    setFullName("");
    setEmail("");
    setDateOfBirth("");
    setCpf("");
    setUsername("");
    setPassword("");
    setErrors({});
    setSuccessMessage("Conta criada com sucesso! Faça login para continuar.");
  };

  const inputClass = (field: keyof RegisterErrors) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? "border-red-500" : "border-slate-300"
    }`;

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white">
      <div className="bg-blue-800 border-none rounded-t-2xl font-bold text-white text-xl sm:text-2xl lg:text-3xl text-shadow-md p-3">
        <h2>Registre-se</h2>
      </div>

      <div className="p-4 sm:p-6">
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 text-sm rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="register-fullname"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Nome Completo
            </label>
            <input
              id="register-fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Informe seu nome completo"
              className={inputClass("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="register-email"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              E-mail
            </label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label
              htmlFor="register-dob"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Data de Nascimento
            </label>
            <input
              id="register-dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className={inputClass("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* CPF */}
          <div className="mb-4">
            <label
              htmlFor="register-cpf"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              CPF
            </label>
            <input
              id="register-cpf"
              type="text"
              value={cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              className={inputClass("cpf")}
            />
            {errors.cpf && (
              <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="register-username"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Usuário
            </label>
            <input
              id="register-username"
              type="text"
              maxLength={USERNAME_MAX_LENGTH}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Mínimo 10, máximo 20 caracteres"
              className={inputClass("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
            <p className="text-slate-400 text-xs mt-1 text-right">
              {username.length}/{USERNAME_MAX_LENGTH}
            </p>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="register-password"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Senha
            </label>
            <input
              id="register-password"
              type="password"
              maxLength={PASSWORD_MAX_LENGTH}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mín. 8, máx. 12 caracteres"
              className={inputClass("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <p className="text-slate-400 text-xs mt-1 text-right">
              {password.length}/{PASSWORD_MAX_LENGTH}
            </p>
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Registrar
          </button>
        </form>

        {/* Link back to Sign In */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Já possui uma conta?{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-blue-700 hover:text-blue-900 font-semibold underline cursor-pointer"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
};
