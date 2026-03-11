import { Button } from "@/components/ui/button";
import shamsLogo from "@/assets/shams-logo.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-shams-gold/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-shams-sky/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 pt-20 pb-12 flex flex-col items-center text-center relative z-10">
        <div className="mb-8 animate-fade-up">
          <img
            src={shamsLogo}
            alt="SHAMS Solar Energy"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-glow animate-pulse-glow object-cover"
          />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-shams-cream mb-6 animate-fade-up leading-tight" style={{ animationDelay: "0.2s" }}>
          Power Your Future <br />
          <span className="text-gradient-solar">With Solar Energy</span>
        </h1>
        <p className="text-lg md:text-xl text-shams-sky/90 max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          SHAMS helps you understand the real benefits of solar energy. Calculate your savings, discover optimal panel setups, and take the first step toward a sustainable future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <Button variant="hero" size="lg" className="text-base px-8 py-6" asChild>
            <a href="#calculator">Calculate Your Savings</a>
          </Button>
          <Button variant="hero-outline" size="lg" className="text-base px-8 py-6" asChild>
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(45,33%,97%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
