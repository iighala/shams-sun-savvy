import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Zap, DollarSign, Clock, PanelTop } from "lucide-react";

const saudiCities = [
  { name: "Riyadh", peakSunHours: 7.2 },
  { name: "Jeddah", peakSunHours: 6.8 },
  { name: "Dammam", peakSunHours: 6.5 },
  { name: "Tabuk", peakSunHours: 7.5 },
  { name: "Abha", peakSunHours: 6.0 },
  { name: "Medina", peakSunHours: 7.0 },
  { name: "Mecca", peakSunHours: 6.9 },
  { name: "Hail", peakSunHours: 7.1 },
  { name: "Najran", peakSunHours: 7.3 },
  { name: "Jizan", peakSunHours: 6.2 },
];

interface Results {
  monthlyConsumption: number;
  panelsNeeded: number;
  installationCost: number;
  monthlySavings: number;
  paybackYears: number;
  co2Reduction: number;
}

const SolarCalculator = () => {
  const [bill, setBill] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState<Results | null>(null);

  const calculate = () => {
    const monthlyBill = parseFloat(bill);
    if (!monthlyBill || !city) return;

    const cityData = saudiCities.find((c) => c.name === city);
    if (!cityData) return;

    const electricityRate = 0.18; // SAR per kWh (Saudi tariff)
    const monthlyConsumption = monthlyBill / electricityRate;
    const dailyConsumption = monthlyConsumption / 30;

    const panelWattage = 550; // watts per panel
    const systemEfficiency = 0.8;
    const dailyPanelOutput = (panelWattage / 1000) * cityData.peakSunHours * systemEfficiency;

    const panelsNeeded = Math.ceil(dailyConsumption / dailyPanelOutput);
    const systemSizeKw = (panelsNeeded * panelWattage) / 1000;
    const costPerWatt = 3.5; // SAR per watt
    const installationCost = systemSizeKw * 1000 * costPerWatt;

    const monthlySavings = monthlyBill * 0.9;
    const paybackYears = installationCost / (monthlySavings * 12);
    const co2Reduction = monthlyConsumption * 12 * 0.0007; // tons per year

    setResults({
      monthlyConsumption: Math.round(monthlyConsumption),
      panelsNeeded,
      installationCost: Math.round(installationCost),
      monthlySavings: Math.round(monthlySavings),
      paybackYears: Math.round(paybackYears * 10) / 10,
      co2Reduction: Math.round(co2Reduction * 10) / 10,
    });
  };

  const resultCards = results
    ? [
        { icon: Zap, label: "Monthly Consumption", value: `${results.monthlyConsumption.toLocaleString()} kWh`, color: "text-shams-gold" },
        { icon: PanelTop, label: "Panels Needed", value: `${results.panelsNeeded} panels`, color: "text-shams-navy" },
        { icon: DollarSign, label: "Installation Cost", value: `${results.installationCost.toLocaleString()} SAR`, color: "text-shams-orange" },
        { icon: Sun, label: "Monthly Savings", value: `${results.monthlySavings.toLocaleString()} SAR`, color: "text-shams-green" },
        { icon: Clock, label: "Payback Period", value: `${results.paybackYears} years`, color: "text-shams-navy" },
        { icon: Sun, label: "CO₂ Reduction", value: `${results.co2Reduction} tons/year`, color: "text-shams-green-dark" },
      ]
    : [];

  return (
    <section id="calculator" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-semibold text-sm mb-4">
            Solar Calculator
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Calculate Your <span className="text-gradient-solar">Solar Savings</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Enter your monthly electricity bill and select your city to get a personalized solar energy estimate.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-card rounded-2xl p-8 shadow-card border border-border/50 mb-12">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Monthly Electricity Bill (SAR)
              </label>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="e.g. 500"
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Select Your City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              >
                <option value="">Choose a city...</option>
                {saudiCities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="solar" size="lg" className="w-full text-base" onClick={calculate}>
              <Sun className="w-5 h-5 mr-2" />
              Calculate Now
            </Button>
          </div>
        </div>

        {results && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-8">
              Your Solar Estimate
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {resultCards.map((r, i) => (
                <div
                  key={r.label}
                  className="bg-card rounded-xl p-6 border border-border/50 shadow-card animate-fade-up text-center"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <r.icon className={`w-8 h-8 mx-auto mb-3 ${r.color}`} />
                  <p className="text-sm text-muted-foreground mb-1">{r.label}</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{r.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SolarCalculator;
