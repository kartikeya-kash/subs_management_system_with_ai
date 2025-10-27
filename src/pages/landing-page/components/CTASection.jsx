import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CTASection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentBenefit, setCurrentBenefit] = useState(0);

  const benefits = [
    "Instant AI analysis of your subscriptions",
    "Personalized savings recommendations",
    "Automated price change alerts",
    "Smart renewal reminders",
  ];

  const quickStats = [
    { icon: "Clock", value: "2 min", label: "Setup Time" },
    { icon: "CreditCard", value: "No Card", label: "Required" },
    { icon: "Shield", value: "100%", label: "Secure" },
    { icon: "Zap", value: "Instant", label: "Results" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits?.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate("/dashboard");
  };

  const handleEmailSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate email submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/dashboard");
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-surface to-black">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl floating-orb-1"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl floating-orb-2"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl floating-orb-3"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main CTA Card */}
        <div className="glass-card rounded-3xl p-12 border border-primary/30 neon-glow-primary text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-2 border border-accent/30 mb-6">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent">
                Limited Time: Free AI Analysis
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Ready to Save
              <span className="text-glow-primary text-primary block">
                $127+ Monthly?
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 45,000+ users who've transformed their subscription chaos
              into intelligent financial control. Start your free AI analysis
              now.
            </p>

            {/* Rotating Benefits */}
            <div className="h-8 mb-8">
              <div className="flex items-center justify-center space-x-2 text-lg">
                <Icon name="Sparkles" size={20} className="text-accent" />
                <span className="text-accent font-medium transition-all duration-500">
                  {benefits?.[currentBenefit]}
                </span>
              </div>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-muted/20 border border-primary/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isSubmitting}
                iconName="ArrowRight"
                iconPosition="right"
                className="neon-pulse hover-glow-primary whitespace-nowrap"
              >
                Start Free Analysis
              </Button>
            </div>
          </form>

          {/* Alternative CTA */}
          <div className="mb-8">
            <div className="text-sm text-muted-foreground mb-4">
              Or get started immediately
            </div>
            <Button
              variant="outline"
              size="lg"
              iconName="Zap"
              iconPosition="left"
              onClick={handleGetStarted}
              loading={isSubmitting}
              className="border-accent/30 hover:border-accent hover:bg-accent/10 text-accent"
            >
              Skip Email - Go to Dashboard
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats?.map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-primary/30">
                  <Icon name={stat?.icon} size={20} className="text-primary" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">
                    {stat?.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat?.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span>45,000+ happy users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-accent" />
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>

        {/* Secondary CTA Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
          {/* Demo Card */}
          <div className="glass-card rounded-xl p-8 border border-secondary/30 hover-glow-secondary transition-all duration-300 group cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="Play" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Watch 2-Min Demo
                </h3>
                <p className="text-sm text-muted-foreground">
                  See AI in action
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Watch how SubSense AI analyzes subscriptions and finds savings
              opportunities in real-time.
            </p>
            <div className="flex items-center space-x-2 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-sm font-medium">Play demo video</span>
              <Icon name="ExternalLink" size={14} />
            </div>
          </div>

          {/* Chat Card */}
          <div
            className="glass-card rounded-xl p-8 border border-accent/30 hover-glow-accent transition-all duration-300 group cursor-pointer"
            onClick={() => navigate("/chat-assistant")}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="MessageSquare" size={20} className="text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Chat with AI
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get instant answers
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Have questions? Chat with our AI assistant to learn how SubSense
              can help your specific situation.
            </p>
            <div className="flex items-center space-x-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-sm font-medium">Start conversation</span>
              <Icon name="ArrowRight" size={14} />
            </div>
          </div>
        </div>

        {/* Final Trust Statement */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 glass-card rounded-full px-6 py-3 border border-success/30">
            <Icon name="ShieldCheck" size={20} className="text-success" />
            <span className="text-sm text-success font-medium">
              Trusted by 45,000+ users • $2.4M+ in total savings • 99.97% uptime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
