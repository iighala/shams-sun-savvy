import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import shamsLogo from "@/assets/shams-logo.jpg";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.calculator"), to: "/calculator" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between h-18 px-4 py-2">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={shamsLogo}
            alt="SHAMS Logo"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary/40 group-hover:ring-secondary/70 transition-all shadow-glow"
          />
          <div>
            <span className="font-heading text-xl font-bold text-primary block leading-tight">SHAMS</span>
            <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Solar Energy</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-all duration-300 relative py-1 ${
                location.pathname === l.to
                  ? "text-secondary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-secondary after:rounded-full"
                  : "text-foreground/70 hover:text-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-sm font-medium text-foreground/80 hover:text-foreground transition-all"
          >
            <Globe className="w-4 h-4" />
            {lang === "en" ? "عربي" : "EN"}
          </button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">{t("nav.signin")}</Link>
          </Button>
          <Button variant="solar" size="sm" asChild>
            <Link to="/signup">{t("nav.getstarted")}</Link>
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
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-1.5 py-2 text-sm font-medium text-foreground/80"
          >
            <Globe className="w-4 h-4" />
            {lang === "en" ? "العربية" : "English"}
          </button>
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" className="flex-1" asChild>
              <Link to="/login" onClick={() => setOpen(false)}>{t("nav.signin")}</Link>
            </Button>
            <Button variant="solar" size="sm" className="flex-1" asChild>
              <Link to="/signup" onClick={() => setOpen(false)}>{t("nav.getstarted")}</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
