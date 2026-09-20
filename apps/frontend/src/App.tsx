import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProblemsPage from "./pages/ProblemsPage";
import SheetsPage from "./pages/SheetsPage";
import ContestsPage from "./pages/ContestsPage";
import InterviewPage from "./pages/InterviewPage";
import ProblemSolvePage from "./pages/ProblemSolvePage";
import CreateProblemPage from "./pages/CreateProblemPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Index from "./pages/Index";
import AuthCheck from "./components/AuthCheck";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import CreateSheetPage from "./pages/CreateSheetPage";
import InterviewSessionPage from "./pages/InterviewSessionPage";
import InterviewAnalysisPage from "./pages/InterviewAnalysisPage";
import SheetProblemManagerPage from "./pages/SheetProblemManagerPage";
import LiveContestPage from "./pages/LiveContestPage";
import ResultsPage from "./pages/ResultsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ContactUs from "./pages/ContactUs";
import TermsPrivacy from "./pages/Terms";
import DemoInterviewAnalysisPage from "./pages/DemoInterviewAnalysisPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 401/403 errors
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/verify-account" element={<VerifyAccountPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/terms-privacy" element={<TermsPrivacy />} />
            <Route element={<AuthCheck />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/problems" element={<ProblemsPage />} />
              <Route path="/problems/create" element={<CreateProblemPage />} />
              <Route path="/sheets" element={<SheetsPage />} />
              <Route path="/sheets/create" element={<CreateSheetPage />} />
              <Route
                path="/sheet/:sheetId"
                element={<SheetProblemManagerPage />}
              />

              <Route path="/contests" element={<ContestsPage />} />
              <Route path="/live-contest/:id" element={<LiveContestPage />} />
              <Route path="/results/:id" element={<ResultsPage />} />
              <Route path="/interview" element={<InterviewPage />} />
              <Route
                path="/interview-session"
                element={<InterviewSessionPage />}
              />
              <Route
                path="/interview-analysis"
                element={<InterviewAnalysisPage />}
              />
              <Route
                path="/interview-analysis/demo"
                element={<DemoInterviewAnalysisPage />}
              />
              <Route path="/problem/:id" element={<ProblemSolvePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signin" element={<SignInPage />} />
            </Route>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
