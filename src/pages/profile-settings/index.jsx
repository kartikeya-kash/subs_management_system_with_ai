import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import ProfileHeader from "./components/ProfileHeader";
import SettingsNavigation from "./components/SettingsNavigation";
import AccountSettings from "./components/AccountSettings";
import NotificationSettings from "./components/NotificationSettings";
import AISettings from "./components/AISettings";
import SecuritySettings from "./components/SecuritySettings";
import Icon from "../../components/AppIcon";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Mock user profile data
  const userProfile = {
    name: "Alex Chen",
    email: "alex.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1698072556534-40ec6e337311",
    avatarAlt:
      "Professional headshot of Asian man with short black hair wearing navy blue shirt",
    plan: "Premium Plan",
    memberSince: "Jan 2023",
    location: "San Francisco, CA",
    stats: {
      subscriptions: 12,
      monthlySavings: 127,
      aiRecommendations: 34,
      optimizationScore: 87,
    },
  };

  // Mock account settings
  const [accountSettings, setAccountSettings] = useState({
    firstName: "Alex",
    lastName: "Chen",
    email: "alex.chen@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    streetAddress: "123 Market Street, Apt 4B",
    city: "San Francisco",
    state: "California",
    zipCode: "94102",
    country: "United States",
    timezone: "UTC-8",
    currency: "USD",
    language: "en",
    monthlyBudget: 250,
    savingsGoal: 20,
    autoCancelUnused: true,
    smartBundling: true,
    priceDropAlerts: true,
    annualPaymentReminders: false,
  });

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    subscriptions: {
      renewals: true,
      priceChanges: true,
      unusedServices: true,
      duplicateServices: false,
      frequency: "daily",
    },
    ai: {
      savingsOpportunities: true,
      bundleRecommendations: true,
      alternativeServices: false,
      usageInsights: true,
      frequency: "weekly",
    },
    security: {
      loginAlerts: true,
      passwordChanges: true,
      dataExports: true,
      privacyUpdates: true,
    },
    marketing: {
      productUpdates: true,
      tips: true,
      newsletters: false,
      surveys: false,
    },
  });

  // Mock AI settings
  const [aiSettings, setAISettings] = useState({
    personality: "balanced",
    analysisDepth: "standard",
    recommendationFrequency: "weekly",
    currentSavingsRate: 18,
    savingsTarget: 25,
    usagePatternAnalysis: true,
    spendingBehaviorLearning: true,
    crossPlatformIntegration: true,
    predictiveModeling: false,
    seasonalAdjustments: true,
    trainingDataPoints: "2.4K",
    modelAccuracy: 94,
    lastTraining: "2 days ago",
  });

  // Mock security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    smsBackup: true,
    emailBackup: false,
    loginNotifications: true,
    sessionTimeout: "60",
    dataAnalytics: true,
    marketingCommunications: false,
    thirdPartyIntegrations: true,
    dataSharingAI: true,
    recentLogins: [
      {
        device: "desktop",
        browser: "Chrome on macOS",
        location: "San Francisco, CA",
        time: "2:34 PM",
        date: "Today",
      },
      {
        device: "mobile",
        browser: "Safari on iPhone",
        location: "San Francisco, CA",
        time: "8:15 AM",
        date: "Today",
      },
      {
        device: "desktop",
        browser: "Firefox on Windows",
        location: "Oakland, CA",
        time: "6:22 PM",
        date: "Yesterday",
      },
    ],
  });

  const handleEditProfile = () => {
    setActiveTab("account");
  };

  const handleUploadPhoto = () => {
    // Mock photo upload functionality
    console.log("Photo upload triggered");
  };

  const handleUpdateAccountSettings = (newSettings) => {
    setAccountSettings(newSettings);
  };

  const handleUpdateNotificationSettings = (newSettings) => {
    setNotificationSettings(newSettings);
  };

  const handleUpdateAISettings = (newSettings) => {
    setAISettings(newSettings);
  };

  const handleUpdateSecuritySettings = (newSettings) => {
    setSecuritySettings(newSettings);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <ProfileHeader
              userProfile={userProfile}
              onEditProfile={handleEditProfile}
              onUploadPhoto={handleUploadPhoto}
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-lg p-4 border border-accent/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-black" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      $1,247
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Saved This Year
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-lg p-4 border border-primary/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={20} className="text-black" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">47</div>
                    <div className="text-xs text-muted-foreground">
                      AI Recommendations Used
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-lg p-4 border border-secondary/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">3</div>
                    <div className="text-xs text-muted-foreground">
                      Subscriptions Cancelled
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-lg p-4 border border-warning/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-warning to-error rounded-lg flex items-center justify-center">
                    <Icon name="Target" size={20} className="text-black" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">92%</div>
                    <div className="text-xs text-muted-foreground">
                      Goal Achievement
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Activity */}
            <div className="glass-card rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Recent Activity
                </h3>
                <Icon name="Activity" size={20} className="text-primary" />
              </div>
              <div className="space-y-3">
                {[
                  {
                    action: "Cancelled Netflix subscription",
                    time: "2 hours ago",
                    type: "cancel",
                  },
                  {
                    action: "Added Spotify Premium",
                    time: "1 day ago",
                    type: "add",
                  },
                  {
                    action: "AI recommended Disney+ bundle",
                    time: "3 days ago",
                    type: "recommendation",
                  },
                  {
                    action: "Updated notification preferences",
                    time: "1 week ago",
                    type: "settings",
                  },
                ]?.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity?.type === "cancel"
                          ? "bg-error/20"
                          : activity?.type === "add"
                          ? "bg-success/20"
                          : activity?.type === "recommendation"
                          ? "bg-primary/20"
                          : "bg-secondary/20"
                      }`}
                    >
                      <Icon
                        name={
                          activity?.type === "cancel"
                            ? "X"
                            : activity?.type === "add"
                            ? "Plus"
                            : activity?.type === "recommendation"
                            ? "Lightbulb"
                            : "Settings"
                        }
                        size={16}
                        className={
                          activity?.type === "cancel"
                            ? "text-error"
                            : activity?.type === "add"
                            ? "text-success"
                            : activity?.type === "recommendation"
                            ? "text-primary"
                            : "text-secondary"
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {activity?.action}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity?.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "account":
        return (
          <AccountSettings
            settings={accountSettings}
            onUpdateSettings={handleUpdateAccountSettings}
          />
        );

      case "notifications":
        return (
          <NotificationSettings
            settings={notificationSettings}
            onUpdateSettings={handleUpdateNotificationSettings}
          />
        );

      case "ai":
        return (
          <AISettings
            settings={aiSettings}
            onUpdateSettings={handleUpdateAISettings}
          />
        );

      case "security":
        return (
          <SecuritySettings
            settings={securitySettings}
            onUpdateSettings={handleUpdateSecuritySettings}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl floating-orb-1"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl floating-orb-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl floating-orb-3"></div>
      </div>

      <main className="relative pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={20} className="text-black" />
              </div>
              <h1 className="text-3xl font-bold text-foreground text-glow-primary">
                Profile Settings
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage your account preferences, notification settings, and AI
              learning parameters
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <SettingsNavigation
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div
                className={`transition-all duration-300 ${
                  isLoading ? "opacity-50" : "opacity-100"
                }`}
              >
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
