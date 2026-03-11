import { Sun, Leaf, TrendingDown } from "lucide-react";

const highlights = [
  { icon: Sun, title: "Solar Awareness", desc: "Educating users about solar energy potential and benefits in their region." },
  { icon: TrendingDown, title: "Cost Reduction", desc: "Helping users estimate how much they can save by switching to solar power." },
  { icon: Leaf, title: "Sustainability", desc: "Promoting clean energy adoption to reduce carbon footprint and protect the environment." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-semibold text-sm mb-4">
            About SHAMS
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Making Solar Energy <span className="text-gradient-solar">Accessible</span> for Everyone
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            SHAMS is a graduation project designed to simplify solar energy calculations and help users understand the financial and environmental benefits of switching to solar power. Our smart calculator takes the complexity out of solar planning.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className="group bg-card rounded-xl p-8 shadow-card hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-secondary/30"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-solar flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <h.icon className="w-7 h-7 text-shams-navy" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">{h.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
