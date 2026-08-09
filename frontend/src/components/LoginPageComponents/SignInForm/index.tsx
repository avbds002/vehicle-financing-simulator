import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { TextInput } from "../TextInput";
import { FormAlert } from "../FormAlert";
import { FormFooterLink } from "../FormFooterLink";
import { SubmitButton } from "../SubmitButton";

interface SignInFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MAX_LENGTH = 12;

export const SignInForm = ({
  onSwitchToRegister,
  onLoginSuccess,
}: SignInFormProps) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Usuário é obrigatório.";
    } else if (username.length > USERNAME_MAX_LENGTH) {
      newErrors.username = `O usuário deve ter no máximo ${USERNAME_MAX_LENGTH} caracteres.`;
    }

    if (!password.trim()) {
      newErrors.password = "Senha é obrigatória.";
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      newErrors.password = `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setLoginError("");

    if (!validate()) return;

    const foundUser = login(username, password);

    if (!foundUser) {
      setLoginError("Usuário não encontrado. Verifique suas credenciais.");
      return;
    }

    setErrors({});
    setSuccessMessage(`Bem-vindo(a), ${foundUser.fullName}!`);

    // Redirect to simulation page after a brief delay
    setTimeout(() => {
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white">
      <div className="bg-blue-800 border-none rounded-t-2xl font-bold text-white text-xl sm:text-2xl lg:text-3xl text-shadow-md p-3">
        <h2>Entrar</h2>
      </div>

      <div className="p-4 sm:p-6">
        {successMessage && (
          <FormAlert message={successMessage} variant="success" />
        )}
        {loginError && <FormAlert message={loginError} variant="error" />}

        <form onSubmit={handleSubmit} noValidate>
          <TextInput
            id="signin-username"
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Informe seu usuário"
            maxLength={USERNAME_MAX_LENGTH}
            error={errors.username}
          />

          <TextInput
            id="signin-password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Informe sua senha"
            maxLength={PASSWORD_MAX_LENGTH}
            error={errors.password}
          />

          <SubmitButton label="Entrar" />
        </form>

        <FormFooterLink
          text="Não possui conta ?"
          linkText="Registre-se"
          onClick={onSwitchToRegister}
        />
      </div>
    </div>
  );
};
