import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import SolarCalculator from "@/components/SolarCalculator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <SolarCalculator />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
