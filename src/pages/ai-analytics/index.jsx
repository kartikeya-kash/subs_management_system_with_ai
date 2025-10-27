import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Brain,
  ArrowRight,
} from "lucide-react";
import Header from "../../components/ui/Header";

const AIAnalytics = () => {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState("");

  // Simplified spending data - only current month
  const currentSpending = 1450;
  const previousSpending = 1320;
  const monthlyChange = (
    ((currentSpending - previousSpending) / previousSpending) *
    100
  )?.toFixed(1);
  const isIncreasing = monthlyChange > 0;

  // Top 3 AI insights only
  const topInsights = [
    {
      id: 1,
      type: "savings",
      title: "Netflix Usage Optimization",
      description: "Switch to Basic plan - you rarely use 4K features",
      potentialSavings: 8,
      confidence: 92,
    },
    {
      id: 2,
      type: "duplicate",
      title: "Duplicate Music Services",
      description: "Cancel either Spotify or Apple Music",
      potentialSavings: 15,
      confidence: 98,
    },
    {
      id: 3,
      type: "optimization",
      title: "Adobe Bundle Opportunity",
      description: "Bundle saves more than separate subscriptions",
      potentialSavings: 25,
      confidence: 85,
    },
  ];

  useEffect(() => {
    const now = new Date();
    setLastUpdated(
      now?.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  const handleImplementRecommendation = (insightId) => {
    navigate("/subscription-manager");
  };

  const handleViewAllAnalytics = () => {
    // Could navigate to a detailed analytics view in the future
    console.log("View detailed analytics");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            {/* Simple Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-text-primary">
                AI Analytics
              </h1>
              <p className="text-text-secondary">
                Smart insights for your subscriptions
              </p>
            </div>

            {/* Main Spending Card */}
            <div className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">
                      Monthly Spending
                    </h2>
                    <p className="text-text-secondary text-sm">October 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-text-primary">
                    ${currentSpending}
                  </div>
                  <div
                    className={`flex items-center space-x-1 ${
                      isIncreasing ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {isIncreasing ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {isIncreasing ? "+" : "-"}
                      {Math.abs(monthlyChange)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">
                    AI Recommendations
                  </h2>
                  <p className="text-text-secondary text-sm">
                    Potential savings: $48/month
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {topInsights?.map((insight) => (
                  <div
                    key={insight?.id}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary mb-1">
                        {insight?.title}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {insight?.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-green-500 font-medium text-sm">
                          Save ${insight?.potentialSavings}/mo
                        </span>
                        <span className="text-text-muted text-xs">
                          {insight?.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleImplementRecommendation(insight?.id)}
                      className="ml-4 p-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border/50 text-center">
                <button
                  onClick={handleViewAllAnalytics}
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  View detailed analytics →
                </button>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center">
              <p className="text-text-muted text-xs">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAnalytics;
