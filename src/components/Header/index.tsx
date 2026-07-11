import { Logo } from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";

export const Header = () => {
  return (
    <div className="flex items-center h-20 justify-around border-b">
      <Logo />
      <Navigation />
    </div>
  );
};
