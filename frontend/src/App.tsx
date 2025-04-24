import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardSettings from "./pages/DashboardSettings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdditionalDetails from "./pages/AdditionalDetails";
import RequireAuth from "./components/RequireAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import GuestRoute from "./components/GuestRoute";
import Integrations from "./pages/Integrations";
import AccountSettings from "./pages/AccountSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Route */}
              <Route path="/" element={<Index />} />

              {/* Guest-only Routes */}
              <Route element={<GuestRoute />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>

              {/* Protected Routes */}
              <Route
                path="/additional-details"
                element={
                  <RequireAuth>
                    <AdditionalDetails />
                  </RequireAuth>
                }
              />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/settings"
                  element={<DashboardSettings />}
                />
                <Route path="/dashboard/integrations" element={<Integrations />} />
                <Route path="/dashboard/account-settings" element={<AccountSettings />} />
              </Route>
              {/* <Route path="/dashboard/settings" element={<DashboardSettings />} /> */}

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
