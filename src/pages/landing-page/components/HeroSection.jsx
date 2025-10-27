import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";

import Button from "../../../components/ui/Button";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { value: "$2.4M", label: "Total Savings Generated" },
    { value: "45,892", label: "Subscriptions Managed" },
    { value: "98.7%", label: "User Satisfaction Rate" },
    { value: "156", label: "AI Recommendations Daily" },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    //landing page to the dashboard
    navigate("/register");
  };

  const handleWatchDemo = () => {
    // Demo functionality would be implemented here
    console.log("Watch demo clicked");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl floating-orb-1"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-secondary/20 rounded-full blur-3xl floating-orb-2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl floating-orb-3"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-2 border border-primary/30">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                AI-Powered Financial Intelligence
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Transform
                <span className="text-glow-primary text-primary block">
                  Subscription
                </span>
                <span className="text-glow-accent text-accent">Chaos</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Your AI-powered financial companion that turns subscription
                overwhelm into intelligent control. Save smarter, not harder
                with predictive insights and automated optimization.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Sparkles"
                iconPosition="left"
                onClick={handleGetStarted}
                className="neon-pulse hover-glow-primary"
              >
                Start Free AI Analysis
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                onClick={handleWatchDemo}
                className="border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                Watch Demo
              </Button>
            </div>

            {/* Dynamic Stats */}
            <div className="glass-card rounded-xl p-6 border border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-accent">
                    {stats?.[currentStat]?.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stats?.[currentStat]?.label}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-black" />
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-primary" />
                <span>45K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-accent" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="glass-card rounded-2xl p-6 border border-primary/30 neon-glow-primary">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      AI Dashboard Preview
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time subscription insights
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                </div>

                {/* Mock Chart */}
                <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg mb-6 flex items-end justify-between p-4">
                  {[40, 65, 45, 80, 55, 90, 70]?.map((height, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-primary to-accent rounded-sm"
                      style={{ height: `${height}%`, width: "12px" }}
                    ></div>
                  ))}
                </div>

                {/* Subscription Items */}
                <div className="space-y-3">
                  {[
                    {
                      name: "Netflix",
                      amount: "$15.99",
                      status: "active",
                      color: "bg-red-500",
                    },
                    {
                      name: "Spotify",
                      amount: "$9.99",
                      status: "expiring",
                      color: "bg-green-500",
                    },
                    {
                      name: "Adobe CC",
                      amount: "$52.99",
                      status: "optimize",
                      color: "bg-blue-500",
                    },
                  ]?.map((sub, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 ${sub?.color} rounded-lg flex items-center justify-center`}
                        >
                          <Icon name="Play" size={14} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {sub?.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {sub?.status}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {sub?.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating AI Assistant */}
              <div className="absolute -bottom-4 -right-4 glass-card rounded-full p-4 border border-accent/30 neon-glow-accent">
                <Icon name="Bot" size={24} className="text-accent" />
              </div>

              {/* Floating Savings Badge */}
              <div className="absolute -top-4 -left-4 glass-card rounded-lg px-3 py-2 border border-success/30">
                <div className="flex items-center space-x-2">
                  <Icon name="DollarSign" size={16} className="text-success" />
                  <span className="text-sm font-semibold text-success">
                    $127 Saved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 text-muted-foreground">
          <span className="text-sm">Discover More</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
