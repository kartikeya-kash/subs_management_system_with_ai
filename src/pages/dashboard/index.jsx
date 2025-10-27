import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import StatsCard from "./components/StatsCard";
import SubscriptionCard from "./components/SubscriptionCard";
import Button from "../../components/ui/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simplified essential stats only
  const essentialStats = [
    {
      title: "Active Subscriptions",
      value: "24",
      change: "+3",
      changeType: "positive",
      icon: "CreditCard",
      trend: 85,
      description: "Total active services",
    },
    {
      title: "Monthly Total",
      value: "$342.50",
      change: "-$28.50",
      changeType: "positive",
      icon: "DollarSign",
      trend: 65,
      description: "This month's spending",
    },
  ];

  // Top 3 subscriptions only
  const topSubscriptions = [
    {
      id: 1,
      name: "Netflix Premium",
      category: "Entertainment",
      cost: "15.99",
      nextBilling: "2025-11-15",
      status: "active",
      usage: 85,
      logo: "https://images.unsplash.com/photo-1604920787359-fedc855931de",
      logoAlt: "Netflix red logo on black background with white text",
    },
    {
      id: 2,
      name: "Spotify Family",
      category: "Music",
      cost: "16.99",
      nextBilling: "2025-11-03",
      status: "expiring",
      usage: 92,
      logo: "https://images.unsplash.com/photo-1634037227397-34c8c46d585c",
      logoAlt: "Spotify green circular logo on dark background",
    },
    {
      id: 3,
      name: "Adobe Creative Cloud",
      category: "Productivity",
      cost: "52.99",
      nextBilling: "2025-11-20",
      status: "active",
      usage: 45,
      logo: "https://images.unsplash.com/photo-1697752864356-e07d9fc8767d",
      logoAlt: "Adobe Creative Cloud colorful logo with multiple app icons",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscriptionManage = (subscriptionId) => {
    navigate("/subscription-manager", {
      state: { selectedSubscription: subscriptionId },
    });
  };

  const handleSubscriptionCancel = (subscriptionId) => {
    console.log("Cancel subscription:", subscriptionId);
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Simplified Welcome Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {getGreeting()}, {localStorage.getItem("username")}!
              </h1>
              <p className="text-muted-foreground">
                {currentTime?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Essential Stats Only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {essentialStats?.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
          </div>

          {/* Top Subscriptions */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Your Subscriptions
              </h2>
              <Button
                variant="outline"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => navigate("/subscription-manager")}
                className="text-sm"
              >
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {topSubscriptions?.map((subscription) => (
                <SubscriptionCard
                  key={subscription?.id}
                  subscription={subscription}
                  onManage={handleSubscriptionManage}
                  onCancel={handleSubscriptionCancel}
                />
              ))}
            </div>
          </div>

          {/* Single Primary Action */}
          <div className="text-center">
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate("/subscription-manager")}
              className="px-8 py-3 text-lg"
            >
              Add New Subscription
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
