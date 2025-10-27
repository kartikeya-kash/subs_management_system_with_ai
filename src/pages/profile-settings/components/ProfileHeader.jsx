import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProfileHeader = ({ userProfile, onEditProfile, onUploadPhoto }) => {
  return (
    <div className="glass-card rounded-xl p-6 border border-primary/20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Profile Photo */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 hover-glow-primary transition-glow">
              <Image
                src={userProfile?.avatar}
                alt={userProfile?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={onUploadPhoto}
              className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Icon name="Camera" size={20} className="text-white" />
            </button>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center">
              <Icon name="Check" size={12} className="text-black" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground text-glow-primary mb-1">
              {userProfile?.name}
            </h1>
            <p className="text-muted-foreground mb-2">{userProfile?.email}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-primary font-medium">
                  {userProfile?.plan}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Calendar" size={14} />
                <span>Member since {userProfile?.memberSince}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>{userProfile?.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={onEditProfile}
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            Edit Profile
          </Button>
          <Button
            variant="default"
            iconName="Shield"
            iconPosition="left"
            className="neon-pulse"
          >
            Verify Account
          </Button>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {userProfile?.stats?.subscriptions}
          </div>
          <div className="text-xs text-muted-foreground">
            Active Subscriptions
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            ${userProfile?.stats?.monthlySavings}
          </div>
          <div className="text-xs text-muted-foreground">Monthly Savings</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">
            {userProfile?.stats?.aiRecommendations}
          </div>
          <div className="text-xs text-muted-foreground">
            AI Recommendations
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">
            {userProfile?.stats?.optimizationScore}%
          </div>
          <div className="text-xs text-muted-foreground">
            Optimization Score
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
