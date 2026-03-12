import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Zap, DollarSign, Clock, PanelTop, Camera, X, Image, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Calculator = () => {
  const [bill, setBill] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculate = () => {
    const monthlyBill = parseFloat(bill);
    if (!monthlyBill || !city) return;

    const cityData = saudiCities.find((c) => c.name === city);
    if (!cityData) return;

    const electricityRate = 0.18;
    const monthlyConsumption = monthlyBill / electricityRate;
    const dailyConsumption = monthlyConsumption / 30;
    const panelWattage = 550;
    const systemEfficiency = 0.8;
    const dailyPanelOutput = (panelWattage / 1000) * cityData.peakSunHours * systemEfficiency;
    const panelsNeeded = Math.ceil(dailyConsumption / dailyPanelOutput);
    const systemSizeKw = (panelsNeeded * panelWattage) / 1000;
    const costPerWatt = 3.5;
    const installationCost = systemSizeKw * 1000 * costPerWatt;
    const monthlySavings = monthlyBill * 0.9;
    const paybackYears = installationCost / (monthlySavings * 12);
    const co2Reduction = monthlyConsumption * 12 * 0.0007;

    setResults({
      monthlyConsumption: Math.round(monthlyConsumption),
      panelsNeeded,
      installationCost: Math.round(installationCost),
      monthlySavings: Math.round(monthlySavings),
      paybackYears: Math.round(paybackYears * 10) / 10,
      co2Reduction: Math.round(co2Reduction * 10) / 10,
    });
  };

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch {
      // Fallback to file input if camera not available
      fileInputRef.current?.click();
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    setPhoto(canvas.toDataURL("image/jpeg", 0.8));
    stopCamera();
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setShowCamera(false);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const resultCards = results
    ? [
        { icon: Zap, label: "Monthly Consumption", value: `${results.monthlyConsumption.toLocaleString()} kWh`, color: "text-secondary" },
        { icon: PanelTop, label: "Panels Needed", value: `${results.panelsNeeded} panels`, color: "text-primary" },
        { icon: DollarSign, label: "Installation Cost", value: `${results.installationCost.toLocaleString()} SAR`, color: "text-accent" },
        { icon: Sun, label: "Monthly Savings", value: `${results.monthlySavings.toLocaleString()} SAR`, color: "text-secondary" },
        { icon: Clock, label: "Payback Period", value: `${results.paybackYears} years`, color: "text-primary" },
        { icon: Sun, label: "CO₂ Reduction", value: `${results.co2Reduction} tons/year`, color: "text-accent" },
      ]
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 bg-gradient-hero overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4"
          >
            Solar <span className="text-gradient-solar">Calculator</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-foreground/70 text-lg max-w-xl mx-auto"
          >
            Enter your details below to get a personalized solar energy estimate for your home.
          </motion.p>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto bg-card rounded-3xl p-8 md:p-10 shadow-card border border-border/50 mb-12"
          >
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
                  className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Select Your City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                >
                  <option value="">Choose a city...</option>
                  {saudiCities.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Camera / Photo Section */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Location Photo (Optional)
                </label>
                <p className="text-muted-foreground text-xs mb-3">
                  Take a photo of your roof or installation area for reference.
                </p>

                {photo ? (
                  <div className="relative rounded-xl overflow-hidden border border-border/50">
                    <img src={photo} alt="Location" className="w-full h-48 object-cover" />
                    <button
                      onClick={() => setPhoto(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 rounded-xl"
                      onClick={startCamera}
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Take Photo
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 rounded-xl"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Image className="w-5 h-5 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Camera Preview */}
              <AnimatePresence>
                {showCamera && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl overflow-hidden border border-border/50"
                  >
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-48 object-cover bg-muted"
                    />
                    <div className="flex gap-2 p-3 bg-card">
                      <Button variant="solar" className="flex-1 rounded-xl" onClick={capturePhoto}>
                        <Camera className="w-4 h-4 mr-2" />
                        Capture
                      </Button>
                      <Button variant="outline" className="rounded-xl" onClick={stopCamera}>
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                variant="solar"
                size="lg"
                className="w-full text-base rounded-xl"
                onClick={calculate}
              >
                <Sun className="w-5 h-5 mr-2" />
                Calculate Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto"
              >
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8">
                  Your Solar <span className="text-gradient-solar">Estimate</span>
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {resultCards.map((r, i) => (
                    <motion.div
                      key={r.label}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={i}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="bg-card rounded-2xl p-6 border border-border/50 shadow-card text-center cursor-default"
                    >
                      <r.icon className={`w-8 h-8 mx-auto mb-3 ${r.color}`} />
                      <p className="text-sm text-muted-foreground mb-1">{r.label}</p>
                      <p className="text-2xl font-heading font-bold text-foreground">{r.value}</p>
                    </motion.div>
                  ))}
                </div>

                {photo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 bg-card rounded-2xl p-6 border border-border/50 shadow-card"
                  >
                    <h4 className="font-heading font-bold text-foreground mb-3">📍 Your Location Photo</h4>
                    <img src={photo} alt="Installation location" className="w-full max-h-64 object-cover rounded-xl" />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calculator;
