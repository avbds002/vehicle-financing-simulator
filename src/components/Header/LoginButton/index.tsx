interface LoginButtonProps {
  username?: string;
  isLoggedIn?: boolean;
}

export const LoginButton = () => {
  return (
    <button className="text-white font-semibold bg-emerald-500 rounded p-2 w-28">
      LOGIN
    </button>
  );
};
