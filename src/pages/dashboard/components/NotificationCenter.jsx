import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const NotificationCenter = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const [filter, setFilter] = useState("all");

  const getNotificationIcon = (type) => {
    switch (type) {
      case "renewal":
        return "Calendar";
      case "price_change":
        return "TrendingUp";
      case "usage_alert":
        return "AlertTriangle";
      case "savings":
        return "PiggyBank";
      case "recommendation":
        return "Lightbulb";
      default:
        return "Bell";
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === "high") return "border-l-error";
    switch (type) {
      case "renewal":
        return "border-l-warning";
      case "price_change":
        return "border-l-error";
      case "usage_alert":
        return "border-l-warning";
      case "savings":
        return "border-l-success";
      case "recommendation":
        return "border-l-primary";
      default:
        return "border-l-muted";
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredNotifications = notifications?.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification?.read;
    return notification?.type === filter;
  });

  const unreadCount = notifications?.filter((n) => !n?.read)?.length;

  return (
    <div className="glass-card rounded-xl p-6 hover-glow-primary transition-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <div className="w-6 h-6 bg-error rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {unreadCount}
              </span>
            </div>
          )}
        </div>

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            iconName="CheckCheck"
            onClick={onMarkAllAsRead}
            className="text-muted-foreground hover:text-foreground"
          >
            Mark all read
          </Button>
        )}
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 p-1 bg-muted/20 rounded-lg">
        {["all", "unread", "renewal", "savings"]?.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 capitalize ${
              filter === filterType
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              name="Bell"
              size={48}
              className="text-muted-foreground mx-auto mb-3"
            />
            <p className="text-muted-foreground">No notifications found</p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`glass rounded-lg p-4 border-l-4 ${getNotificationColor(
                notification?.type,
                notification?.priority
              )} ${
                !notification?.read ? "bg-primary/5" : ""
              } hover:bg-muted/20 transition-all duration-300 cursor-pointer`}
              onClick={() => onMarkAsRead(notification?.id)}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    notification?.priority === "high"
                      ? "bg-error/20"
                      : notification?.type === "savings"
                      ? "bg-success/20"
                      : "bg-primary/20"
                  }`}
                >
                  <Icon
                    name={getNotificationIcon(notification?.type)}
                    size={16}
                    className={
                      notification?.priority === "high"
                        ? "text-error"
                        : notification?.type === "savings"
                        ? "text-success"
                        : "text-primary"
                    }
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`font-medium ${
                        !notification?.read
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {notification?.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(notification?.timestamp)}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {notification?.message}
                  </p>

                  {notification?.action && (
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="right"
                        className="text-xs"
                      >
                        {notification?.action}
                      </Button>
                    </div>
                  )}
                </div>

                {!notification?.read && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
