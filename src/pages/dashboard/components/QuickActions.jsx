import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: "add-subscription",
      title: "Add Subscription",
      description: "Track a new service",
      icon: "Plus",
      color: "from-primary/20 to-secondary/20 border-primary/30",
      iconBg: "from-primary to-secondary",
    },
    {
      id: "ai-analysis",
      title: "AI Analysis",
      description: "Get smart insights",
      icon: "Brain",
      color: "from-secondary/20 to-accent/20 border-secondary/30",
      iconBg: "from-secondary to-accent",
    },
    {
      id: "bulk-manage",
      title: "Bulk Manage",
      description: "Edit multiple subs",
      icon: "Settings",
      color: "from-accent/20 to-primary/20 border-accent/30",
      iconBg: "from-accent to-primary",
    },
    {
      id: "export-data",
      title: "Export Data",
      description: "Download reports",
      icon: "Download",
      color: "from-warning/20 to-success/20 border-warning/30",
      iconBg: "from-warning to-success",
    },
  ];

  return (
    <div className="glass-card rounded-xl p-6 hover-glow-primary transition-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Ready</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onAction(action?.id)}
            className={`glass rounded-lg p-4 bg-gradient-to-br ${action?.color} hover-glow-primary transition-all duration-300 hover:scale-105 group`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${action?.iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon name={action?.icon} size={20} className="text-black" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="MessageSquare"
          iconPosition="left"
          onClick={() => onAction("chat-assistant")}
          className="border-accent/30 hover:border-accent hover:bg-accent/10"
        >
          Ask AI Assistant
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
