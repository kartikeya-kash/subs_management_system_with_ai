import React from "react";
import Icon from "../../../components/AppIcon";

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: "analyze-spending",
      title: "Analyze My Spending",
      description: "Get AI insights on your subscription patterns",
      icon: "TrendingUp",
      color: "primary",
    },
    {
      id: "find-savings",
      title: "Find Savings",
      description: "Discover ways to reduce subscription costs",
      icon: "PiggyBank",
      color: "accent",
    },
    {
      id: "upcoming-renewals",
      title: "Upcoming Renewals",
      description: "Check what subscriptions are renewing soon",
      icon: "Calendar",
      color: "secondary",
    },
    {
      id: "add-subscription",
      title: "Add Subscription",
      description: "Help me add a new subscription",
      icon: "Plus",
      color: "primary",
    },
    {
      id: "budget-advice",
      title: "Budget Advice",
      description: "Get personalized budgeting recommendations",
      icon: "Target",
      color: "accent",
    },
    {
      id: "cancel-help",
      title: "Cancellation Help",
      description: "Guide me through canceling subscriptions",
      icon: "XCircle",
      color: "error",
    },
  ];

  const handleActionClick = (action) => {
    onActionClick(action);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className="glass-card rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover-glow-primary text-left group"
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  action?.color === "primary"
                    ? "bg-primary/20 text-primary"
                    : action?.color === "accent"
                    ? "bg-accent/20 text-accent"
                    : action?.color === "secondary"
                    ? "bg-secondary/20 text-secondary"
                    : "bg-error/20 text-error"
                }`}
              >
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="glass-card rounded-xl p-4 border border-accent/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={16} className="text-black" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">
              Need something else?
            </h4>
            <p className="text-sm text-muted-foreground">
              Just type your question below and I'll help you out!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
