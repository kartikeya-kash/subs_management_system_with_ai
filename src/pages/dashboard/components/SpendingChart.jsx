import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const SpendingChart = ({ data, type = "line", title, height = 300 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card rounded-lg p-3 border border-primary/30">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-primary">
              {entry?.name}: ${entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (type === "area") {
      return (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgb(0, 212, 255)"
                stopOpacity={0.3}
              />
              <stop offset="95%" stopColor="rgb(0, 212, 255)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgb(161, 161, 170)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgb(161, 161, 170)", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="rgb(0, 212, 255)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSpending)"
          />
        </AreaChart>
      );
    }

    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "rgb(161, 161, 170)", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "rgb(161, 161, 170)", fontSize: 12 }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="rgb(0, 212, 255)"
          strokeWidth={3}
          dot={{ fill: "rgb(0, 212, 255)", strokeWidth: 2, r: 4 }}
          activeDot={{
            r: 6,
            stroke: "rgb(0, 212, 255)",
            strokeWidth: 2,
            fill: "rgb(0, 255, 136)",
          }}
        />
      </LineChart>
    );
  };

  return (
    <div className="glass-card rounded-xl p-6 hover-glow-primary transition-glow">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">
              Monthly Spending
            </span>
          </div>
        </div>
      )}

      <div
        className="w-full"
        style={{ height: `${height}px` }}
        aria-label={`${title || "Spending"} Chart`}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
