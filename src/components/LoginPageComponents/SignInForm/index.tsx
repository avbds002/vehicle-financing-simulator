import { useState, useEffect } from "react";

interface SignInFormProps {
  onSwitchToRegister: () => void;
}

const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MAX_LENGTH = 12;

export const SignInForm = ({ onSwitchToRegister }: SignInFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>(
    {}
  );

  // Clear session storage when the page/tab is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("password");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const validate = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    } else if (username.length > USERNAME_MAX_LENGTH) {
      newErrors.username = `Username must be at most ${USERNAME_MAX_LENGTH} characters.`;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      newErrors.password = `Password must be at most ${PASSWORD_MAX_LENGTH} characters.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    // Save credentials to session storage
    sessionStorage.setItem("user", username);
    sessionStorage.setItem("password", password);
  };

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white">
      <div className="bg-blue-800 border-none rounded-t-2xl font-bold text-white text-xl sm:text-2xl lg:text-3xl text-shadow-md p-3">
        <h2>Sign In</h2>
      </div>

      <div className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} noValidate>
          {/* Username field */}
          <div className="mb-4">
            <label
              htmlFor="signin-username"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Username
            </label>
            <input
              id="signin-username"
              type="text"
              maxLength={USERNAME_MAX_LENGTH}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
            <p className="text-slate-400 text-xs mt-1 text-right">
              {username.length}/{USERNAME_MAX_LENGTH}
            </p>
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label
              htmlFor="signin-password"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              maxLength={PASSWORD_MAX_LENGTH}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <p className="text-slate-400 text-xs mt-1 text-right">
              {password.length}/{PASSWORD_MAX_LENGTH}
            </p>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Link to Register */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-700 hover:text-blue-900 font-semibold underline cursor-pointer"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};
