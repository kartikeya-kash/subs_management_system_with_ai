import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SubscriptionManager from "./pages/subscription-manager";
import AIAnalytics from "./pages/ai-analytics";
import LandingPage from "./pages/landing-page";
import ChatAssistant from "./pages/chat-assistant";
import Dashboard from "./pages/dashboard";
import ProfileSettings from "./pages/profile-settings";
import Register from "./pages/Register";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/subscription-manager"
            element={<SubscriptionManager />}
          />
          <Route path="/ai-analytics" element={<AIAnalytics />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/chat-assistant" element={<ChatAssistant />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
