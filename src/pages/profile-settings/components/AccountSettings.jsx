import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";

const AccountSettings = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isEditing, setIsEditing] = useState({});

  const handleEdit = (section) => {
    setIsEditing({ ...isEditing, [section]: !isEditing?.[section] });
  };

  const handleSave = (section) => {
    onUpdateSettings(localSettings);
    setIsEditing({ ...isEditing, [section]: false });
  };

  const handleInputChange = (key, value) => {
    setLocalSettings({ ...localSettings, [key]: value });
  };

  const timezoneOptions = [
    { value: "UTC-8", label: "Pacific Time (UTC-8)" },
    { value: "UTC-7", label: "Mountain Time (UTC-7)" },
    { value: "UTC-6", label: "Central Time (UTC-6)" },
    { value: "UTC-5", label: "Eastern Time (UTC-5)" },
    { value: "UTC+0", label: "Greenwich Mean Time (UTC+0)" },
    { value: "UTC+1", label: "Central European Time (UTC+1)" },
    { value: "UTC+5:30", label: "India Standard Time (UTC+5:30)" },
    { value: "UTC+8", label: "China Standard Time (UTC+8)" },
  ];

  const currencyOptions = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
    { value: "INR", label: "Indian Rupee (₹)" },
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
  ];

  const SettingSection = ({
    title,
    icon,
    children,
    sectionKey,
    editable = true,
  }) => (
    <div className="glass-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name={icon} size={16} className="text-black" />
          </div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        {editable && (
          <Button
            variant="ghost"
            iconName={isEditing?.[sectionKey] ? "Check" : "Edit"}
            iconPosition="left"
            onClick={() =>
              isEditing?.[sectionKey]
                ? handleSave(sectionKey)
                : handleEdit(sectionKey)
            }
          >
            {isEditing?.[sectionKey] ? "Save" : "Edit"}
          </Button>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Account Settings
          </h2>
          <p className="text-muted-foreground">
            Manage your account preferences and personal information
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        {/* Personal Information */}
        <SettingSection
          title="Personal Information"
          icon="User"
          sectionKey="personal"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={localSettings?.firstName}
              onChange={(e) => handleInputChange("firstName", e?.target?.value)}
              disabled={!isEditing?.personal}
            />
            <Input
              label="Last Name"
              value={localSettings?.lastName}
              onChange={(e) => handleInputChange("lastName", e?.target?.value)}
              disabled={!isEditing?.personal}
            />
            <Input
              label="Email Address"
              type="email"
              value={localSettings?.email}
              onChange={(e) => handleInputChange("email", e?.target?.value)}
              disabled={!isEditing?.personal}
              className="md:col-span-2"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={localSettings?.phone}
              onChange={(e) => handleInputChange("phone", e?.target?.value)}
              disabled={!isEditing?.personal}
            />
            <Input
              label="Date of Birth"
              type="date"
              value={localSettings?.dateOfBirth}
              onChange={(e) =>
                handleInputChange("dateOfBirth", e?.target?.value)
              }
              disabled={!isEditing?.personal}
            />
          </div>
        </SettingSection>

        {/* Address Information */}
        <SettingSection
          title="Address Information"
          icon="MapPin"
          sectionKey="address"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Street Address"
              value={localSettings?.streetAddress}
              onChange={(e) =>
                handleInputChange("streetAddress", e?.target?.value)
              }
              disabled={!isEditing?.address}
              className="md:col-span-2"
            />
            <Input
              label="City"
              value={localSettings?.city}
              onChange={(e) => handleInputChange("city", e?.target?.value)}
              disabled={!isEditing?.address}
            />
            <Input
              label="State/Province"
              value={localSettings?.state}
              onChange={(e) => handleInputChange("state", e?.target?.value)}
              disabled={!isEditing?.address}
            />
            <Input
              label="ZIP/Postal Code"
              value={localSettings?.zipCode}
              onChange={(e) => handleInputChange("zipCode", e?.target?.value)}
              disabled={!isEditing?.address}
            />
            <Input
              label="Country"
              value={localSettings?.country}
              onChange={(e) => handleInputChange("country", e?.target?.value)}
              disabled={!isEditing?.address}
            />
          </div>
        </SettingSection>

        {/* Preferences */}
        <SettingSection
          title="Preferences"
          icon="Settings"
          sectionKey="preferences"
        >
          <div className="grid gap-4">
            <Select
              label="Timezone"
              options={timezoneOptions}
              value={localSettings?.timezone}
              onChange={(value) => handleInputChange("timezone", value)}
              disabled={!isEditing?.preferences}
            />
            <Select
              label="Currency"
              options={currencyOptions}
              value={localSettings?.currency}
              onChange={(value) => handleInputChange("currency", value)}
              disabled={!isEditing?.preferences}
            />
            <Select
              label="Language"
              options={languageOptions}
              value={localSettings?.language}
              onChange={(value) => handleInputChange("language", value)}
              disabled={!isEditing?.preferences}
            />
          </div>
        </SettingSection>

        {/* Subscription Preferences */}
        <SettingSection
          title="Subscription Preferences"
          icon="CreditCard"
          sectionKey="subscriptions"
          editable={false}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="DollarSign" size={16} className="text-accent" />
                  <span className="font-medium text-foreground">
                    Monthly Budget
                  </span>
                </div>
                <div className="text-2xl font-bold text-accent">
                  ${localSettings?.monthlyBudget}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current subscription budget
                </p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-primary" />
                  <span className="font-medium text-foreground">
                    Savings Goal
                  </span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {localSettings?.savingsGoal}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Target savings percentage
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Auto-cancel unused subscriptions"
                description="Automatically suggest cancellation for unused services after 60 days"
                checked={localSettings?.autoCancelUnused}
                onChange={(e) =>
                  handleInputChange("autoCancelUnused", e?.target?.checked)
                }
              />
              <Checkbox
                label="Smart bundling suggestions"
                description="Get recommendations for better subscription bundles"
                checked={localSettings?.smartBundling}
                onChange={(e) =>
                  handleInputChange("smartBundling", e?.target?.checked)
                }
              />
              <Checkbox
                label="Price drop alerts"
                description="Notify when subscription prices decrease"
                checked={localSettings?.priceDropAlerts}
                onChange={(e) =>
                  handleInputChange("priceDropAlerts", e?.target?.checked)
                }
              />
              <Checkbox
                label="Annual payment reminders"
                description="Suggest switching to annual plans for better savings"
                checked={localSettings?.annualPaymentReminders}
                onChange={(e) =>
                  handleInputChange(
                    "annualPaymentReminders",
                    e?.target?.checked
                  )
                }
              />
            </div>
          </div>
        </SettingSection>

        {/* Billing Information */}
        <SettingSection
          title="Billing Information"
          icon="Receipt"
          sectionKey="billing"
        >
          <div className="space-y-4">
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon name="CreditCard" size={20} className="text-primary" />
                  <div>
                    <div className="font-medium text-foreground">
                      Premium Plan
                    </div>
                    <div className="text-sm text-muted-foreground">
                      $19.99/month • Next billing: Nov 27, 2025
                    </div>
                  </div>
                </div>
                <Button variant="outline" iconName="Edit" iconPosition="left">
                  Manage Plan
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-foreground">
                    Unlimited
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Subscriptions
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">
                    Advanced
                  </div>
                  <div className="text-xs text-muted-foreground">
                    AI Analytics
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">
                    Priority
                  </div>
                  <div className="text-xs text-muted-foreground">Support</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                fullWidth
                className="border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                Download Invoice
              </Button>
              <Button
                variant="outline"
                iconName="History"
                iconPosition="left"
                fullWidth
                className="border-secondary/30 hover:border-secondary hover:bg-secondary/10"
              >
                Billing History
              </Button>
            </div>
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

export default AccountSettings;
