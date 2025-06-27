
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./components/Dashboard";
import SplitManager from "./components/SplitManager";
import ExerciseLibrary from "./components/ExerciseLibrary";
import WorkoutTracker from "./components/WorkoutTracker";
import ProgressTracker from "./components/ProgressTracker";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                FitTracker Pro
              </h1>
              <p className="text-gray-600">Your personal fitness journey starts here</p>
            </header>
            
            <Navigation />
            
            <main className="mt-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/splits" element={<SplitManager />} />
                <Route path="/exercises" element={<ExerciseLibrary />} />
                <Route path="/workout" element={<WorkoutTracker />} />
                <Route path="/progress" element={<ProgressTracker />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
