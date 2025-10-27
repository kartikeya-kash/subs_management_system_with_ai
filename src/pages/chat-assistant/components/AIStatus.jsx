import React from "react";
import Icon from "../../../components/AppIcon";

const AIStatus = ({ isOnline = true, isTyping = false, lastSeen }) => {
  const formatLastSeen = (date) => {
    if (!date) return "Never";

    const now = new Date();
    const lastSeenDate = new Date(date);
    const diffInMinutes = (now - lastSeenDate) / (1000 * 60);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return lastSeenDate?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="glass-card rounded-xl p-4 border border-primary/20">
      <div className="flex items-center space-x-3">
        {/* AI Avatar */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow-primary">
            <Icon name="Bot" size={24} className="text-black" />
          </div>
          {/* Status Indicator */}
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface flex items-center justify-center ${
              isOnline ? "bg-success" : "bg-muted-foreground"
            }`}
          >
            {isOnline && <div className="w-2 h-2 bg-black rounded-full"></div>}
          </div>
        </div>

        {/* AI Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-foreground">SubSense AI</h3>
            <div
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                isOnline
                  ? "bg-success/20 text-success"
                  : "bg-muted-foreground/20 text-muted-foreground"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-1">
            {isTyping ? (
              <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-primary font-medium">
                  AI is typing...
                </span>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                {isOnline
                  ? "Ready to help"
                  : `Last seen ${formatLastSeen(lastSeen)}`}
              </span>
            )}
          </div>
        </div>

        {/* AI Capabilities Indicator */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-1">
            <Icon name="Brain" size={16} className="text-accent" />
            <Icon name="Zap" size={16} className="text-primary" />
            <Icon name="Shield" size={16} className="text-secondary" />
          </div>
          <span className="text-xs text-muted-foreground">AI Powered</span>
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} className="text-accent" />
            <span className="text-xs text-muted-foreground">Analytics</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="PiggyBank" size={14} className="text-success" />
            <span className="text-xs text-muted-foreground">Savings</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Reminders</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={14} className="text-warning" />
            <span className="text-xs text-muted-foreground">Insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStatus;
