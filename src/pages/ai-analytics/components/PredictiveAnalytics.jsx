import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import Icon from "../../../components/AppIcon";

const PredictiveAnalytics = ({ historicalData, predictions, accuracy }) => {
  const combinedData = [...historicalData, ...predictions];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const isHistorical = payload?.[0]?.payload?.type === "historical";
      return (
        <div className="glass-card rounded-lg p-3 border border-secondary/30">
          <p className="text-foreground font-medium">{label}</p>
          {payload?.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-4"
            >
              <span className="text-muted-foreground text-sm">
                {entry?.name}:
              </span>
              <span
                className={isHistorical ? "text-primary" : "text-secondary"}
              >
                ${entry?.value?.toLocaleString()}
              </span>
            </div>
          ))}
          {!isHistorical && (
            <p className="text-xs text-muted-foreground mt-1">
              Predicted value
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-secondary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Predictive Analytics
            </h3>
            <p className="text-sm text-muted-foreground">
              AI-powered spending forecasts
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-secondary/20 text-secondary">
            <Icon name="Target" size={14} />
            <span className="text-sm font-medium">{accuracy}% Accuracy</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 glass rounded-lg border border-primary/20">
          <Icon
            name="Calendar"
            size={24}
            className="text-primary mx-auto mb-2"
          />
          <p className="text-lg font-bold text-primary">6 Months</p>
          <p className="text-sm text-muted-foreground">Prediction Range</p>
        </div>
        <div className="text-center p-4 glass rounded-lg border border-secondary/20">
          <Icon
            name="Brain"
            size={24}
            className="text-secondary mx-auto mb-2"
          />
          <p className="text-lg font-bold text-secondary">ML Model</p>
          <p className="text-sm text-muted-foreground">Advanced Algorithm</p>
        </div>
        <div className="text-center p-4 glass rounded-lg border border-accent/20">
          <Icon name="Zap" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-lg font-bold text-accent">Real-time</p>
          <p className="text-sm text-muted-foreground">Live Updates</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={combinedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id="historicalGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="predictedGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} />
            <YAxis
              stroke="#a1a1aa"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="historical"
              stroke="#00d4ff"
              strokeWidth={2}
              fill="url(#historicalGradient)"
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#predictedGradient)"
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Historical Data</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
          <span className="text-sm text-muted-foreground">AI Predictions</span>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
