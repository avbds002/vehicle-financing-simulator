import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/LoginPageComponents/RegisterForm";
import { SignInForm } from "../components/LoginPageComponents/SignInForm";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to simulation page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLoginSuccess = () => {
    navigate("/");
  };

  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:p-12">
      <div className="w-full md:w-1/2">
        {isSignIn ? (
          <SignInForm
            onSwitchToRegister={() => setIsSignIn(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <RegisterForm onSwitchToSignIn={() => setIsSignIn(true)} />
        )}
      </div>
    </main>
  );
};
