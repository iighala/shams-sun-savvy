import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import shamsLogo from "@/assets/shams-logo.jpg";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Calculator", to: "/calculator" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={shamsLogo} alt="SHAMS Logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-heading text-xl font-bold text-primary">SHAMS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-secondary"
                  : "text-foreground/80 hover:text-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button variant="solar" size="sm" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-card border-b border-border px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium py-2 ${
                location.pathname === l.to ? "text-secondary" : "text-foreground/80 hover:text-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" className="flex-1" asChild>
              <Link to="/login" onClick={() => setOpen(false)}>Sign In</Link>
            </Button>
            <Button variant="solar" size="sm" className="flex-1" asChild>
              <Link to="/signup" onClick={() => setOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
