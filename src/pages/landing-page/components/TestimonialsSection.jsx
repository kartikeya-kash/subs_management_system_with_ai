import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1706565029882-6f25f1d9af65",
      avatarAlt:
        "Professional Asian woman with shoulder-length black hair in white blazer smiling at camera",
      content:
        "SubSense AI saved me $2,400 in the first year alone. The AI recommendations are incredibly accurate - it found subscriptions I completely forgot about and suggested better alternatives that actually improved my workflow.",
      savings: "$2,400",
      rating: 5,
      videoThumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      videoThumbnailAlt:
        "Modern office workspace with laptop and financial charts on screen",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Financial Advisor",
      company: "WealthWise",
      avatar: "https://images.unsplash.com/photo-1676989880361-091e12efc056",
      avatarAlt:
        "Professional Hispanic man with short dark hair in navy suit smiling confidently",
      content:
        "I recommend SubSense to all my clients. The predictive analytics are game-changing - it's like having a crystal ball for subscription spending. My clients love the transparency and control it gives them.",
      savings: "$1,850",
      rating: 5,
      videoThumbnail:
        "https://images.unsplash.com/photo-1630569470960-ec1e8c077d6b",
      videoThumbnailAlt:
        "Financial advisor consulting with client showing charts and graphs on tablet",
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Startup Founder",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1539813349302-cf36e01e5795",
      avatarAlt:
        "Young professional woman with blonde hair in blue business shirt smiling warmly",
      content:
        "Running a startup means every dollar counts. SubSense's AI caught redundant software subscriptions across our team and negotiated better rates. It's like having a CFO dedicated to subscription optimization.",
      savings: "$3,200",
      rating: 5,
      videoThumbnail:
        "https://images.unsplash.com/photo-1690192078982-d3d2f89059ee",
      videoThumbnailAlt:
        "Modern startup office with team members collaborating around computer screens",
    },
  ];

  const stats = [
    { value: "98.7%", label: "User Satisfaction" },
    { value: "$2.1M", label: "Total Savings" },
    { value: "45K+", label: "Happy Users" },
    { value: "4.9/5", label: "App Store Rating" },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const handleTestimonialChange = (index) => {
    setActiveTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials?.[activeTestimonial];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-black to-surface">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl floating-orb-1"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl floating-orb-2"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-2 border border-success/30 mb-6">
            <Icon name="Users" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              User Success Stories
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Real People,
            <span className="text-glow-accent text-accent block">
              Real Savings
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how thousands of users have transformed their financial
            lives with AI-powered subscription management.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Video/Image Section */}
          <div className="relative">
            <div className="glass-card rounded-2xl overflow-hidden border border-primary/30 neon-glow-primary">
              <div className="relative aspect-video">
                <Image
                  src={currentTestimonial?.videoThumbnail}
                  alt={currentTestimonial?.videoThumbnailAlt}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 neon-glow-primary">
                    <Icon name="Play" size={24} className="text-black ml-1" />
                  </button>
                </div>
                {/* Savings Badge */}
                <div className="absolute top-4 right-4 glass-card rounded-lg px-3 py-2 border border-success/30">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="DollarSign"
                      size={16}
                      className="text-success"
                    />
                    <span className="text-sm font-semibold text-success">
                      {currentTestimonial?.savings} Saved
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(currentTestimonial?.rating)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={20}
                  className="text-accent fill-current"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-2xl text-foreground leading-relaxed">
              "{currentTestimonial?.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                <Image
                  src={currentTestimonial?.avatar}
                  alt={currentTestimonial?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-foreground text-lg">
                  {currentTestimonial?.name}
                </div>
                <div className="text-muted-foreground">
                  {currentTestimonial?.role} at {currentTestimonial?.company}
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center space-x-3 pt-4">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTestimonialChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 text-center border border-accent/20 hover-glow-accent transition-all duration-300"
            >
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials?.map((testimonial, index) => (
            <div
              key={testimonial?.id}
              className={`glass-card rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                index === activeTestimonial
                  ? "border-primary/50 neon-glow-primary"
                  : "border-muted/30 hover:border-primary/30"
              }`}
              onClick={() => handleTestimonialChange(index)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    {testimonial?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial?.role}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {testimonial?.content}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className="text-accent fill-current"
                    />
                  ))}
                </div>
                <div className="text-sm font-semibold text-success">
                  {testimonial?.savings}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
