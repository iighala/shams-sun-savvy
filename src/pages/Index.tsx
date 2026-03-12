import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, ArrowRight, Zap, Shield, BarChart3, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import shamsLogo from "@/assets/shams-logo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const features = [
  { icon: Zap, title: "Instant Estimates", desc: "Get solar panel recommendations in seconds based on your electricity usage." },
  { icon: Shield, title: "Accurate Data", desc: "Calculations based on real Saudi peak sun hours and current energy tariffs." },
  { icon: BarChart3, title: "Cost Analysis", desc: "See installation costs, monthly savings, and payback period at a glance." },
  { icon: Leaf, title: "Eco Impact", desc: "Track your potential CO₂ reduction and environmental contribution." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-accent/15 blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center pt-20">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <img src={shamsLogo} alt="SHAMS Logo" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto mb-8 shadow-glow ring-4 ring-secondary/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 leading-tight"
          >
            Power Your Future
            <br />
            <span className="text-gradient-solar">With Solar Energy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10"
          >
            SHAMS helps you understand the financial and environmental benefits of solar energy with our smart calculator tailored for Saudi Arabia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
              <Link to="/calculator">
                <Sun className="w-5 h-5 mr-2" />
                Calculate Your Savings
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6" asChild>
              <Link to="/about">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 40C672 52 768 68 864 72C960 76 1056 68 1152 56C1248 44 1344 28 1392 20L1440 12V120H0V60Z" fill="hsl(45, 33%, 97%)" />
          </svg>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-semibold text-sm mb-4">
              Why SHAMS?
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Smart Solar <span className="text-gradient-solar">Solutions</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg">
              Everything you need to make an informed decision about solar energy.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-card text-center group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/25 transition-colors">
                  <f.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="solar" size="lg" asChild>
              <Link to="/calculator">
                Try the Calculator
                <ArrowRight className="w-5 h-5 ml-2" />
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
