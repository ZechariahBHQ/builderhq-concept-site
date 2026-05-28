import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FlavoursProvider } from "./contexts/FlavoursContext";
import TakeoverOrchestrator from "./components/TakeoverOrchestrator";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <FlavoursProvider>
          <TooltipProvider>
            <Toaster />
            <TakeoverOrchestrator />
            <Router />
          </TooltipProvider>
        </FlavoursProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
