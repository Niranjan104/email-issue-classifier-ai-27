
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import AsAdmin from "./pages/AsAdmin";
import TeamDetails from "./pages/TeamDetails";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/as-admin" element={
              <div className="flex h-screen">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto bg-background">
                  <AsAdmin />
                </main>
              </div>
            } />
            <Route path="/admin/team" element={
              <div className="flex h-screen">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto bg-background">
                  <TeamDetails />
                </main>
              </div>
            } />
            <Route path="/admin/settings" element={
              <div className="flex h-screen">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto bg-background">
                  <Settings />
                </main>
              </div>
            } />
            <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
