import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, Leaf, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SavingsChartProps {
  installationCost: number;
  monthlySavings: number;
  paybackYears: number;
  co2Reduction: number;
}

const SavingsChart = ({ installationCost, monthlySavings, paybackYears, co2Reduction }: SavingsChartProps) => {
  const { t, lang } = useLanguage();
  const [years, setYears] = useState(25);

  const data = useMemo(() => {
    const annualSavings = monthlySavings * 12;
    const degradation = 0.005; // 0.5% panel degradation per year
    return Array.from({ length: years + 1 }, (_, year) => {
      const factor = Math.pow(1 - degradation, year);
      const yearSavings = year === 0 ? 0 : annualSavings * factor;
      const cumulativeSavings = year === 0
        ? 0
        : Array.from({ length: year }, (_, y) => annualSavings * Math.pow(1 - degradation, y + 1)).reduce((a, b) => a + b, 0);
      const netSavings = cumulativeSavings - installationCost;
      return {
        year,
        yearLabel: `${t("chart.year")} ${year}`,
        annualSavings: Math.round(yearSavings),
        cumulativeSavings: Math.round(cumulativeSavings),
        netSavings: Math.round(netSavings),
        installationCost,
      };
    });
  }, [installationCost, monthlySavings, years, t]);

  const totalSavings = data[data.length - 1]?.cumulativeSavings || 0;
  const totalNet = data[data.length - 1]?.netSavings || 0;
  const roi = ((totalNet / installationCost) * 100).toFixed(0);

  const formatSAR = (value: number) =>
    `${value >= 0 ? "" : "-"}${Math.abs(value).toLocaleString()} ${t("chart.sar")}`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-card border border-border/50 rounded-xl p-3 shadow-card text-sm">
        <p className="font-heading font-bold text-foreground mb-1">{`${t("chart.year")} ${label}`}</p>
        <p className="text-secondary">{t("chart.annual")}: {formatSAR(payload[0]?.value)}</p>
        <p className="text-primary">{t("chart.cumulative")}: {formatSAR(payload[1]?.value)}</p>
        <p className={payload[2]?.value >= 0 ? "text-accent" : "text-destructive"}>
          {t("chart.net")}: {formatSAR(payload[2]?.value)}
        </p>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-10 bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-border/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-xl md:text-2xl font-heading font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-secondary" />
              {t("chart.title")}
            </h4>
            <p className="text-muted-foreground text-sm mt-1">{t("chart.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
            {[10, 15, 20, 25].map((y) => (
              <button
                key={y}
                onClick={() => setYears(y)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  years === y
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {y} {t("chart.yrs")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 md:p-8">
        <div className="h-[320px] md:h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradAnnual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis
                dataKey="year"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={installationCost}
                stroke="hsl(var(--destructive))"
                strokeDasharray="6 4"
                strokeWidth={1.5}
                label={{
                  value: t("chart.breakeven"),
                  position: lang === "ar" ? "insideTopRight" : "insideTopLeft",
                  fill: "hsl(var(--destructive))",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
              <Area
                type="monotone"
                dataKey="annualSavings"
                stroke="hsl(var(--secondary))"
                fill="url(#gradAnnual)"
                strokeWidth={2}
                dot={false}
                name={t("chart.annual")}
              />
              <Area
                type="monotone"
                dataKey="cumulativeSavings"
                stroke="hsl(var(--primary))"
                fill="url(#gradCumulative)"
                strokeWidth={2.5}
                dot={false}
                name={t("chart.cumulative")}
              />
              <Area
                type="monotone"
                dataKey="netSavings"
                stroke="hsl(var(--accent))"
                fill="url(#gradNet)"
                strokeWidth={2}
                dot={false}
                name={t("chart.net")}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary" /> {t("chart.annual")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary" /> {t("chart.cumulative")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-accent" /> {t("chart.net")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-destructive" style={{ borderTop: "2px dashed" }} /> {t("chart.breakeven")}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border/30">
        {[
          { icon: TrendingUp, label: t("chart.totalSavings"), value: formatSAR(totalSavings), color: "text-primary" },
          { icon: Calendar, label: t("chart.paybackAt"), value: `~${paybackYears} ${t("chart.yrs")}`, color: "text-secondary" },
          { icon: TrendingUp, label: t("chart.roi"), value: `${roi}%`, color: "text-accent" },
          { icon: Leaf, label: t("chart.co2total"), value: `${(co2Reduction * years).toFixed(1)} ${t("chart.tons")}`, color: "text-secondary" },
        ].map((card, i) => (
          <div
            key={card.label}
            className={`p-4 md:p-5 text-center ${i < 3 ? "border-r border-border/30" : ""} ${i < 2 ? "border-b md:border-b-0 border-border/30" : i === 2 ? "border-b md:border-b-0 border-border/30 md:border-r" : ""}`}
          >
            <card.icon className={`w-5 h-5 mx-auto mb-1.5 ${card.color}`} />
            <p className="text-xs text-muted-foreground mb-0.5">{card.label}</p>
            <p className="text-lg font-heading font-bold text-foreground">{card.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SavingsChart;
