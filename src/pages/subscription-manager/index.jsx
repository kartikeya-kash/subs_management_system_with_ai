import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { Checkbox } from "../../components/ui/Checkbox";

// Import components
import SubscriptionCard from "./components/SubscriptionCard";
import AddSubscriptionModal from "./components/AddSubscriptionModal";
import FilterBar from "./components/FilterBar";
import BulkActionsBar from "./components/BulkActionsBar";
import StatsOverview from "./components/StatsOverview";
import QuickActions from "./components/QuickActions";

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Mock subscription data
  const mockSubscriptions = [
    {
      id: "1",
      name: "Netflix Premium",
      category: "streaming",
      price: 15.99,
      originalPrice: 19.99,
      billingCycle: "monthly",
      status: "active",
      nextBilling: "2025-11-15",
      logo: "https://images.unsplash.com/photo-1662338035252-74cdac76bd2a",
      logoAlt: "Netflix logo with red background and white text",
      manageUrl: "https://netflix.com/account",
      usage: { current: 45, limit: 100, unit: "hours" },
      aiRecommendation:
        "Consider downgrading to Standard plan to save $4/month based on your usage patterns.",
    },
    {
      id: "2",
      name: "Spotify Premium",
      category: "music",
      price: 9.99,
      billingCycle: "monthly",
      status: "active",
      nextBilling: "2025-11-20",
      logo: "https://images.unsplash.com/photo-1658489958427-325ded050829",
      logoAlt: "Spotify logo with green circular icon and black text",
      manageUrl: "https://spotify.com/account",
      usage: { current: 120, limit: 150, unit: "hours" },
    },
    {
      id: "3",
      name: "Adobe Creative Cloud",
      category: "productivity",
      price: 52.99,
      billingCycle: "monthly",
      status: "paused",
      nextBilling: "2025-12-01",
      logo: "https://images.unsplash.com/photo-1697752864356-e07d9fc8767d",
      logoAlt: "Adobe Creative Cloud logo with red gradient background",
      manageUrl: "https://adobe.com/account",
      aiRecommendation:
        "You haven't used this in 30 days. Consider canceling to save $635/year.",
    },
    {
      id: "4",
      name: "Google Drive Storage",
      category: "cloud",
      price: 1.99,
      billingCycle: "monthly",
      status: "active",
      nextBilling: "2025-11-10",
      logo: "https://images.unsplash.com/photo-1704642602624-65486ccd2c17",
      logoAlt: "Google Drive logo with colorful triangular icon",
      usage: { current: 85, limit: 100, unit: "GB" },
    },
    {
      id: "5",
      name: "Disney+ Bundle",
      category: "streaming",
      price: 19.99,
      billingCycle: "monthly",
      status: "active",
      nextBilling: "2025-11-25",
      logo: "https://images.unsplash.com/photo-1588609888898-10663cf0ba99",
      logoAlt: "Disney Plus logo with blue background and white castle icon",
      usage: { current: 25, limit: 100, unit: "hours" },
    },
    {
      id: "6",
      name: "Gym Membership",
      category: "fitness",
      price: 29.99,
      billingCycle: "monthly",
      status: "active",
      nextBilling: "2025-11-05",
      logo: "https://images.unsplash.com/photo-1637666161769-90fdb7db4eef",
      logoAlt:
        "Fitness gym logo with dumbbells and modern equipment in background",
    },
  ];

  useEffect(() => {
    setSubscriptions(mockSubscriptions);
  }, []);

  // Filter and sort subscriptions
  useEffect(() => {
    let filtered = [...subscriptions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(
        (sub) =>
          sub?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          sub?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered?.filter((sub) => sub?.category === selectedCategory);
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered?.filter((sub) => sub?.status === selectedStatus);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a?.name?.localeCompare(b?.name);
        case "price-high":
          return b?.price - a?.price;
        case "price-low":
          return a?.price - b?.price;
        case "renewal-date":
          return new Date(a.nextBilling) - new Date(b.nextBilling);
        case "created-date":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    setFilteredSubscriptions(filtered);
  }, [subscriptions, searchTerm, selectedCategory, selectedStatus, sortBy]);

  const handleAddSubscription = (newSubscription) => {
    setSubscriptions((prev) => [...prev, newSubscription]);
  };

  const handleEditSubscription = (subscription) => {
    console.log("Edit subscription:", subscription);
    // Implementation for edit modal
  };

  const handleDeleteSubscription = (subscriptionId) => {
    setSubscriptions((prev) =>
      prev?.filter((sub) => sub?.id !== subscriptionId)
    );
    setSelectedSubscriptions((prev) =>
      prev?.filter((id) => id !== subscriptionId)
    );
  };

  const handleToggleStatus = (subscriptionId) => {
    setSubscriptions((prev) =>
      prev?.map((sub) =>
        sub?.id === subscriptionId
          ? { ...sub, status: sub?.status === "active" ? "paused" : "active" }
          : sub
      )
    );
  };

  const handleSelectSubscription = (subscriptionId, isSelected) => {
    if (isSelected) {
      setSelectedSubscriptions((prev) => [...prev, subscriptionId]);
    } else {
      setSelectedSubscriptions((prev) =>
        prev?.filter((id) => id !== subscriptionId)
      );
    }
  };

  const handleSelectAll = () => {
    setSelectedSubscriptions(filteredSubscriptions?.map((sub) => sub?.id));
  };

  const handleDeselectAll = () => {
    setSelectedSubscriptions([]);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for:`, selectedSubscriptions);
    // Implementation for bulk actions
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedStatus("");
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl floating-orb-1"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl floating-orb-2"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-3xl floating-orb-3"></div>
      </div>
      <main className="relative pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground text-glow-primary mb-2">
                  Subscription Manager
                </h1>
                <p className="text-lg text-muted-foreground">
                  Organize and optimize all your recurring subscriptions with
                  AI-powered insights
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-6 lg:mt-0">
                <div className="flex items-center space-x-2 bg-muted/20 rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    iconName="Grid3X3"
                    iconSize={18}
                    onClick={() => setViewMode("grid")}
                    className="px-3 py-2"
                  />

                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    iconName="List"
                    iconSize={18}
                    onClick={() => setViewMode("list")}
                    className="px-3 py-2"
                  />
                </div>

                <Button
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setIsAddModalOpen(true)}
                  className="neon-pulse"
                >
                  Add Subscription
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <StatsOverview subscriptions={subscriptions} />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <QuickActions
              onAddSubscription={() => setIsAddModalOpen(true)}
              onBulkImport={() => handleBulkAction("import")}
              onExportData={() => handleBulkAction("export")}
              onScanReceipt={() => console.log("Scan receipt")}
            />
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </motion.div>

          {/* Bulk Actions Bar */}
          <BulkActionsBar
            selectedCount={selectedSubscriptions?.length}
            totalCount={filteredSubscriptions?.length}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onBulkPause={() => handleBulkAction("pause")}
            onBulkResume={() => handleBulkAction("resume")}
            onBulkDelete={() => handleBulkAction("delete")}
            onBulkExport={() => handleBulkAction("export")}
          />

          {/* Subscriptions Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            {filteredSubscriptions?.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center border">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon
                    name="Package"
                    size={32}
                    className="text-muted-foreground"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No subscriptions found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || selectedCategory || selectedStatus
                    ? "Try adjusting your filters or search terms"
                    : "Start by adding your first subscription to track your recurring expenses"}
                </p>
                <Button
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setIsAddModalOpen(true)}
                  className="neon-pulse"
                >
                  Add Your First Subscription
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredSubscriptions?.map((subscription, index) => (
                  <motion.div
                    key={subscription?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Selection Checkbox */}
                    <div className="absolute top-4 left-4 z-10">
                      <Checkbox
                        checked={selectedSubscriptions?.includes(
                          subscription?.id
                        )}
                        onChange={(e) =>
                          handleSelectSubscription(
                            subscription?.id,
                            e?.target?.checked
                          )
                        }
                        className="bg-background/80 backdrop-blur-sm"
                      />
                    </div>

                    <SubscriptionCard
                      subscription={subscription}
                      onEdit={handleEditSubscription}
                      onDelete={handleDeleteSubscription}
                      onToggleStatus={handleToggleStatus}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Load More Button */}
          {filteredSubscriptions?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Button
                variant="outline"
                iconName="ChevronDown"
                iconPosition="right"
                className="border-primary/30 hover:border-primary hover:bg-primary/10 hover-glow-primary"
              >
                Load More Subscriptions
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      {/* Add Subscription Modal */}
      <AddSubscriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSubscription}
      />

      {/* Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="default"
          iconName="MessageSquare"
          iconSize={24}
          className="w-14 h-14 rounded-full neon-pulse shadow-2xl"
          onClick={() => console.log("Open AI chat")}
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionManager;
