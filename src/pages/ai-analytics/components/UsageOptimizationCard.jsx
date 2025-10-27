import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const UsageOptimizationCard = ({
  optimizations,
  onViewDetails,
  onOptimizeNow,
}) => {
  const getOptimizationIcon = (type) => {
    switch (type) {
      case "underused":
        return "AlertCircle";
      case "duplicate":
        return "Copy";
      case "expensive":
        return "DollarSign";
      case "bundle":
        return "Package";
      default:
        return "Zap";
    }
  };

  const getOptimizationColor = (type) => {
    switch (type) {
      case "underused":
        return "text-warning";
      case "duplicate":
        return "text-error";
      case "expensive":
        return "text-primary";
      case "bundle":
        return "text-accent";
      default:
        return "text-secondary";
    }
  };

  const getSavingsColor = (savings) => {
    if (savings >= 100) return "text-accent";
    if (savings >= 50) return "text-primary";
    return "text-secondary";
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-primary/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-black" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Usage Optimization
          </h3>
          <p className="text-sm text-muted-foreground">
            Smart recommendations to reduce costs
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {optimizations?.map((optimization) => (
          <div
            key={optimization?.id}
            className="glass rounded-lg p-4 border border-muted/20 hover:border-primary/30 transition-all duration-300 hover-glow-primary"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    optimization?.type === "underused"
                      ? "bg-warning/20"
                      : optimization?.type === "duplicate"
                      ? "bg-error/20"
                      : optimization?.type === "expensive"
                      ? "bg-primary/20"
                      : optimization?.type === "bundle"
                      ? "bg-accent/20"
                      : "bg-secondary/20"
                  }`}
                >
                  <Icon
                    name={getOptimizationIcon(optimization?.type)}
                    size={16}
                    className={getOptimizationColor(optimization?.type)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground truncate">
                      {optimization?.service}
                    </h4>
                    <span
                      className={`font-bold ${getSavingsColor(
                        optimization?.potentialSavings
                      )}`}
                    >
                      ${optimization?.potentialSavings}/mo
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {optimization?.recommendation}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Usage: {optimization?.usagePercentage}%</span>
                      <span>Cost: ${optimization?.currentCost}/mo</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewDetails(optimization?.id)}
                      >
                        Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Zap"
                        iconPosition="left"
                        onClick={() => onOptimizeNow(optimization?.id)}
                        className="border-accent/30 hover:border-accent hover:bg-accent/10"
                      >
                        Optimize
                      </Button>
                    </div>
                  </div>

                  {optimization?.urgency && (
                    <div className="mt-2 flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          optimization?.urgency === "high"
                            ? "bg-error animate-pulse"
                            : optimization?.urgency === "medium"
                            ? "bg-warning"
                            : "bg-accent"
                        }`}
                      ></div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {optimization?.urgency} Priority
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Target" size={20} className="text-accent" />
            <div>
              <p className="font-medium text-foreground">
                Total Potential Savings
              </p>
              <p className="text-sm text-muted-foreground">
                Based on current usage patterns
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-accent">
              $
              {optimizations?.reduce(
                (sum, opt) => sum + opt?.potentialSavings,
                0
              )}
              /mo
            </p>
            <p className="text-sm text-muted-foreground">
              $
              {optimizations?.reduce(
                (sum, opt) => sum + opt?.potentialSavings,
                0
              ) * 12}
              /year
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageOptimizationCard;
