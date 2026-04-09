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
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/fleet/:id" element={<CarDetailPage />} />
          <Route path="/special-offers" element={<SpecialOffersPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
