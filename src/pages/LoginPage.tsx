import { useState } from "react";
import { RegisterForm } from "../components/LoginPageComponents/RegisterForm";
import { SignInForm } from "../components/LoginPageComponents/SignInForm";

export const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <main className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:p-12">
      <div className="w-full md:w-1/2">
        {isSignIn ? (
          <SignInForm onSwitchToRegister={() => setIsSignIn(false)} />
        ) : (
          <RegisterForm onSwitchToSignIn={() => setIsSignIn(true)} />
        )}
      </div>
    </main>
  );
};
