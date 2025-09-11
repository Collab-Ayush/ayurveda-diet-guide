import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PatientLayout } from "./components/patient/PatientLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { PatientProvider } from "./contexts/PatientContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import PatientLogin from "./pages/PatientLogin";
import DietitianLogin from "./pages/DietitianLogin";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Foods from "./pages/Foods";
import DietCharts from "./pages/DietCharts";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientDietPlan from "./pages/patient/PatientDietPlan";
import PatientProgress from "./pages/patient/PatientProgress";
import PatientMessages from "./pages/patient/PatientMessages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PatientProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login/patient" element={<PatientLogin />} />
              <Route path="/login/dietitian" element={<DietitianLogin />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin/Dietitian Routes */}
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

              {/* Patient Portal Routes */}
              <Route path="/patient" element={<ProtectedRoute><PatientLayout /></ProtectedRoute>}>
                <Route path="dashboard" element={<PatientDashboard />} />
                <Route path="diet-plan" element={<PatientDietPlan />} />
                <Route path="progress" element={<PatientProgress />} />
                <Route path="messages" element={<PatientMessages />} />
                <Route path="appointments" element={<div className="p-8"><h1 className="text-2xl font-bold">Appointments</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="food-database" element={<div className="p-8"><h1 className="text-2xl font-bold">Food Database</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PatientProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
