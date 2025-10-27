import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TrustSection = () => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const securityFeatures = [
    {
      icon: "Shield",
      title: "Bank-Level Encryption",
      description:
        "256-bit SSL encryption protects all data transmission and storage",
      badge: "SOC 2 Certified",
    },
    {
      icon: "Lock",
      title: "Zero-Knowledge Architecture",
      description:
        "Your financial data is encrypted before it reaches our servers",
      badge: "Privacy First",
    },
    {
      icon: "Eye",
      title: "Transparent AI",
      description:
        "Full visibility into how AI makes recommendations and decisions",
      badge: "Explainable AI",
    },
    {
      icon: "UserCheck",
      title: "GDPR Compliant",
      description:
        "Complete control over your data with easy export and deletion",
      badge: "EU Compliant",
    },
  ];

  const certifications = [
    {
      name: "SOC 2 Type II",
      logo: "https://images.unsplash.com/photo-1643101809136-ea076148efb6",
      logoAlt: "SOC 2 Type II security certification badge with shield icon",
    },
    {
      name: "ISO 27001",
      logo: "https://images.unsplash.com/photo-1660732106134-f3009a1e90ea",
      logoAlt: "ISO 27001 information security management certification logo",
    },
    {
      name: "PCI DSS",
      logo: "https://images.unsplash.com/photo-1430276084627-789fe55a6da0",
      logoAlt: "PCI DSS payment card industry security standards certification",
    },
    {
      name: "GDPR Ready",
      logo: "https://images.unsplash.com/photo-1653892314569-3f0c831239a7",
      logoAlt:
        "GDPR compliance certification badge for European data protection",
    },
  ];

  const industryRecognition = [
    {
      award: "Best Fintech Innovation 2024",
      organization: "TechCrunch Disrupt",
      icon: "Trophy",
    },
    {
      award: "AI Excellence Award",
      organization: "Financial Technology Awards",
      icon: "Award",
    },
    {
      award: "Customer Choice Award",
      organization: "G2 Software Reviews",
      icon: "Star",
    },
  ];

  const liveMetrics = [
    { value: "$2,847,392", label: "Total User Savings", prefix: "$" },
    { value: "99.97%", label: "System Uptime", suffix: "%" },
    { value: "156,847", label: "Subscriptions Managed", prefix: "" },
    { value: "2.3s", label: "Average Response Time", suffix: "s" },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % liveMetrics?.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-surface to-black">
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-success/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-2 border border-success/30 mb-6">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              Trust & Security
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Your Money,
            <span className="text-glow-primary text-primary block">
              Your Control
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade security meets transparent AI. We protect your
            financial data with the same standards used by major banks, while
            giving you complete visibility and control.
          </p>
        </div>

        {/* Live Metrics Banner */}
        <div
          className={`glass-card rounded-2xl p-8 border border-primary/30 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-foreground">
                Live Platform Metrics
              </span>
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              Updated: {new Date()?.toLocaleTimeString()}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {liveMetrics?.map((metric, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-500 ${
                  index === currentMetric ? "scale-105" : "scale-100"
                }`}
              >
                <div
                  className={`text-2xl lg:text-3xl font-bold mb-2 ${
                    index === currentMetric
                      ? "text-primary text-glow-primary"
                      : "text-foreground"
                  }`}
                >
                  {metric?.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric?.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {securityFeatures?.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 border border-success/20 hover-glow-accent transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name={feature?.icon} size={20} className="text-black" />
                </div>
                <div className="text-xs font-mono text-success bg-success/20 px-2 py-1 rounded">
                  {feature?.badge}
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {feature?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications & Recognition */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Certifications */}
          <div className="glass-card rounded-xl p-8 border border-primary/30">
            <div className="flex items-center space-x-3 mb-6">
              <Icon name="Certificate" size={24} className="text-primary" />
              <h3 className="text-xl font-semibold text-foreground">
                Security Certifications
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {certifications?.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-300"
                >
                  <div className="w-12 h-8 bg-foreground/10 rounded flex items-center justify-center overflow-hidden">
                    <Image
                      src={cert?.logo}
                      alt={cert?.logoAlt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {cert?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Recognition */}
          <div className="glass-card rounded-xl p-8 border border-accent/30">
            <div className="flex items-center space-x-3 mb-6">
              <Icon name="Award" size={24} className="text-accent" />
              <h3 className="text-xl font-semibold text-foreground">
                Industry Recognition
              </h3>
            </div>
            <div className="space-y-4">
              {industryRecognition?.map((recognition, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <Icon
                      name={recognition?.icon}
                      size={18}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {recognition?.award}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {recognition?.organization}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Statement */}
        <div className="text-center">
          <div className="glass-card rounded-2xl p-8 border border-success/30 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center">
                <Icon name="ShieldCheck" size={32} className="text-black" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  Your Trust is Our Foundation
                </h3>
                <p className="text-muted-foreground">
                  Protecting your financial privacy since day one
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-success mb-2">
                  Zero Breaches
                </div>
                <div className="text-sm text-muted-foreground">
                  Perfect security record since 2022
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">
                  24/7 Monitoring
                </div>
                <div className="text-sm text-muted-foreground">
                  Continuous threat detection
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-2">
                  Full Transparency
                </div>
                <div className="text-sm text-muted-foreground">
                  Open source security audits
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
