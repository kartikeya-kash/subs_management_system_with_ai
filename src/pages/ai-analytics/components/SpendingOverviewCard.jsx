import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Icon from "../../../components/AppIcon";

const SpendingOverviewCard = ({
  data,
  totalSpending,
  monthlyChange,
  predictedNext,
}) => {
  const colors = ["#00d4ff", "#8b5cf6", "#00ff88", "#ff0080", "#fbbf24"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card rounded-lg p-3 border border-primary/30">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-primary">
            Amount: ${payload?.[0]?.value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-black" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Monthly Spending Overview
            </h3>
            <p className="text-sm text-muted-foreground">
              Last 6 months analysis
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div
            className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
              monthlyChange >= 0
                ? "bg-error/20 text-error"
                : "bg-success/20 text-success"
            }`}
          >
            <Icon
              name={monthlyChange >= 0 ? "TrendingUp" : "TrendingDown"}
              size={14}
            />
            <span className="text-sm font-medium">
              {Math.abs(monthlyChange)}%
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            ${totalSpending?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Current Month</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">
            ${predictedNext?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Predicted Next Month</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary">{data?.length}</p>
          <p className="text-sm text-muted-foreground">Months Analyzed</p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
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
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors?.[index % colors?.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingOverviewCard;
