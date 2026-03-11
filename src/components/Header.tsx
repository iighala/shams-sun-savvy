import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import shamsLogo from "@/assets/shams-logo.jpg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Calculator", href: "#calculator" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" className="flex items-center gap-2">
          <img src={shamsLogo} alt="SHAMS Logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-heading text-xl font-bold text-primary">SHAMS</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-secondary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <Button variant="solar" size="sm" className="hidden md:inline-flex" asChild>
          <a href="#calculator">Try Calculator</a>
        </Button>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden bg-card border-b border-border px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-foreground/80 hover:text-secondary py-2">
              {l.label}
            </a>
          ))}
          <Button variant="solar" size="sm" asChild>
            <a href="#calculator" onClick={() => setOpen(false)}>Try Calculator</a>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
