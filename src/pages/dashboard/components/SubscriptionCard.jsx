import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const SubscriptionCard = ({ subscription, onManage, onCancel }) => {
  const getDaysUntilRenewal = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-success";
      case "expiring":
        return "text-warning";
      case "cancelled":
        return "text-error";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return "CheckCircle";
      case "expiring":
        return "AlertTriangle";
      case "cancelled":
        return "XCircle";
      default:
        return "Circle";
    }
  };

  const daysUntilRenewal = getDaysUntilRenewal(subscription?.nextBilling);
  const isExpiringSoon = daysUntilRenewal <= 7 && daysUntilRenewal > 0;

  return (
    <div
      className={`glass-card rounded-xl p-4 transition-glow ${
        isExpiringSoon
          ? "border-warning/50 hover-glow-secondary"
          : "hover-glow-primary"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted/30">
            <Image
              src={subscription?.logo}
              alt={subscription?.logoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              {subscription?.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {subscription?.category}
            </p>
          </div>
        </div>

        <div
          className={`flex items-center space-x-1 ${getStatusColor(
            subscription?.status
          )}`}
        >
          <Icon name={getStatusIcon(subscription?.status)} size={16} />
          <span className="text-xs font-medium capitalize">
            {subscription?.status}
          </span>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Monthly Cost</span>
          <span className="font-semibold text-foreground">
            ${subscription?.cost}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Next Billing</span>
          <span
            className={`text-sm font-medium ${
              isExpiringSoon ? "text-warning" : "text-foreground"
            }`}
          >
            {daysUntilRenewal > 0 ? `${daysUntilRenewal} days` : "Today"}
          </span>
        </div>

        {subscription?.usage && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Usage</span>
            <span className="text-sm text-foreground">
              {subscription?.usage}%
            </span>
          </div>
        )}
      </div>
      {subscription?.usage && (
        <div className="mb-4">
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                subscription?.usage > 80
                  ? "bg-gradient-to-r from-success to-accent"
                  : subscription?.usage > 50
                  ? "bg-gradient-to-r from-warning to-primary"
                  : "bg-gradient-to-r from-error to-warning"
              }`}
              style={{ width: `${subscription?.usage}%` }}
            ></div>
          </div>
        </div>
      )}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          onClick={() => onManage(subscription?.id)}
          className="flex-1"
        >
          Manage
        </Button>

        {subscription?.status === "active" && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={() => onCancel(subscription?.id)}
            className="text-error hover:text-error hover:bg-error/10"
          ></Button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
