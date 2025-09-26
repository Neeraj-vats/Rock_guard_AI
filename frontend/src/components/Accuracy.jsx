import * as React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ReferenceLine,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer as RechartsResponsiveContainer,
} from "recharts";
import { TrendingUp, GitCommit, Target } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY FUNCTIONS (to resolve dependencies) ---

/**
 * Merges CSS classes, handling Tailwind CSS class conflicts.
 * @param {...(string|Object|Array)} inputs - The class values to merge.
 * @returns {string} The merged class string.
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// --- UI COMPONENT DEFINITIONS (to resolve dependencies) ---

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// --- CHART COMPONENT DEFINITIONS (to resolve dependencies) ---
const THEMES = { light: "", dark: ".dark" };

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsResponsiveContainer>{children}</RechartsResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsTooltip;
const ChartLegend = RechartsLegend;

const ChartLegendContent = React.forwardRef(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return (
          <div key={item.value} className={cn("flex items-center gap-1.5")}>
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) return undefined;
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : undefined;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}


// --- ORIGINAL COMPONENT LOGIC ---

// --- Mock Data ---
const accuracyData = [
  { month: "Jan 2024", accuracy: 87.2, precision: 89.1, recall: 85.3, f1Score: 87.1 },
  { month: "Feb 2024", accuracy: 89.5, precision: 91.2, recall: 87.8, f1Score: 89.4 },
  { month: "Mar 2024", accuracy: 91.8, precision: 93.4, recall: 90.2, f1Score: 91.7 },
  { month: "Apr 2024", accuracy: 93.2, precision: 94.8, recall: 91.6, f1Score: 93.1 },
  { month: "May 2024", accuracy: 94.1, precision: 95.3, recall: 92.9, f1Score: 94.0 },
  { month: "Jun 2024", accuracy: 95.7, precision: 96.8, recall: 94.6, f1Score: 95.6 },
  { month: "Jul 2024", accuracy: 96.3, precision: 97.1, recall: 95.5, f1Score: 96.2 },
  { month: "Aug 2024", accuracy: 97.1, precision: 97.9, recall: 96.3, f1Score: 97.0 },
  { month: "Sep 2024", accuracy: 97.8, precision: 98.4, recall: 97.2, f1Score: 97.7 },
];

const chartConfig = {
  accuracy: { label: "Accuracy", color: "hsl(var(--primary))" },
  precision: { label: "Precision", color: "hsl(var(--secondary))" },
  recall: { label: "Recall", color: "hsl(var(--accent))" },
  f1Score: { label: "F1-Score", color: "hsl(var(--muted-foreground))" },
};

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 rounded-lg border bg-background/95 shadow-lg backdrop-blur-sm">
        <p className="font-bold text-foreground mb-2">{label}</p>
        {payload.map((pld, index) => (
          <div key={index} className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: pld.color }}
              ></div>
              <p className="text-sm text-muted-foreground">{pld.name}</p>
            </div>
            <p className="text-sm font-medium text-foreground">{pld.value}%</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// --- Professional Accuracy Chart ---
const ProfessionalAccuracyChart = () => {
  return (
    <Card className="glass-card shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Model Performance Timeline</CardTitle>
            <CardDescription>
              Composite view of key performance indicators over the last 9 months.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-6 w-6" />
            <span className="font-semibold">Improving</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[450px] w-full">
          <ComposedChart data={accuracyData}>
            <defs>
              <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accuracy)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-accuracy)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
            <YAxis
              domain={[85, 100]}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <ReferenceLine y={98} label={{ value: "Goal: 98%", position: "insideTopRight", fill: "hsl(var(--foreground))", fontSize: 12 }} stroke="hsl(var(--primary))" strokeDasharray="4 4" />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="accuracy"
              stroke="var(--color-accuracy)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAccuracy)"
            />
            <Line
              type="monotone"
              dataKey="precision"
              stroke="var(--color-precision)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="recall"
              stroke="var(--color-recall)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="f1Score"
              stroke="var(--color-f1Score)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// --- NEW COMPONENT 1: Learning Curve Chart ---
const learningCurveData = [
  { epoch: 0, trainLoss: 0.032, validationLoss: 0.010 },
  { epoch: 1, trainLoss: 0.006, validationLoss: 0.003 },
  { epoch: 2, trainLoss: 0.003, validationLoss: 0.0035 },
  { epoch: 3, trainLoss: 0.002, validationLoss: 0.0028 },
  { epoch: 5, trainLoss: 0.0015, validationLoss: 0.0048 },
  { epoch: 7, trainLoss: 0.0014, validationLoss: 0.0042 },
  { epoch: 9, trainLoss: 0.0014, validationLoss: 0.0035 },
  { epoch: 11, trainLoss: 0.0013, validationLoss: 0.0029 },
  { epoch: 13, trainLoss: 0.0013, validationLoss: 0.0051 },
  { epoch: 15, trainLoss: 0.0013, validationLoss: 0.0036 },
  { epoch: 17, trainLoss: 0.0013, validationLoss: 0.0044 },
  { epoch: 19, trainLoss: 0.0012, validationLoss: 0.0042 },
  { epoch: 21, trainLoss: 0.0012, validationLoss: 0.0029 },
];
const learningCurveConfig = {
    trainLoss: { label: "Train Loss", color: "#3b82f6" },
    validationLoss: { label: "Validation Loss", color: "#f97316" },
};

const LearningCurveChart = () => {
    return (
        <Card className="glass-card shadow-xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Learning Curve</CardTitle>
                        <CardDescription>Training and validation loss per epoch.</CardDescription>
                    </div>
                     <GitCommit className="h-6 w-6 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={learningCurveConfig} className="h-[450px] w-full">
                    <LineChart data={learningCurveData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="epoch" name="Epochs" />
                        <YAxis domain={[0, 0.035]} name="Loss (MSE)" />
                        <ChartTooltip />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line type="monotone" dataKey="trainLoss" stroke="var(--color-trainLoss)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="validationLoss" stroke="var(--color-validationLoss)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

// --- NEW COMPONENT 2: Actual vs Predicted Chart ---
const actualVsPredictedData = Array.from({ length: 200 }, (_, i) => {
    const actual = i / 199;
    const predicted = actual + (Math.random() - 0.4) * 0.15; // Simulate points around the ideal line
    return { actual, predicted: Math.max(0, Math.min(1, predicted)) }; // Clamp between 0 and 1
});

const actualVsPredictedConfig = {
    prediction: { label: 'Predicted vs. Actual', color: '#0ea5e9' }
};

const ActualVsPredictedChart = () => {
    return (
        <Card className="glass-card shadow-xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Actual vs. Predicted</CardTitle>
                        <CardDescription>Model predictions against true values.</CardDescription>
                    </div>
                    <Target className="h-6 w-6 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={actualVsPredictedConfig} className="h-[450px] w-full">
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="actual" name="Actual" domain={[0, 1]} />
                        <YAxis type="number" dataKey="predicted" name="Predicted" domain={[0, 1.1]} />
                        <ChartTooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Predictions" data={actualVsPredictedData} fill="var(--color-prediction)" />
                        <ReferenceLine 
                            segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} 
                            stroke="#ef4444" 
                            strokeDasharray="5 5"
                            strokeWidth={2}
                         />
                    </ScatterChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
};


// --- Main App Component to render all charts ---
const AllCharts = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 bg-background">
            <ProfessionalAccuracyChart />
            <LearningCurveChart />
            <ActualVsPredictedChart />
        </div>
    )
}

export default AllCharts;

