import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import { Checkbox } from "../../../components/ui/Checkbox";
import Select from "../../../components/ui/Select";

const NotificationSettings = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleToggle = (category, key) => {
    const updated = {
      ...localSettings,
      [category]: {
        ...localSettings?.[category],
        [key]: !localSettings?.[category]?.[key],
      },
    };
    setLocalSettings(updated);
    onUpdateSettings(updated);
  };

  const handleFrequencyChange = (category, frequency) => {
    const updated = {
      ...localSettings,
      [category]: {
        ...localSettings?.[category],
        frequency,
      },
    };
    setLocalSettings(updated);
    onUpdateSettings(updated);
  };

  const frequencyOptions = [
    { value: "instant", label: "Instant" },
    { value: "daily", label: "Daily Digest" },
    { value: "weekly", label: "Weekly Summary" },
    { value: "never", label: "Never" },
  ];

  const NotificationCategory = ({
    title,
    icon,
    category,
    items,
    showFrequency = false,
  }) => (
    <div className="glass-card rounded-lg p-4 border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name={icon} size={16} className="text-black" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>

      <div className="space-y-3">
        {items?.map((item) => (
          <div key={item?.key} className="flex items-start justify-between">
            <div className="flex-1">
              <Checkbox
                label={item?.label}
                description={item?.description}
                checked={localSettings?.[category]?.[item?.key]}
                onChange={() => handleToggle(category, item?.key)}
                className="mb-0"
              />
            </div>
          </div>
        ))}

        {showFrequency && (
          <div className="pt-3 border-t border-border">
            <Select
              label="Notification Frequency"
              options={frequencyOptions}
              value={localSettings?.[category]?.frequency}
              onChange={(value) => handleFrequencyChange(category, value)}
              className="mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Notification Preferences
          </h2>
          <p className="text-muted-foreground">
            Customize how and when you receive notifications
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={16} className="text-primary" />
          <span className="text-sm text-primary font-medium">
            Smart Notifications Enabled
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        <NotificationCategory
          title="Subscription Alerts"
          icon="CreditCard"
          category="subscriptions"
          showFrequency={true}
          items={[
            {
              key: "renewals",
              label: "Renewal Reminders",
              description: "Get notified before subscriptions renew",
            },
            {
              key: "priceChanges",
              label: "Price Change Alerts",
              description: "Alert when subscription prices increase",
            },
            {
              key: "unusedServices",
              label: "Unused Service Warnings",
              description:
                "Notify about subscriptions you haven't used recently",
            },
            {
              key: "duplicateServices",
              label: "Duplicate Service Detection",
              description: "Alert when you have similar overlapping services",
            },
          ]}
        />

        <NotificationCategory
          title="AI Recommendations"
          icon="Brain"
          category="ai"
          showFrequency={true}
          items={[
            {
              key: "savingsOpportunities",
              label: "Savings Opportunities",
              description: "AI-powered suggestions to reduce spending",
            },
            {
              key: "bundleRecommendations",
              label: "Bundle Recommendations",
              description: "Suggestions for better subscription bundles",
            },
            {
              key: "alternativeServices",
              label: "Alternative Services",
              description: "Recommendations for cheaper alternatives",
            },
            {
              key: "usageInsights",
              label: "Usage Pattern Insights",
              description: "Analysis of your subscription usage patterns",
            },
          ]}
        />

        <NotificationCategory
          title="Security & Account"
          icon="Shield"
          category="security"
          items={[
            {
              key: "loginAlerts",
              label: "Login Alerts",
              description: "Notify about new device logins",
            },
            {
              key: "passwordChanges",
              label: "Password Changes",
              description: "Confirm password and security changes",
            },
            {
              key: "dataExports",
              label: "Data Export Completion",
              description: "Notify when data exports are ready",
            },
            {
              key: "privacyUpdates",
              label: "Privacy Policy Updates",
              description: "Important privacy and terms updates",
            },
          ]}
        />

        <NotificationCategory
          title="Marketing & Updates"
          icon="Megaphone"
          category="marketing"
          items={[
            {
              key: "productUpdates",
              label: "Product Updates",
              description: "New features and improvements",
            },
            {
              key: "tips",
              label: "Money-Saving Tips",
              description: "Weekly tips to optimize your subscriptions",
            },
            {
              key: "newsletters",
              label: "Newsletter",
              description: "Monthly insights and industry trends",
            },
            {
              key: "surveys",
              label: "Feedback Requests",
              description: "Occasional surveys to improve our service",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
