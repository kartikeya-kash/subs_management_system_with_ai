import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ConversationHistory = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate?.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 168) {
      // 7 days
      return messageDate?.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return messageDate?.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const truncateTitle = (title, maxLength = 30) => {
    return title?.length > maxLength
      ? `${title?.substring(0, maxLength)}...`
      : title;
  };

  return (
    <div
      className={`glass-card border border-primary/20 transition-all duration-300 ${
        isExpanded ? "rounded-xl" : "rounded-2xl"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Chat History</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNewConversation}
            className="text-muted-foreground hover:text-primary"
          >
            <Icon name="Plus" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-primary"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Conversation List */}
      {isExpanded && (
        <div className="max-h-80 overflow-y-auto">
          {conversations?.length === 0 ? (
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon
                  name="MessageSquare"
                  size={24}
                  className="text-muted-foreground"
                />
              </div>
              <p className="text-muted-foreground text-sm">
                No conversations yet
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Start chatting to see your history here
              </p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {conversations?.map((conversation) => (
                <div
                  key={conversation?.id}
                  className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    currentConversationId === conversation?.id
                      ? "bg-primary/20 border border-primary/30"
                      : "hover:bg-muted/20"
                  }`}
                  onClick={() => onSelectConversation(conversation?.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          conversation?.hasUnread
                            ? "bg-accent"
                            : "bg-muted-foreground/30"
                        }`}
                      ></div>
                      <h4
                        className={`font-medium truncate ${
                          currentConversationId === conversation?.id
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {truncateTitle(conversation?.title)}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {conversation?.messageCount} messages
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(conversation?.lastActivity)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onDeleteConversation(conversation?.id);
                      }}
                      className="w-6 h-6 text-muted-foreground hover:text-error"
                    >
                      <Icon name="Trash2" size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Quick Stats */}
      {!isExpanded && conversations?.length > 0 && (
        <div className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {conversations?.length} conversation
              {conversations?.length !== 1 ? "s" : ""}
            </span>
            <span className="text-muted-foreground">
              {conversations?.filter((c) => c?.hasUnread)?.length} unread
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationHistory;
