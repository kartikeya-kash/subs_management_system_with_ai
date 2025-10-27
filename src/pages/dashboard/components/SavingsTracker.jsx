import React from "react";
import Icon from "../../../components/AppIcon";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const SavingsTracker = ({ savingsData, monthlyTarget, achievements }) => {
  const totalSavings = savingsData?.reduce(
    (sum, item) => sum + item?.amount,
    0
  );
  const targetProgress = (totalSavings / monthlyTarget) * 100;

  const COLORS = ["#00d4ff", "#8b5cf6", "#00ff88", "#fbbf24", "#ff0080"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="glass-card rounded-lg p-3 border border-primary/30">
          <p className="text-sm font-medium text-foreground">
            {data?.category}
          </p>
          <p className="text-sm text-primary">${data?.amount}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-6 hover-glow-primary transition-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Savings Tracker
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">
            ${monthlyTarget}/mo
          </span>
        </div>
      </div>
      {/* Progress Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Monthly Progress
          </span>
          <span className="text-lg font-bold text-foreground">
            ${totalSavings}
          </span>
        </div>

        <div className="w-full bg-muted/30 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-success to-accent h-3 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${Math.min(targetProgress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">0</span>
          <span
            className={`font-medium ${
              targetProgress >= 100 ? "text-success" : "text-foreground"
            }`}
          >
            {targetProgress?.toFixed(1)}% of target
          </span>
          <span className="text-muted-foreground">${monthlyTarget}</span>
        </div>
      </div>
      {/* Savings Breakdown Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Savings by Category
        </h4>
        <div className="flex items-center space-x-4">
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={savingsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {savingsData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS?.[index % COLORS?.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-2">
            {savingsData?.map((item, index) => (
              <div
                key={item?.category}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: COLORS?.[index % COLORS?.length],
                    }}
                  ></div>
                  <span className="text-sm text-muted-foreground">
                    {item?.category}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  ${item?.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Recent Achievements
        </h4>
        <div className="space-y-2">
          {achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className="flex items-center space-x-3 p-2 rounded-lg bg-success/10 border border-success/20"
            >
              <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                <Icon name="Trophy" size={12} className="text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {achievement?.title}
                </p>
                <p className="text-xs text-success">
                  +${achievement?.amount} saved
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {achievement?.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker;
