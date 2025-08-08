import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VideoUploadAndAnalysis from './pages/video-upload-and-analysis';
import AnalyticsDashboard from './pages/analytics-dashboard';
import GeneratedClipsLibrary from './pages/generated-clips-library';
import AIProcessingStatus from './pages/ai-processing-status';
import VideoClipEditor from './pages/video-clip-editor';
import YouTubeChannelIntegration from './pages/you-tube-channel-integration';
import PricingPlans from './pages/pricing-plans';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIProcessingStatus />} />
        <Route path="/video-upload-and-analysis" element={<VideoUploadAndAnalysis />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/generated-clips-library" element={<GeneratedClipsLibrary />} />
        <Route path="/ai-processing-status" element={<AIProcessingStatus />} />
        <Route path="/video-clip-editor" element={<VideoClipEditor />} />
        <Route path="/you-tube-channel-integration" element={<YouTubeChannelIntegration />} />
        <Route path="/pricing-plans" element={<PricingPlans />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;