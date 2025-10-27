import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import MessageBubble from "./components/MessageBubble";
import QuickActions from "./components/QuickActions";
import ChatInput from "./components/ChatInput";
import ConversationHistory from "./components/ConversationHistory";
import AIStatus from "./components/AIStatus";

const ChatAssistant = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState("conv-1");
  const [showSidebar, setShowSidebar] = useState(false);

  // Mock conversation data
  const conversations = [
    {
      id: "conv-1",
      title: "Subscription Analysis Help",
      messageCount: 12,
      lastActivity: new Date(Date.now() - 300000), // 5 minutes ago
      hasUnread: false,
    },
    {
      id: "conv-2",
      title: "Netflix Cancellation Guide",
      messageCount: 8,
      lastActivity: new Date(Date.now() - 3600000), // 1 hour ago
      hasUnread: true,
    },
    {
      id: "conv-3",
      title: "Budget Optimization Tips",
      messageCount: 15,
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      hasUnread: false,
    },
  ];

  // Mock initial messages
  const initialMessages = [
    {
      id: 1,
      content: `Hello! I'm your SubSense AI assistant. I'm here to help you manage your subscriptions, analyze your spending patterns, and find ways to save money.\n\nI can help you with:\n• Analyzing your subscription spending\n• Finding potential savings opportunities\n• Setting up renewal reminders\n• Comparing subscription alternatives\n• Providing personalized financial advice\n\nWhat would you like to explore today?`,
      isUser: false,
      timestamp: new Date(Date.now() - 600000),
      quickActions: [
        "Analyze Spending",
        "Find Savings",
        "Upcoming Renewals",
        "Add Subscription",
      ],
    },
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (messageContent) => {
    const userMessage = {
      id: Date.now(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = generateAIResponse(messageContent);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      analyze: {
        content: `I've analyzed your subscription spending patterns. Here's what I found:\n\n📊 **Monthly Spending**: $127.50\n🎬 **Entertainment**: $45.99 (Netflix, Spotify, Disney+)\n💪 **Fitness**: $29.99 (Gym membership)\n📱 **Productivity**: $31.98 (Adobe, Microsoft 365)\n🍕 **Food Delivery**: $19.54 (DoorDash Plus)\n\n**Key Insights:**\n• You're spending 23% more than the average user\n• Your entertainment subscriptions have increased 40% this year\n• You have 2 unused subscriptions worth $15.98/month\n\nWould you like me to suggest some optimization strategies?`,
        attachment: {
          type: "chart",
          title: "Spending Breakdown",
          description: "Your subscription categories and costs",
        },
        quickActions: [
          "Show Savings Plan",
          "Cancel Unused",
          "Set Budget Alert",
        ],
      },
      savings: {
        content: `Great question! I've identified several ways you can save money on your subscriptions:\n\n💡 **Immediate Savings (Save $23.97/month)**:\n• Cancel unused Hulu subscription (-$7.99)\n• Downgrade Adobe plan to Photography only (-$15.98)\n\n🔄 **Alternative Options**:\n• Switch from Spotify to YouTube Music family plan (Save $4/month)\n• Bundle Disney+ with Hulu for $2.99 savings\n\n📅 **Timing Optimizations**:\n• Annual Netflix payment saves $15.88/year\n• Wait for Black Friday deals on software subscriptions\n\n**Total Potential Savings**: $287.64/year\n\nShould I help you implement any of these changes?`,
        attachment: {
          type: "suggestion",
          suggestions: [
            {
              title: "Cancel Hulu Subscription",
              description: "Save $7.99/month - Last watched 3 months ago",
            },
            {
              title: "Downgrade Adobe Plan",
              description: "Save $15.98/month - Switch to Photography plan",
            },
            {
              title: "Bundle Disney+ & Hulu",
              description: "Save $2.99/month - Combined package deal",
            },
          ],
        },
      },
      renewals: {
        content: `Here are your upcoming subscription renewals:\n\n🔴 **This Week**:\n• Netflix Premium - Tomorrow ($15.49)\n• Spotify Premium - Friday ($9.99)\n\n🟡 **Next Week**:\n• Adobe Creative Cloud - Dec 3rd ($52.99)\n• Gym Membership - Dec 5th ($29.99)\n\n🟢 **This Month**:\n• Microsoft 365 - Dec 15th ($6.99)\n• DoorDash Plus - Dec 20th ($9.99)\n\n**Total Upcoming**: $125.44\n\nI can set up smart reminders to notify you 3 days before each renewal so you can decide whether to continue, pause, or cancel. Would you like me to set these up?`,
        quickActions: [
          "Set All Reminders",
          "Cancel Netflix",
          "Pause Gym Membership",
        ],
      },
      default: {
        content: `I understand you're looking for help with your subscriptions. I can assist you with:\n\n🔍 **Analysis & Insights**\n• Spending pattern analysis\n• Usage tracking and optimization\n• Duplicate subscription detection\n\n💰 **Money-Saving Strategies**\n• Alternative service recommendations\n• Bundle optimization\n• Cancellation guidance\n\n📅 **Management Tools**\n• Renewal reminders and alerts\n• Budget tracking and limits\n• Subscription calendar planning\n\nWhat specific area would you like to explore? You can also try asking me questions like:\n• "How much am I spending on streaming services?"\n• "Which subscriptions should I cancel?"\n• "Show me cheaper alternatives to Adobe Creative Cloud"`,
        quickActions: [
          "Analyze My Spending",
          "Find Cheaper Alternatives",
          "Set Up Reminders",
        ],
      },
    };

    const messageKey =
      Object.keys(responses)?.find((key) =>
        userMessage?.toLowerCase()?.includes(key)
      ) || "default";

    return {
      id: Date.now() + 1,
      content: responses?.[messageKey]?.content,
      isUser: false,
      timestamp: new Date(),
      attachment: responses?.[messageKey]?.attachment,
      quickActions: responses?.[messageKey]?.quickActions,
    };
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      "analyze-spending": "Can you analyze my subscription spending patterns?",
      "find-savings": "Help me find ways to save money on my subscriptions",
      "upcoming-renewals": "Show me my upcoming subscription renewals",
      "add-subscription": "I want to add a new subscription to track",
      "budget-advice":
        "Give me personalized budgeting advice for subscriptions",
      "cancel-help": "Help me cancel some of my subscriptions",
    };

    const message = actionMessages?.[action?.id] || action?.title;
    handleSendMessage(message);
  };

  const handleNewConversation = () => {
    setMessages(initialMessages);
    setCurrentConversationId(`conv-${Date.now()}`);
  };

  const handleSelectConversation = (conversationId) => {
    setCurrentConversationId(conversationId);
    // In a real app, you would load the conversation messages here
    setMessages(initialMessages);
  };

  const handleDeleteConversation = (conversationId) => {
    // In a real app, you would delete the conversation here
    console.log("Delete conversation:", conversationId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating-orb-1"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl floating-orb-2"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl floating-orb-3"></div>
      </div>
      <div className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div
              className={`lg:col-span-1 space-y-6 ${
                showSidebar ? "block" : "hidden lg:block"
              }`}
            >
              {/* AI Status */}
              <AIStatus
                isOnline={true}
                isTyping={isTyping}
                lastSeen={new Date()}
              />

              {/* Conversation History */}
              <ConversationHistory
                conversations={conversations}
                currentConversationId={currentConversationId}
                onSelectConversation={handleSelectConversation}
                onNewConversation={handleNewConversation}
                onDeleteConversation={handleDeleteConversation}
              />

              {/* Quick Navigation */}
              <div className="glass-card rounded-xl p-4 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Navigation" size={18} className="text-primary" />
                  <span>Quick Navigation</span>
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="LayoutDashboard"
                    iconPosition="left"
                    onClick={() => navigate("/dashboard")}
                    className="justify-start"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="CreditCard"
                    iconPosition="left"
                    onClick={() => navigate("/subscription-manager")}
                    className="justify-start"
                  >
                    Subscriptions
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="Brain"
                    iconPosition="left"
                    onClick={() => navigate("/ai-analytics")}
                    className="justify-start"
                  >
                    AI Analytics
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-xl border border-primary/20 h-[calc(100vh-12rem)] flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSidebar(!showSidebar)}
                      className="lg:hidden text-muted-foreground hover:text-primary"
                    >
                      <Icon name="Menu" size={20} />
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground text-glow-primary">
                        AI Chat Assistant
                      </h1>
                      <p className="text-muted-foreground">
                        Your intelligent financial companion
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      iconName="RotateCcw"
                      iconSize={18}
                      onClick={handleNewConversation}
                      className="text-muted-foreground hover:text-primary"
                    >
                      New Chat
                    </Button>
                    <Button
                      variant="ghost"
                      iconName="Settings"
                      iconSize={18}
                      className="text-muted-foreground hover:text-primary"
                    />
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages?.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                      <QuickActions onActionClick={handleQuickAction} />
                    </div>
                  ) : (
                    <>
                      {messages?.map((message) => (
                        <MessageBubble
                          key={message?.id}
                          message={message}
                          isUser={message?.isUser}
                          timestamp={message?.timestamp}
                        />
                      ))}

                      {isTyping && <MessageBubble isTyping={true} />}

                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-6 border-t border-border/50">
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
