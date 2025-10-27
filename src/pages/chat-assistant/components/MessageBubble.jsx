import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const MessageBubble = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow-primary">
          <Icon name="Bot" size={20} className="text-black" />
        </div>
        <div className="flex-1">
          <div className="glass-card rounded-2xl rounded-tl-sm p-4 max-w-md border border-primary/20">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start space-x-3 mb-6 ${
        isUser ? "flex-row-reverse space-x-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? "bg-gradient-to-br from-secondary to-accent"
            : "bg-gradient-to-br from-primary to-secondary neon-glow-primary"
        }`}
      >
        <Icon
          name={isUser ? "User" : "Bot"}
          size={20}
          className={isUser ? "text-white" : "text-black"}
        />
      </div>
      {/* Message Content */}
      <div className="flex-1 max-w-2xl">
        <div
          className={`glass-card rounded-2xl p-4 border transition-all duration-300 hover-glow-primary ${
            isUser
              ? "rounded-tr-sm bg-secondary/10 border-secondary/30"
              : "rounded-tl-sm border-primary/20"
          }`}
        >
          {/* Message Text */}
          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {message?.content}
          </div>

          {/* Attachments */}
          {message?.attachment && (
            <div className="mt-3 pt-3 border-t border-border/50">
              {message?.attachment?.type === "image" && (
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={message?.attachment?.url}
                    alt={message?.attachment?.alt}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {message?.attachment?.type === "chart" && (
                <div className="glass-card rounded-lg p-4 border border-accent/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="BarChart3" size={16} className="text-accent" />
                    <span className="text-sm font-medium text-accent">
                      {message?.attachment?.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {message?.attachment?.description}
                  </p>
                </div>
              )}

              {message?.attachment?.type === "suggestion" && (
                <div className="space-y-2">
                  {message?.attachment?.suggestions?.map(
                    (suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-3 rounded-lg glass border border-primary/20 hover:border-primary/40 transition-all duration-300 hover-glow-primary"
                      >
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="Lightbulb"
                            size={16}
                            className="text-accent"
                          />
                          <span className="text-sm font-medium text-foreground">
                            {suggestion?.title}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {suggestion?.description}
                        </p>
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          {message?.quickActions && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                {message?.quickActions?.map((action, index) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div
          className={`mt-2 text-xs text-muted-foreground ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
