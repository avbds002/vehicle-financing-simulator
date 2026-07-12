import { Logo } from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";

export const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:h-20 justify-between px-4 sm:px-8 py-3 shadow-xl">
      <Logo />
      <Navigation />
    </div>
  );
};
