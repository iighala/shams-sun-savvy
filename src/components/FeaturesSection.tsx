import { Zap, Calculator, MapPin, BarChart3, Shield, Clock } from "lucide-react";

const features = [
  { icon: Calculator, title: "Smart Calculator", desc: "Enter your electricity bill and city to get instant solar recommendations." },
  { icon: MapPin, title: "City-Based Estimates", desc: "Solar potential is calculated based on your city's average sunlight hours." },
  { icon: BarChart3, title: "Detailed Results", desc: "Get panel count, installation cost, energy savings, and payback period." },
  { icon: Zap, title: "Instant Analysis", desc: "Results are generated in real-time with no waiting or complex forms." },
  { icon: Shield, title: "Reliable Data", desc: "Calculations based on industry-standard solar performance metrics." },
  { icon: Clock, title: "Payback Period", desc: "Know exactly when your solar investment will start paying for itself." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-gradient-sky">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-shams-green/20 text-shams-green-dark font-semibold text-sm mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Everything You Need to <span className="text-gradient-solar">Go Solar</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            SHAMS provides all the tools and insights you need to make an informed decision about solar energy.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border/50 hover:border-shams-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="w-12 h-12 rounded-lg bg-shams-navy/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-shams-navy" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
