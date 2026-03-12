import { Link } from "react-router-dom";
import shamsLogo from "@/assets/shams-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={shamsLogo} alt="SHAMS" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-heading font-bold text-primary-foreground text-lg">SHAMS</p>
              <p className="text-primary-foreground/60 text-sm">Solar Energy Calculation</p>
            </div>
          </Link>
          <nav className="flex gap-6">
            {[
              { label: "Home", to: "/" },
              { label: "About", to: "/about" },
              { label: "Calculator", to: "/calculator" },
              { label: "Login", to: "/login" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="text-primary-foreground/50 text-sm">
            © 2026 SHAMS. Graduation Project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
