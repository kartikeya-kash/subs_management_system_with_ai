import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AnalyticsHeader = ({ onExportReport, onRefreshData, lastUpdated }) => {
  return (
    <div className="glass-card rounded-xl p-6 border border-primary/20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center neon-glow-primary">
            <Icon name="Brain" size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground text-glow-primary">
              AI Analytics Laboratory
            </h1>
            <p className="text-muted-foreground">
              Deep insights powered by artificial intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRefreshData}
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            Refresh
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={onExportReport}
            className="neon-pulse"
          >
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
