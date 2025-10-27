import React from "react";
import Icon from "../../../components/AppIcon";

const SettingsNavigation = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    {
      id: "profile",
      name: "Profile",
      icon: "User",
      description: "Personal information",
    },
    {
      id: "account",
      name: "Account",
      icon: "Settings",
      description: "Account preferences",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: "Bell",
      description: "Alert preferences",
    },
    {
      id: "ai",
      name: "AI Settings",
      icon: "Brain",
      description: "AI learning parameters",
    },
    {
      id: "security",
      name: "Security",
      icon: "Shield",
      description: "Security & privacy",
    },
  ];

  return (
    <div className="glass-card rounded-xl p-2 border border-border">
      <nav className="space-y-1">
        {navigationItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => onTabChange(item?.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
              activeTab === item?.id
                ? "bg-primary/20 text-primary border border-primary/30 neon-glow-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover-glow-primary"
            }`}
          >
            <div
              className={`flex-shrink-0 transition-transform duration-300 ${
                activeTab === item?.id ? "scale-110" : "scale-100"
              }`}
            >
              <Icon name={item?.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{item?.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {item?.description}
              </div>
            </div>
            {activeTab === item?.id && (
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SettingsNavigation;
