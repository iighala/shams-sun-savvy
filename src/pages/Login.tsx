import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import shamsLogo from "@/assets/shams-logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.username.trim()) newErrors.username = t("login.usernameReq");
    if (!form.password) newErrors.password = t("login.passwordReq");
    else if (form.password.length < 6) newErrors.password = t("login.passwordMin");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    toast.success(t("login.success"));
    navigate("/calculator");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 right-20 w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-3xl p-8 md:p-10 shadow-card border border-border/50 backdrop-blur-sm">
          <Link to="/" className="flex flex-col items-center mb-8">
            <img src={shamsLogo} alt="SHAMS" className="w-16 h-16 rounded-full object-cover ring-2 ring-secondary/30 mb-3" />
            <h1 className="font-heading text-2xl font-bold text-foreground">{t("login.welcome")}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t("login.subtitle")}</p>
          </Link>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t("login.username")}</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder={t("login.usernamePh")} className={`w-full h-12 pl-11 pr-4 rounded-xl border ${errors.username ? "border-destructive" : "border-input"} bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`} />
              </div>
              {errors.username && <p className="text-destructive text-xs mt-1.5">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t("login.password")}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={t("login.passwordPh")} className={`w-full h-12 pl-11 pr-12 rounded-xl border ${errors.password ? "border-destructive" : "border-input"} bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs mt-1.5">{errors.password}</p>}
            </div>

            <Button variant="solar" size="lg" className="w-full text-base rounded-xl" type="submit">
              <LogIn className="w-5 h-5 mr-2" />
              {t("login.submit")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {t("login.noAccount")}{" "}
              <Link to="/signup" className="text-secondary font-semibold hover:underline">{t("login.createAccount")}</Link>
            </p>
          </div>
        </div>
        <p className="text-center text-primary-foreground/40 text-xs mt-6">{t("footer.gradProject")}</p>
      </motion.div>
    </div>
  );
};

export default Login;
