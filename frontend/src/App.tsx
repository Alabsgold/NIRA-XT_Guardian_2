import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DNSMonitor from "./pages/DNSMonitor";
import ParentalControl from "./pages/ParentalControl";
import BlockAllowList from "./pages/BlockAllowList";
import ActivityLogs from "./pages/ActivityLogs";
import Settings from "./pages/Settings";
import APIDocs from "./pages/APIDocs";
import NotFound from "./pages/NotFound";
import { AIAssistant } from "./components/AIAssistant";

const queryClient = new QueryClient();

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} /> {/* Added AdminDashboard route */}
              <Route path="/dns-monitor" element={<DNSMonitor />} />
              <Route path="/parental-control" element={<ParentalControl />} />
              <Route path="/block-allow" element={<BlockAllowList />} />
              <Route path="/logs" element={<ActivityLogs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/api-docs" element={<APIDocs />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIAssistant />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
