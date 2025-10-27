import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AIInsightsPanel = ({
  insights,
  onImplementRecommendation,
  onChatWithAI,
}) => {
  const getInsightIcon = (type) => {
    switch (type) {
      case "savings":
        return "PiggyBank";
      case "warning":
        return "AlertTriangle";
      case "optimization":
        return "Zap";
      case "trend":
        return "TrendingUp";
      default:
        return "Lightbulb";
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case "savings":
        return "from-accent to-primary";
      case "warning":
        return "from-warning to-error";
      case "optimization":
        return "from-primary to-secondary";
      case "trend":
        return "from-secondary to-accent";
      default:
        return "from-primary to-accent";
    }
  };

  const getInsightBorder = (type) => {
    switch (type) {
      case "savings":
        return "border-accent/30";
      case "warning":
        return "border-warning/30";
      case "optimization":
        return "border-primary/30";
      case "trend":
        return "border-secondary/30";
      default:
        return "border-primary/30";
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 border border-accent/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center neon-glow-accent">
            <Icon name="Sparkles" size={20} className="text-black" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              AI Insights & Recommendations
            </h3>
            <p className="text-sm text-muted-foreground">
              Personalized optimization suggestions
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          iconName="MessageSquare"
          iconPosition="left"
          onClick={onChatWithAI}
          className="border-accent/30 hover:border-accent hover:bg-accent/10"
        >
          Chat with AI
        </Button>
      </div>
      <div className="space-y-4">
        {insights?.map((insight) => (
          <div
            key={insight?.id}
            className={`glass rounded-lg p-4 border ${getInsightBorder(
              insight?.type
            )} hover-glow-primary transition-glow`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-8 h-8 bg-gradient-to-br ${getInsightColor(
                  insight?.type
                )} rounded-lg flex items-center justify-center flex-shrink-0`}
              >
                <Icon
                  name={getInsightIcon(insight?.type)}
                  size={16}
                  className="text-black"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">
                    {insight?.title}
                  </h4>
                  {insight?.potentialSavings && (
                    <span className="text-accent font-bold">
                      +${insight?.potentialSavings}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {insight?.description}
                </p>

                {insight?.actionable && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-xs text-accent font-medium">
                        Action Required
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={() => onImplementRecommendation(insight?.id)}
                      className="border-accent/30 hover:border-accent hover:bg-accent/10"
                    >
                      Implement
                    </Button>
                  </div>
                )}

                {insight?.confidence && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>AI Confidence</span>
                      <span>{insight?.confidence}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-1 rounded-full transition-all duration-500"
                        style={{ width: `${insight?.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
        <div className="flex items-center space-x-3">
          <Icon name="Info" size={16} className="text-primary" />
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium">
              AI Learning in Progress
            </p>
            <p className="text-xs text-muted-foreground">
              Our AI analyzes your spending patterns continuously to provide
              better recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;
