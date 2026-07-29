interface RegisterFormProps {
  onSwitchToSignIn: () => void;
}

export const RegisterForm = ({ onSwitchToSignIn }: RegisterFormProps) => {
  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white">
      <div className="bg-blue-800 border-none rounded-t-2xl font-bold text-white text-xl sm:text-2xl lg:text-3xl text-shadow-md p-3">
        <h2>Register</h2>
      </div>

      <div className="p-4 sm:p-6">
        <p className="text-slate-600 text-sm mb-4">
          Registration form coming soon.
        </p>

        {/* Link back to Sign In */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-blue-700 hover:text-blue-900 font-semibold underline cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
