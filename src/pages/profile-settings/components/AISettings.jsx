import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";
import Button from "../../../components/ui/Button";

const AISettings = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSettingChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onUpdateSettings(updated);
  };

  const handleToggle = (key) => {
    const updated = { ...localSettings, [key]: !localSettings?.[key] };
    setLocalSettings(updated);
    onUpdateSettings(updated);
  };

  const personalityOptions = [
    {
      value: "conservative",
      label: "Conservative",
      description: "Cautious recommendations focused on security",
    },
    {
      value: "balanced",
      label: "Balanced",
      description: "Mix of savings and convenience",
    },
    {
      value: "aggressive",
      label: "Aggressive",
      description: "Maximum savings opportunities",
    },
    {
      value: "custom",
      label: "Custom",
      description: "Personalized based on your behavior",
    },
  ];

  const analysisDepthOptions = [
    { value: "basic", label: "Basic Analysis" },
    { value: "standard", label: "Standard Analysis" },
    { value: "deep", label: "Deep Analysis" },
    { value: "comprehensive", label: "Comprehensive Analysis" },
  ];

  const recommendationFrequencyOptions = [
    { value: "realtime", label: "Real-time" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            AI Learning Parameters
          </h2>
          <p className="text-muted-foreground">
            Customize how AI analyzes your spending and provides recommendations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-sm text-accent font-medium">
            AI Learning Active
          </span>
        </div>
      </div>
      <div className="grid gap-6">
        {/* AI Personality */}
        <div className="glass-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Bot" size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Personality</h3>
              <p className="text-sm text-muted-foreground">
                How aggressive should AI be with recommendations?
              </p>
            </div>
          </div>

          <Select
            label="Recommendation Style"
            options={personalityOptions}
            value={localSettings?.personality}
            onChange={(value) => handleSettingChange("personality", value)}
            className="mb-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingDown" size={16} className="text-accent" />
                <span className="font-medium text-foreground">
                  Current Savings Rate
                </span>
              </div>
              <div className="text-2xl font-bold text-accent">
                {localSettings?.currentSavingsRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                Based on implemented recommendations
              </p>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-primary" />
                <span className="font-medium text-foreground">
                  Savings Target
                </span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {localSettings?.savingsTarget}%
              </div>
              <p className="text-xs text-muted-foreground">
                Your monthly savings goal
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Settings */}
        <div className="glass-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={16} className="text-black" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Analysis Depth</h3>
              <p className="text-sm text-muted-foreground">
                How detailed should AI analysis be?
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <Select
              label="Analysis Level"
              options={analysisDepthOptions}
              value={localSettings?.analysisDepth}
              onChange={(value) => handleSettingChange("analysisDepth", value)}
            />

            <Select
              label="Recommendation Frequency"
              options={recommendationFrequencyOptions}
              value={localSettings?.recommendationFrequency}
              onChange={(value) =>
                handleSettingChange("recommendationFrequency", value)
              }
            />
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="glass-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={16} className="text-black" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Learning Preferences
              </h3>
              <p className="text-sm text-muted-foreground">
                What data should AI use for learning?
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Checkbox
              label="Usage Pattern Analysis"
              description="Allow AI to analyze when and how you use subscriptions"
              checked={localSettings?.usagePatternAnalysis}
              onChange={() => handleToggle("usagePatternAnalysis")}
            />

            <Checkbox
              label="Spending Behavior Learning"
              description="Let AI learn from your spending patterns and preferences"
              checked={localSettings?.spendingBehaviorLearning}
              onChange={() => handleToggle("spendingBehaviorLearning")}
            />

            <Checkbox
              label="Cross-Platform Integration"
              description="Analyze data from connected bank accounts and credit cards"
              checked={localSettings?.crossPlatformIntegration}
              onChange={() => handleToggle("crossPlatformIntegration")}
            />

            <Checkbox
              label="Predictive Modeling"
              description="Use historical data to predict future subscription needs"
              checked={localSettings?.predictiveModeling}
              onChange={() => handleToggle("predictiveModeling")}
            />

            <Checkbox
              label="Seasonal Adjustments"
              description="Consider seasonal spending patterns in recommendations"
              checked={localSettings?.seasonalAdjustments}
              onChange={() => handleToggle("seasonalAdjustments")}
            />
          </div>
        </div>

        {/* AI Training Data */}
        <div className="glass-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-warning to-error rounded-lg flex items-center justify-center">
                <Icon name="Database" size={16} className="text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Training Data Management
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage AI learning data and model retraining
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              className="border-warning/30 hover:border-warning hover:bg-warning/10"
            >
              Reset AI Model
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/20 rounded-lg text-center">
              <div className="text-lg font-bold text-foreground">
                {localSettings?.trainingDataPoints}
              </div>
              <div className="text-xs text-muted-foreground">
                Data Points Collected
              </div>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg text-center">
              <div className="text-lg font-bold text-foreground">
                {localSettings?.modelAccuracy}%
              </div>
              <div className="text-xs text-muted-foreground">
                Model Accuracy
              </div>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg text-center">
              <div className="text-lg font-bold text-foreground">
                {localSettings?.lastTraining}
              </div>
              <div className="text-xs text-muted-foreground">Last Training</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettings;
