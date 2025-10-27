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

const BenchmarkComparison = ({
  userSpending,
  industryBenchmarks,
  demographics,
}) => {
  const comparisonData = industryBenchmarks?.map((benchmark) => ({
    category: benchmark?.category,
    userSpending:
      userSpending?.find((u) => u?.category === benchmark?.category)?.amount ||
      0,
    industryAverage: benchmark?.average,
    percentile: benchmark?.percentile,
    difference:
      (userSpending?.find((u) => u?.category === benchmark?.category)?.amount ||
        0) - benchmark?.average,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="glass-card rounded-lg p-3 border border-secondary/30">
          <p className="text-foreground font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex justify-between space-x-4">
              <span className="text-primary">Your Spending:</span>
              <span className="text-primary font-medium">
                ${data?.userSpending}
              </span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">Industry Average:</span>
              <span className="text-muted-foreground">
                ${data?.industryAverage}
              </span>
            </div>
            <div className="flex justify-between space-x-4">
              <span
                className={data?.difference >= 0 ? "text-error" : "text-accent"}
              >
                Difference:
              </span>
              <span
                className={
                  data?.difference >= 0
                    ? "text-error font-medium"
                    : "text-accent font-medium"
                }
              >
                {data?.difference >= 0 ? "+" : ""}${data?.difference}
              </span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-secondary">Percentile:</span>
              <span className="text-secondary font-medium">
                {data?.percentile}th
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (difference) => {
    if (difference > 50) return "#ff0080"; // High overspending - pink
    if (difference > 0) return "#fbbf24"; // Moderate overspending - amber
    if (difference > -50) return "#00d4ff"; // Close to average - cyan
    return "#00ff88"; // Well below average - green
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-secondary/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Industry Benchmark Comparison
          </h3>
          <p className="text-sm text-muted-foreground">
            How you compare to similar users
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 glass rounded-lg border border-primary/20">
          <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-lg font-bold text-primary">
            {demographics?.ageGroup}
          </p>
          <p className="text-sm text-muted-foreground">Age Group</p>
        </div>
        <div className="text-center p-4 glass rounded-lg border border-secondary/20">
          <Icon
            name="MapPin"
            size={24}
            className="text-secondary mx-auto mb-2"
          />
          <p className="text-lg font-bold text-secondary">
            {demographics?.location}
          </p>
          <p className="text-sm text-muted-foreground">Location</p>
        </div>
        <div className="text-center p-4 glass rounded-lg border border-accent/20">
          <Icon
            name="DollarSign"
            size={24}
            className="text-accent mx-auto mb-2"
          />
          <p className="text-lg font-bold text-accent">
            {demographics?.incomeRange}
          </p>
          <p className="text-sm text-muted-foreground">Income Range</p>
        </div>
      </div>
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="category"
              stroke="#a1a1aa"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#a1a1aa"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="userSpending"
              name="Your Spending"
              radius={[4, 4, 0, 0]}
            >
              {comparisonData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry?.difference)}
                />
              ))}
            </Bar>
            <Bar
              dataKey="industryAverage"
              name="Industry Average"
              fill="rgba(161, 161, 170, 0.3)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 glass rounded-lg border border-accent/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-accent" />
            <span className="font-medium text-accent">
              Below Average Categories
            </span>
          </div>
          <div className="space-y-1">
            {comparisonData
              ?.filter((item) => item?.difference < 0)
              ?.map((item) => (
                <div
                  key={item?.category}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {item?.category}
                  </span>
                  <span className="text-accent font-medium">
                    ${Math.abs(item?.difference)} saved
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="p-4 glass rounded-lg border border-error/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-error" />
            <span className="font-medium text-error">
              Above Average Categories
            </span>
          </div>
          <div className="space-y-1">
            {comparisonData
              ?.filter((item) => item?.difference > 0)
              ?.map((item) => (
                <div
                  key={item?.category}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {item?.category}
                  </span>
                  <span className="text-error font-medium">
                    +${item?.difference} over
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkComparison;
