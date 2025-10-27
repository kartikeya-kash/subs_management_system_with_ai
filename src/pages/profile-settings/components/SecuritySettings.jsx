import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";
import Select from "../../../components/ui/Select";

const SecuritySettings = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);

  const handleToggle = (key) => {
    const updated = { ...localSettings, [key]: !localSettings?.[key] };
    setLocalSettings(updated);
    onUpdateSettings(updated);
  };

  const sessionTimeoutOptions = [
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "240", label: "4 hours" },
    { value: "480", label: "8 hours" },
    { value: "never", label: "Never" },
  ];

  const SecurityCard = ({
    title,
    icon,
    children,
    status,
    statusColor = "success",
  }) => (
    <div className="glass-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name={icon} size={16} className="text-black" />
          </div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        {status && (
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-${statusColor}/20 border border-${statusColor}/30`}
          >
            <div className={`w-2 h-2 bg-${statusColor} rounded-full`}></div>
            <span className={`text-xs font-medium text-${statusColor}`}>
              {status}
            </span>
          </div>
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
            Security & Privacy
          </h2>
          <p className="text-muted-foreground">
            Manage your account security and privacy settings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">
            Bank-Level Security
          </span>
        </div>
      </div>
      <div className="grid gap-6">
        {/* Password Security */}
        <SecurityCard
          title="Password & Authentication"
          icon="Lock"
          status="Strong"
          statusColor="success"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div>
                <div className="font-medium text-foreground">Password</div>
                <div className="text-sm text-muted-foreground">
                  Last changed 3 months ago
                </div>
              </div>
              <Button
                variant="outline"
                iconName="Edit"
                iconPosition="left"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                Change Password
              </Button>
            </div>

            {showPasswordForm && (
              <div className="space-y-4 p-4 border border-border rounded-lg">
                <Input
                  type="password"
                  label="Current Password"
                  placeholder="Enter current password"
                />
                <Input
                  type="password"
                  label="New Password"
                  placeholder="Enter new password"
                />
                <Input
                  type="password"
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                />
                <div className="flex space-x-3">
                  <Button variant="default">Update Password</Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <Select
              label="Session Timeout"
              description="Automatically log out after period of inactivity"
              options={sessionTimeoutOptions}
              value={localSettings?.sessionTimeout}
              onChange={(value) =>
                setLocalSettings({ ...localSettings, sessionTimeout: value })
              }
            />
          </div>
        </SecurityCard>

        {/* Two-Factor Authentication */}
        <SecurityCard
          title="Two-Factor Authentication"
          icon="Smartphone"
          status={localSettings?.twoFactorEnabled ? "Enabled" : "Disabled"}
          statusColor={localSettings?.twoFactorEnabled ? "success" : "warning"}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">
                  Authenticator App
                </div>
                <div className="text-sm text-muted-foreground">
                  {localSettings?.twoFactorEnabled
                    ? "Protected with authenticator app"
                    : "Add an extra layer of security"}
                </div>
              </div>
              <Button
                variant={
                  localSettings?.twoFactorEnabled ? "outline" : "default"
                }
                iconName={localSettings?.twoFactorEnabled ? "Settings" : "Plus"}
                iconPosition="left"
                onClick={() => setShow2FASetup(!show2FASetup)}
              >
                {localSettings?.twoFactorEnabled ? "Manage" : "Setup 2FA"}
              </Button>
            </div>

            {show2FASetup && (
              <div className="p-4 border border-border rounded-lg">
                <div className="text-center mb-4">
                  <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-xs text-black font-mono">
                      QR CODE\nPLACEHOLDER
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code with your authenticator app
                  </p>
                </div>
                <Input
                  label="Verification Code"
                  placeholder="Enter 6-digit code"
                  className="mb-4"
                />
                <div className="flex space-x-3">
                  <Button variant="default">Verify & Enable</Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShow2FASetup(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Checkbox
                label="SMS Backup"
                description="Receive backup codes via SMS when authenticator is unavailable"
                checked={localSettings?.smsBackup}
                onChange={() => handleToggle("smsBackup")}
              />
              <Checkbox
                label="Email Backup"
                description="Send backup authentication codes to your email"
                checked={localSettings?.emailBackup}
                onChange={() => handleToggle("emailBackup")}
              />
            </div>
          </div>
        </SecurityCard>

        {/* Login Activity */}
        <SecurityCard
          title="Login Activity"
          icon="Activity"
          status="Monitored"
          statusColor="primary"
        >
          <div className="space-y-4">
            <Checkbox
              label="Login Notifications"
              description="Get notified when someone logs into your account"
              checked={localSettings?.loginNotifications}
              onChange={() => handleToggle("loginNotifications")}
            />

            <div className="space-y-3">
              <div className="font-medium text-foreground">
                Recent Login Activity
              </div>
              {localSettings?.recentLogins?.map((login, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={
                        login?.device === "desktop" ? "Monitor" : "Smartphone"
                      }
                      size={16}
                      className="text-muted-foreground"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {login?.location}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {login?.device} • {login?.browser}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-foreground">{login?.time}</div>
                    <div className="text-xs text-muted-foreground">
                      {login?.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SecurityCard>

        {/* Privacy Controls */}
        <SecurityCard
          title="Privacy Controls"
          icon="Eye"
          status="Protected"
          statusColor="success"
        >
          <div className="space-y-4">
            <Checkbox
              label="Data Analytics"
              description="Allow anonymous usage analytics to improve the service"
              checked={localSettings?.dataAnalytics}
              onChange={() => handleToggle("dataAnalytics")}
            />
            <Checkbox
              label="Marketing Communications"
              description="Receive product updates and promotional emails"
              checked={localSettings?.marketingCommunications}
              onChange={() => handleToggle("marketingCommunications")}
            />
            <Checkbox
              label="Third-party Integrations"
              description="Allow connections with external financial services"
              checked={localSettings?.thirdPartyIntegrations}
              onChange={() => handleToggle("thirdPartyIntegrations")}
            />
            <Checkbox
              label="Data Sharing for AI"
              description="Share anonymized data to improve AI recommendations"
              checked={localSettings?.dataSharingAI}
              onChange={() => handleToggle("dataSharingAI")}
            />
          </div>
        </SecurityCard>

        {/* Data Management */}
        <SecurityCard
          title="Data Management"
          icon="Database"
          status="Compliant"
          statusColor="primary"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                fullWidth
                className="border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                Export My Data
              </Button>
              <Button
                variant="outline"
                iconName="Trash2"
                iconPosition="left"
                fullWidth
                className="border-error/30 hover:border-error hover:bg-error/10"
              >
                Delete Account
              </Button>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="font-medium text-foreground">
                  Data Protection
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your data is encrypted with AES-256 encryption and stored in SOC
                2 compliant data centers. We never sell your personal
                information to third parties.
              </p>
            </div>
          </div>
        </SecurityCard>
      </div>
    </div>
  );
};

export default SecuritySettings;
