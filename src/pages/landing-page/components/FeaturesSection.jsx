import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";

const FeaturesSection = () => {
  const [visibleFeatures, setVisibleFeatures] = useState(new Set());
  const sectionRef = useRef(null);

  const features = [
    {
      id: 1,
      icon: "Brain",
      title: "AI-Powered Insights",
      description:
        "Advanced machine learning algorithms analyze your spending patterns and predict future subscription needs with 94% accuracy.",
      color: "primary",
      stats: "94% Accuracy",
    },
    {
      id: 2,
      icon: "Shield",
      title: "Smart Security",
      description:
        "Bank-level encryption and real-time fraud detection protect your financial data while monitoring subscription changes.",
      color: "success",
      stats: "256-bit Encryption",
    },
    {
      id: 3,
      icon: "TrendingUp",
      title: "Predictive Analytics",
      description:
        "Forecast subscription costs, identify optimization opportunities, and receive personalized savings recommendations.",
      color: "accent",
      stats: "Average $127/mo Saved",
    },
    {
      id: 4,
      icon: "MessageSquare",
      title: "Conversational AI",
      description:
        "Natural language processing enables intuitive conversations about your subscriptions and financial goals.",
      color: "secondary",
      stats: "24/7 Available",
    },
    {
      id: 5,
      icon: "Zap",
      title: "Instant Optimization",
      description:
        "Real-time subscription monitoring with automated alerts for price changes, renewals, and better alternatives.",
      color: "warning",
      stats: "Real-time Updates",
    },
    {
      id: 6,
      icon: "Target",
      title: "Goal Tracking",
      description:
        "Set savings targets and track progress with visual dashboards and achievement milestones.",
      color: "error",
      stats: "Goal Achievement",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const featureId = parseInt(entry.target.dataset.featureId);
            setVisibleFeatures((prev) => new Set([...prev, featureId]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const featureElements =
      sectionRef?.current?.querySelectorAll("[data-feature-id]");
    featureElements?.forEach((el) => observer?.observe(el));

    return () => observer?.disconnect();
  }, []);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "text-primary border-primary/30 neon-glow-primary",
      success: "text-success border-success/30 neon-glow-accent",
      accent: "text-accent border-accent/30 neon-glow-accent",
      secondary: "text-secondary border-secondary/30 neon-glow-secondary",
      warning: "text-warning border-warning/30",
      error: "text-error border-error/30",
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-2 border border-accent/30 mb-6">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">
              Intelligent Features
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            AI That Actually
            <span className="text-glow-primary text-primary block">
              Understands Money
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of subscription management with cutting-edge
            artificial intelligence that learns your habits, predicts your
            needs, and optimizes your spending automatically.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <div
              key={feature?.id}
              data-feature-id={feature?.id}
              className={`glass-card rounded-xl p-8 border transition-all duration-700 hover-glow-primary group cursor-pointer ${
                visibleFeatures?.has(feature?.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Feature Icon */}
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 border-2 transition-all duration-300 group-hover:scale-110 ${getColorClasses(
                  feature?.color
                )}`}
              >
                <Icon name={feature?.icon} size={28} />
              </div>

              {/* Feature Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-glow-primary transition-all duration-300">
                    {feature?.title}
                  </h3>
                  <div className="text-xs font-mono text-muted-foreground bg-muted/20 px-2 py-1 rounded">
                    {feature?.stats}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>

                {/* Interactive Element */}
                <div className="flex items-center space-x-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Learn more</span>
                  <Icon
                    name="ArrowRight"
                    size={14}
                    className="transform group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-card rounded-2xl p-8 border border-primary/30 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Rocket" size={24} className="text-black" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Ready to Experience AI Magic?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Join thousands who've transformed their financial lives
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>2-minute setup</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Icon name="CreditCard" size={14} />
                <span>No credit card required</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={14} />
                <span>100% secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
