import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const FloatingAIAssistant = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const quickTips = [
    "💡 I can analyze your subscriptions instantly",
    "🎯 Find hidden subscription charges",
    "💰 Discover potential savings opportunities",
    "🔔 Set smart renewal reminders",
    "📊 Track spending patterns with AI",
  ];

  const quickActions = [
    {
      icon: "Sparkles",
      title: "Start AI Analysis",
      description: "Get instant insights on your subscriptions",
      action: () => navigate("/dashboard"),
    },
    {
      icon: "MessageSquare",
      title: "Chat with AI",
      description: "Ask me anything about subscription management",
      action: () => navigate("/chat-assistant"),
    },
    {
      icon: "TrendingUp",
      title: "View Analytics",
      description: "See detailed spending patterns and predictions",
      action: () => navigate("/ai-analytics"),
    },
  ];

  useEffect(() => {
    // Show assistant after 3 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Auto-open after 10 seconds if no interaction
    const autoOpenTimer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
      }
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoOpenTimer);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % quickTips?.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen, quickTips?.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  const handleActionClick = (action) => {
    setHasInteracted(true);
    action();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      {isOpen && (
        <div className="mb-4 w-80 glass-card rounded-2xl border border-primary/30 neon-glow-primary animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Bot" size={16} className="text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-success">Online</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              iconName="X"
              iconSize={16}
              onClick={handleToggle}
              className="hover:bg-muted/20"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Welcome Message */}
            <div className="mb-4">
              <div className="bg-primary/10 rounded-lg p-3 mb-3">
                <p className="text-sm text-foreground mb-2">
                  👋 Hi! I'm your AI financial assistant. I can help you:
                </p>
                <div className="h-6">
                  <p className="text-sm text-primary font-medium transition-all duration-500">
                    {quickTips?.[currentTip]}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">
                Quick Actions
              </p>
              {quickActions?.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleActionClick(action?.action)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      name={action?.icon}
                      size={16}
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-foreground">
                      {action?.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {action?.description}
                    </div>
                  </div>
                  <Icon
                    name="ArrowRight"
                    size={14}
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                  />
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-primary/20">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-primary">$127</div>
                  <div className="text-xs text-muted-foreground">
                    Avg. Monthly Savings
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-accent">2 min</div>
                  <div className="text-xs text-muted-foreground">
                    Setup Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className={`w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? "rotate-180 scale-90"
            : "hover:scale-110 neon-glow-primary animate-pulse"
        }`}
      >
        <Icon
          name={isOpen ? "X" : "MessageSquare"}
          size={24}
          className="text-black"
        />
      </button>
      {/* Notification Dot */}
      {!hasInteracted && !isOpen && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center animate-bounce">
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
      )}
      {/* Tooltip */}
      {!isOpen && !hasInteracted && (
        <div className="absolute bottom-full right-0 mb-2 w-48 glass-card rounded-lg p-3 border border-accent/30 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Sparkles" size={14} className="text-accent" />
            <span className="text-sm font-medium text-foreground">
              AI Assistant Ready!
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Click to get instant help with subscription management and savings
            tips.
          </p>
          {/* Arrow */}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent/30"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingAIAssistant;
