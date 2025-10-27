import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TrustSection from "./components/TrustSection";
import CTASection from "./components/CTASection";
import FloatingAIAssistant from "./components/FloatingAIAssistant";

const LandingPage = () => {
  useEffect(() => {
    // Scroll reveal animation setup
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll(".scroll-reveal");
    scrollElements?.forEach((el) => observer?.observe(el));

    // Cleanup
    return () => {
      scrollElements?.forEach((el) => observer?.unobserve(el));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          SubSense AI - Transform Subscription Chaos into Intelligent Control
        </title>
        <meta
          name="description"
          content="AI-powered subscription management platform that saves you $127+ monthly. Get instant insights, automated alerts, and personalized recommendations. Join 45,000+ users saving millions."
        />
        <meta
          name="keywords"
          content="subscription management, AI financial assistant, save money, subscription tracker, automated billing alerts"
        />
        <meta
          property="og:title"
          content="SubSense AI - Your AI-Powered Financial Companion"
        />
        <meta
          property="og:description"
          content="Transform subscription overwhelm into intelligent control with AI that actually understands money."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="SubSense AI - Transform Subscription Chaos"
        />
        <meta
          name="twitter:description"
          content="Save $127+ monthly with AI-powered subscription management. Join 45,000+ users."
        />
      </Helmet>

      <div className="min-h-screen bg-black text-foreground overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <div className="scroll-reveal">
          <FeaturesSection />
        </div>

        {/* Testimonials Section */}
        <div className="scroll-reveal delay-200">
          <TestimonialsSection />
        </div>

        {/* Trust & Security Section */}
        <div className="scroll-reveal delay-300">
          <TrustSection />
        </div>

        {/* Final CTA Section */}
        <div className="scroll-reveal delay-400">
          <CTASection />
        </div>

        {/* Floating AI Assistant */}
        <FloatingAIAssistant />

        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating-orb-1"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl floating-orb-2"></div>
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl floating-orb-3"></div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
