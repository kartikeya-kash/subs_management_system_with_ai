import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "LayoutDashboard",
      description: "Overview & insights",
    },
    {
      name: "Subscriptions",
      path: "/subscription-manager",
      icon: "CreditCard",
      description: "Manage your subscriptions",
    },
    {
      name: "AI Analytics",
      path: "/ai-analytics",
      icon: "Brain",
      description: "Smart financial insights",
    },
    {
      name: "Chat Assistant",
      path: "/chat-assistant",
      icon: "MessageSquare",
      description: "AI-powered help",
    },
  ];

  const bottomItems = [
    {
      name: "Profile Settings",
      path: "/profile-settings",
      icon: "Settings",
      description: "Account preferences",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div
      className={`flex items-center transition-all duration-300 ${
        isCollapsed ? "justify-center" : "space-x-3"
      }`}
    >
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center neon-glow-primary">
          <Icon name="Zap" size={24} className="text-black" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-foreground text-glow-primary">
            SubSense
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            AI Financial Intelligence
          </span>
        </div>
      )}
    </div>
  );

  const NavItem = ({ item, isBottom = false }) => {
    const isActive = isActivePath(item?.path);
    const isHovered = hoveredItem === item?.path;

    return (
      <div className="relative">
        <button
          onClick={() => handleNavigation(item?.path)}
          onMouseEnter={() => setHoveredItem(item?.path)}
          onMouseLeave={() => setHoveredItem(null)}
          className={`w-full flex items-center transition-all duration-300 rounded-xl group ${
            isCollapsed ? "justify-center p-3" : "space-x-3 p-4"
          } ${
            isActive
              ? "bg-primary/20 text-primary border border-primary/30 neon-glow-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover-glow-primary"
          }`}
        >
          <div
            className={`flex-shrink-0 transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          >
            <Icon name={item?.icon} size={20} />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col items-start flex-1 min-w-0">
              <span className="font-medium truncate">{item?.name}</span>
              <span className="text-xs text-muted-foreground truncate">
                {item?.description}
              </span>
            </div>
          )}

          {isActive && !isCollapsed && (
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          )}
        </button>
        {/* Tooltip for collapsed state */}
        {isCollapsed && isHovered && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 glass-card rounded-lg p-3 min-w-max border">
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{item?.name}</span>
              <span className="text-xs text-muted-foreground">
                {item?.description}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-surface/95 backdrop-blur-xl border-r border-border z-40 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b border-border transition-all duration-300 ${
            isCollapsed ? "p-4" : "p-6"
          }`}
        >
          <Logo />

          {!isCollapsed && onToggleCollapse && (
            <Button
              variant="ghost"
              iconName="PanelLeftClose"
              iconSize={18}
              onClick={onToggleCollapse}
              className="hover-glow-primary"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div
            className={`space-y-2 transition-all duration-300 ${
              isCollapsed ? "p-2" : "p-4"
            }`}
          >
            {navigationItems?.map((item) => (
              <NavItem key={item?.path} item={item} />
            ))}
          </div>

          {/* AI Assistant Quick Access */}
          {!isCollapsed && (
            <div className="mx-4 my-6">
              <div className="glass-card rounded-xl p-4 border border-accent/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <Icon name="Sparkles" size={16} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">AI Insights</h4>
                    <p className="text-xs text-muted-foreground">
                      Ready to help
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="MessageSquare"
                  iconPosition="left"
                  onClick={() => handleNavigation("/chat-assistant")}
                  className="border-accent/30 hover:border-accent hover:bg-accent/10"
                >
                  Ask AI
                </Button>
              </div>
            </div>
          )}
        </nav>

        {/* Bottom Section */}
        <div
          className={`border-t border-border transition-all duration-300 ${
            isCollapsed ? "p-2" : "p-4"
          }`}
        >
          <div className="space-y-2">
            {bottomItems?.map((item) => (
              <NavItem key={item?.path} item={item} isBottom />
            ))}
          </div>

          {/* User Profile */}
          {!isCollapsed && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300 cursor-pointer hover-glow-secondary">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    Alex Chen
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Premium User
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Collapse Toggle for Collapsed State */}
          {isCollapsed && onToggleCollapse && (
            <div className="mt-2">
              <Button
                variant="ghost"
                iconName="PanelLeftOpen"
                iconSize={18}
                onClick={onToggleCollapse}
                className="w-full hover-glow-primary"
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
