import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, ArrowRight, Zap, Shield, BarChart3, Leaf, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import shamsLogo from "@/assets/shams-logo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, title: t("feature.instant.title"), desc: t("feature.instant.desc") },
    { icon: Shield, title: t("feature.accurate.title"), desc: t("feature.accurate.desc") },
    { icon: BarChart3, title: t("feature.cost.title"), desc: t("feature.cost.desc") },
    { icon: Leaf, title: t("feature.eco.title"), desc: t("feature.eco.desc") },
  ];

  const stats = [
    { value: "10+", label: t("stats.cities") },
    { value: "7.5h", label: t("stats.sunhours") },
    { value: "90%", label: t("stats.savings") },
    { value: "1K+", label: t("stats.users") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.25, 0.12], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-accent/15 blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 12, repeat: Infinity, delay: 3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[80px]"
          />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center pt-20 pb-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/15 border border-secondary/20 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-semibold text-sm">{t("hero.badge")}</span>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <img
              src={shamsLogo}
              alt="SHAMS Logo"
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover mx-auto mb-8 shadow-glow ring-4 ring-secondary/30"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-primary-foreground mb-6 leading-[1.1] tracking-tight"
          >
            {t("hero.title1")}
            <br />
            <span className="text-gradient-solar">{t("hero.title2")}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t("hero.desc")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="lg" className="text-base px-10 py-7 text-lg" asChild>
              <Link to="/calculator">
                <Sun className="w-5 h-5 mr-2" />
                {t("hero.cta")}
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-10 py-7 text-lg" asChild>
              <Link to="/about">
                {t("hero.learn")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-6 h-6 text-primary-foreground/30" />
        </motion.div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 40C672 52 768 68 864 72C960 76 1056 68 1152 56C1248 44 1344 28 1392 20L1440 12V120H0V60Z" fill="hsl(45, 33%, 97%)" />
          </svg>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-heading font-bold text-gradient-solar inline-block mb-1">{s.value}</p>
                <p className="text-muted-foreground text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 text-secondary font-semibold text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t("features.badge")}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              {t("features.title")} <span className="text-gradient-solar">{t("features.title2")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg leading-relaxed">
              {t("features.desc")}
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-card rounded-2xl p-8 border border-border/40 shadow-card text-center group cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-300">
                    <f.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-14"
          >
            <Button variant="solar" size="lg" className="px-8" asChild>
              <Link to="/calculator">
                {t("features.cta")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 right-20 w-72 h-72 rounded-full bg-secondary/20 blur-3xl"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-primary-foreground/60 text-lg max-w-xl mx-auto mb-10">
              {t("cta.desc")}
            </p>
            <Button variant="hero" size="lg" className="text-base px-10 py-7 text-lg" asChild>
              <Link to="/calculator">
                <Sun className="w-5 h-5 mr-2" />
                {t("cta.button")}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
