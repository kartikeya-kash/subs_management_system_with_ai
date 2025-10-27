import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Icon from "../../../components/AppIcon";

const CategoryBreakdownChart = ({ data, totalAmount }) => {
  const colors = [
    "#00d4ff",
    "#8b5cf6",
    "#00ff88",
    "#ff0080",
    "#fbbf24",
    "#06b6d4",
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="glass-card rounded-lg p-3 border border-primary/30">
          <p className="text-foreground font-medium">{data?.category}</p>
          <p className="text-primary">${data?.amount?.toLocaleString()}</p>
          <p className="text-muted-foreground text-sm">
            {data?.percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-sm text-muted-foreground truncate">
              {entry?.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-secondary/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
          <Icon name="PieChart" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Category Breakdown
          </h3>
          <p className="text-sm text-muted-foreground">
            Spending distribution by category
          </p>
        </div>
      </div>
      <div className="text-center mb-4">
        <p className="text-3xl font-bold text-secondary">
          ${totalAmount?.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">Total Monthly Spending</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="amount"
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors?.[index % colors?.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBreakdownChart;
