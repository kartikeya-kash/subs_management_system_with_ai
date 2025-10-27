import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SavingsTracker = ({
  savingsData,
  totalSaved,
  monthlyGoal,
  achievements,
  onShareAchievement,
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card rounded-lg p-3 border border-accent/30">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-accent">
            Savings: ${payload?.[0]?.value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const getAchievementIcon = (type) => {
    switch (type) {
      case "milestone":
        return "Trophy";
      case "streak":
        return "Flame";
      case "goal":
        return "Target";
      case "optimization":
        return "Zap";
      default:
        return "Award";
    }
  };

  const getAchievementColor = (type) => {
    switch (type) {
      case "milestone":
        return "from-warning to-accent";
      case "streak":
        return "from-error to-warning";
      case "goal":
        return "from-accent to-primary";
      case "optimization":
        return "from-primary to-secondary";
      default:
        return "from-secondary to-accent";
    }
  };

  return (
    <div className="space-y-6">
      {/* Savings Overview */}
      <div className="glass-card rounded-xl p-6 border border-accent/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center neon-glow-accent">
            <Icon name="PiggyBank" size={20} className="text-black" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Savings Tracker
            </h3>
            <p className="text-sm text-muted-foreground">
              Your financial optimization journey
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">
              ${totalSaved?.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Saved</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">
              ${monthlyGoal?.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Monthly Goal</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary">
              {achievements?.length}
            </p>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={savingsData}
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
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#00ff88"
                strokeWidth={3}
                dot={{ fill: "#00ff88", strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: "#00ff88",
                  strokeWidth: 2,
                  fill: "#000000",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Achievements */}
      <div className="glass-card rounded-xl p-6 border border-secondary/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Recent Achievements
              </h3>
              <p className="text-sm text-muted-foreground">
                Celebrate your savings milestones
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            onClick={onShareAchievement}
            className="border-accent/30 hover:border-accent hover:bg-accent/10"
          >
            Share Success
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className="glass rounded-lg p-4 border border-muted/20 hover:border-accent/30 transition-all duration-300 hover-glow-accent"
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${getAchievementColor(
                    achievement?.type
                  )} rounded-lg flex items-center justify-center`}
                >
                  <Icon
                    name={getAchievementIcon(achievement?.type)}
                    size={20}
                    className="text-black"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">
                      {achievement?.title}
                    </h4>
                    {achievement?.isNew && (
                      <span className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full animate-pulse">
                        New!
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement?.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {achievement?.date}
                    </span>
                    {achievement?.reward && (
                      <span className="text-accent font-bold">
                        +${achievement?.reward}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg border border-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Target" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">Next Milestone</p>
                <p className="text-sm text-muted-foreground">
                  Save $100 more to unlock "Smart Saver" badge
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="w-24 bg-muted/30 rounded-full h-2 mb-1">
                <div
                  className="bg-gradient-to-r from-accent to-primary h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">
                75% Complete
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker;
