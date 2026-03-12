import { motion } from "framer-motion";
import { Sun, Target, Users, Globe, Lightbulb, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import shamsLogo from "@/assets/shams-logo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const highlights = [
  { icon: Target, title: "Our Mission", desc: "Make solar energy accessible and understandable for every household in Saudi Arabia through smart technology." },
  { icon: Users, title: "Who It's For", desc: "Homeowners, businesses, and anyone curious about reducing their electricity costs with solar power." },
  { icon: Globe, title: "Vision 2030", desc: "Aligned with Saudi Vision 2030's goal of increasing renewable energy adoption across the Kingdom." },
];

const stats = [
  { value: "10+", label: "Saudi Cities Supported" },
  { value: "7.5h", label: "Peak Sun Hours (Tabuk)" },
  { value: "90%", label: "Potential Bill Savings" },
  { value: "550W", label: "Panel Capacity Used" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-10 right-20 w-72 h-72 rounded-full bg-secondary/20 blur-3xl"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-semibold text-sm mb-4"
          >
            About the Project
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-6"
          >
            About <span className="text-gradient-solar">SHAMS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-primary-foreground/70 max-w-2xl mx-auto"
          >
            A graduation project dedicated to promoting solar energy awareness and helping Saudi residents make informed decisions about solar power.
          </motion.p>
        </div>
      </section>

      {/* What is SHAMS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="w-full aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <img src={shamsLogo} alt="SHAMS" className="w-40 h-40 rounded-full object-cover ring-4 ring-secondary/40" />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-secondary/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <Sun className="w-10 h-10 text-secondary" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                What is <span className="text-gradient-solar">SHAMS?</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg leading-relaxed mb-6">
                SHAMS (Smart Home Alternative-energy Management System) is a platform that simplifies solar energy planning for residents of Saudi Arabia. Our smart calculator estimates your energy needs and provides personalized recommendations.
              </motion.p>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed mb-8">
                By entering your monthly electricity bill and selecting your city, users receive detailed estimates including the number of solar panels needed, installation costs, expected monthly savings, payback period, and environmental impact.
              </motion.p>
              <motion.div variants={fadeUp} custom={3}>
                <Button variant="solar" size="lg" asChild>
                  <Link to="/calculator">
                    <Sun className="w-5 h-5 mr-2" />
                    Try the Calculator
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our <span className="text-gradient-solar">Purpose</span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="bg-background rounded-2xl p-8 border border-border/50 shadow-card text-center"
              >
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

      {/* Stats */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
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
