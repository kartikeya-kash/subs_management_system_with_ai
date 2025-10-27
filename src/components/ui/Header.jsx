import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    {
      name: "Subscriptions",
      path: "/subscription-manager",
      icon: "CreditCard",
    },
    { name: "AI Analytics", path: "/ai-analytics", icon: "Brain" },
    { name: "Chat Assistant", path: "/chat-assistant", icon: "MessageSquare" },
  ];

  const moreMenuItems = [
    { name: "Profile Settings", path: "/profile-settings", icon: "Settings" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-primary">
          <Icon name="Brain" size={20} className="text-black" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-foreground text-glow-primary">
          SubSense
        </span>
        <span className="text-xs text-muted-foreground font-mono">AI</span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card border-b" : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="cursor-pointer transition-glow hover:scale-105"
            onClick={() => handleNavigation("/dashboard")}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? "bg-primary/20 text-primary border border-primary/30 neon-glow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.name}</span>
              </button>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300">
                <Icon name="MoreHorizontal" size={18} />
                <span className="font-medium">More</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 glass-card rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="p-2">
                  {moreMenuItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-300 ${
                        isActivePath(item?.path)
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span className="font-medium">{item?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* User Profile & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              iconName="Bell"
              iconSize={18}
              className="relative hover-glow-primary"
            ></Button>

            <div className="w-px h-6 bg-border"></div>

            <div className="flex items-center space-x-3 cursor-pointer hover-glow-primary transition-glow p-2 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {localStorage.getItem("username")}
                </span>
                <span className="text-xs text-muted-foreground">User</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-card border-t mt-2 rounded-lg">
            <div className="p-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActivePath(item?.path)
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.name}</span>
                </button>
              ))}

              <div className="border-t border-border pt-2 mt-4">
                {moreMenuItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActivePath(item?.path)
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="font-medium">{item?.name}</span>
                  </button>
                ))}
              </div>

              {/* Mobile User Profile */}
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {localStorage.getItem("username")}
                    </span>
                    <span className="text-xs text-muted-foreground">User</span>
                  </div>
                  <div className="ml-auto">
                    <Button variant="ghost" iconName="Bell" iconSize={18}>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
