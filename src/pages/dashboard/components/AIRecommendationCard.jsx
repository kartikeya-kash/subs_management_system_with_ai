import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AIRecommendationCard = ({ recommendation, onAccept, onDismiss }) => {
  const getRecommendationIcon = (type) => {
    switch (type) {
      case "savings":
        return "PiggyBank";
      case "optimization":
        return "Zap";
      case "alert":
        return "AlertTriangle";
      case "bundle":
        return "Package";
      default:
        return "Lightbulb";
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case "savings":
        return "from-success/20 to-accent/20 border-success/30";
      case "optimization":
        return "from-primary/20 to-secondary/20 border-primary/30";
      case "alert":
        return "from-warning/20 to-error/20 border-warning/30";
      case "bundle":
        return "from-secondary/20 to-accent/20 border-secondary/30";
      default:
        return "from-primary/20 to-secondary/20 border-primary/30";
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "high":
        return "text-success";
      case "medium":
        return "text-warning";
      case "low":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div
      className={`glass-card rounded-xl p-4 bg-gradient-to-br ${getRecommendationColor(
        recommendation?.type
      )} hover-glow-primary transition-glow`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon
              name={getRecommendationIcon(recommendation?.type)}
              size={20}
              className="text-black"
            />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              {recommendation?.title}
            </h4>
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-medium ${getImpactColor(
                  recommendation?.impact
                )}`}
              >
                {recommendation?.impact?.toUpperCase()} IMPACT
              </span>
              {recommendation?.savings && (
                <span className="text-xs text-success font-medium">
                  Save ${recommendation?.savings}/mo
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">AI</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {recommendation?.description}
      </p>
      {recommendation?.details && (
        <div className="bg-muted/20 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={14} className="text-primary" />
            <span className="text-xs font-medium text-foreground">Details</span>
          </div>
          <ul className="space-y-1">
            {recommendation?.details?.map((detail, index) => (
              <li
                key={index}
                className="text-xs text-muted-foreground flex items-center space-x-2"
              >
                <Icon name="ChevronRight" size={12} />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex space-x-2">
        <Button
          variant="default"
          size="sm"
          iconName="Check"
          iconPosition="left"
          onClick={() => onAccept(recommendation?.id)}
          className="flex-1"
        >
          Accept
        </Button>

        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={() => onDismiss(recommendation?.id)}
          className="text-muted-foreground hover:text-foreground"
        ></Button>
      </div>
    </div>
  );
};

export default AIRecommendationCard;
