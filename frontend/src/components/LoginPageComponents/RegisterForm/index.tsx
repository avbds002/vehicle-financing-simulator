import { useState } from "react";
import { TextInput } from "../TextInput";
import { FormAlert } from "../FormAlert";
import { FormFooterLink } from "../FormFooterLink";
import { SubmitButton } from "../SubmitButton";
import {
  validateRegisterForm,
  registerUser,
  formatCPF,
  formatDateOfBirth,
} from "../../../utils/validateRegisterForm";
import type { RegisterErrors } from "../../../utils/validateRegisterForm";

interface RegisterFormProps {
  onSwitchToSignIn: () => void;
}

const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MAX_LENGTH = 12;

export const RegisterForm = ({ onSwitchToSignIn }: RegisterFormProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cpf, setCpf] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(formatDateOfBirth(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");

    const validationErrors = validateRegisterForm({
      fullName,
      email,
      dateOfBirth,
      cpf,
      username,
      password,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Attempt registration
    const registerError = registerUser({
      fullName,
      email,
      dateOfBirth,
      cpf,
      username,
      password,
    });

    if (registerError) {
      setErrors({ username: registerError });
      return;
    }

    // Reset form on success
    setFullName("");
    setEmail("");
    setDateOfBirth("");
    setCpf("");
    setUsername("");
    setPassword("");
    setErrors({});
    setSuccessMessage("Conta criada com sucesso! Faça login para continuar.");
  };

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white">
      <div className="bg-blue-800 border-none rounded-t-2xl font-bold text-white text-xl sm:text-2xl lg:text-3xl text-shadow-md p-3">
        <h2>Registre-se</h2>
      </div>

      <div className="p-4 sm:p-6">
        {successMessage && (
          <FormAlert message={successMessage} variant="success" />
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextInput
            id="register-fullname"
            label="Nome Completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Informe seu nome completo"
            error={errors.fullName}
          />

          <TextInput
            id="register-email"
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
            error={errors.email}
          />

          <TextInput
            id="register-dob"
            label="Data de Nascimento"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
            placeholder="dd/mm/aaaa"
            maxLength={10}
            error={errors.dateOfBirth}
          />

          <TextInput
            id="register-cpf"
            label="CPF"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="000.000.000-00"
            error={errors.cpf}
          />

          <TextInput
            id="register-username"
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Mínimo 10, máximo 20 caracteres"
            maxLength={USERNAME_MAX_LENGTH}
            error={errors.username}
          />

          <TextInput
            id="register-password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mín. 8, máx. 12 caracteres"
            maxLength={PASSWORD_MAX_LENGTH}
            error={errors.password}
          />

          <SubmitButton label="Registrar" />
        </form>

        <FormFooterLink
          text="Já possui uma conta?"
          linkText="Entrar"
          onClick={onSwitchToSignIn}
        />
      </div>
    </div>
  );
};
