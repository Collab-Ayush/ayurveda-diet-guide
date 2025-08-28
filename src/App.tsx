import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Foods from "./pages/Foods";
import DietCharts from "./pages/DietCharts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/patients" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Patients />} />
            </Route>
            <Route path="/foods" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Foods />} />
            </Route>
            <Route path="/diet-charts" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<DietCharts />} />
            </Route>
            <Route path="/settings" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<div className="p-8"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Settings page coming soon...</p></div>} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
