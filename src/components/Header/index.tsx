import { useState, useEffect, useCallback } from "react";
import { Logo } from "./Logo/Logo";
import { Navigation } from "./Navigation/Navigation";
import { HiMenu, HiX } from "react-icons/hi";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 10) {
      // At the top — always show
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down — hide
      setIsVisible(false);
      setIsMenuOpen(false); // close mobile menu on scroll down
    } else {
      // Scrolling up — show
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-xl transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 header-desktop:px-8 h-16 header-desktop:h-20">
        <Logo />

        {/* Desktop nav — visible above 820px */}
        <div className="hidden header-desktop:block">
          <Navigation />
        </div>

        {/* Hamburger button — visible at ≤820px */}
        <button
          onClick={toggleMenu}
          className="header-desktop:hidden text-blue-800 p-2"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile nav dropdown — pushes content down, no overlap */}
      <div
        className={`header-desktop:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Navigation variant="mobile" />
      </div>
    </header>
  );
};
