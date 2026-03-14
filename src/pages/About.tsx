import { motion } from "framer-motion";
import { Sun, Target, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import shamsLogo from "@/assets/shams-logo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const About = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Target, title: t("about.mission"), desc: t("about.missionDesc") },
    { icon: Users, title: t("about.who"), desc: t("about.whoDesc") },
    { icon: Globe, title: t("about.vision"), desc: t("about.visionDesc") },
  ];

  const stats = [
    { value: "10+", label: t("stats.cities") },
    { value: "7.5h", label: t("stats.sunhours") },
    { value: "90%", label: t("stats.savings") },
    { value: "550W", label: "Panel Capacity" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-10 right-20 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-semibold text-sm mb-4">{t("about.badge")}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
            {t("about.title")} <span className="text-gradient-solar">SHAMS</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">{t("about.desc")}</motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="relative">
                <div className="w-full aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <img src={shamsLogo} alt="SHAMS" className="w-40 h-40 rounded-full object-cover ring-4 ring-secondary/40" />
                </div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-secondary/20 backdrop-blur-sm flex items-center justify-center">
                  <Sun className="w-10 h-10 text-secondary" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                {t("about.what")} <span className="text-gradient-solar">SHAMS?</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg leading-relaxed mb-6">{t("about.whatDesc")}</motion.p>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed mb-8">{t("about.whatDesc2")}</motion.p>
              <motion.div variants={fadeUp} custom={3}>
                <Button variant="solar" size="lg" asChild>
                  <Link to="/calculator"><Sun className="w-5 h-5 mr-2" />{t("about.tryCta")}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {t("about.purpose")} <span className="text-gradient-solar">{t("about.purpose2")}</span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {highlights.map((h, i) => (
              <motion.div key={h.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} whileHover={{ y: -6 }} className="bg-background rounded-2xl p-8 border border-border/50 shadow-card text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary/15 flex items-center justify-center mx-auto mb-5">
                  <h.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">{h.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-2">{s.value}</p>
                <p className="text-primary-foreground/60 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
