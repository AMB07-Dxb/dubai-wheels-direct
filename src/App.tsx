import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import FleetPage from "./pages/FleetPage";
import CarDetailPage from "./pages/CarDetailPage";
import RewardsPage from "./pages/RewardsPage";
import DocumentsPage from "./pages/DocumentsPage";
import ContactPage from "./pages/ContactPage";
import SpecialOffersPage from "./pages/SpecialOffersPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import FloatingCTA from "./components/FloatingCTA";
import AlEmadAIChat from "./components/AlEmadAIChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FloatingCTA />
        <AlEmadAIChat />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/fleet/:id" element={<CarDetailPage />} />
          <Route path="/special-offers" element={<SpecialOffersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/special-offers" element={<SpecialOffersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
