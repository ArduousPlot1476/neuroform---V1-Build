import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import AppRoutes from "./routes";
import ErrorFallback from "./components/common/ErrorFallback";
import ParkingLotModal from "./components/ParkingLot/ParkingLotModal";
import FloatingParkingLotButton from "./components/ParkingLot/FloatingParkingLotButton";
import { AuthProvider } from "./services/auth/AuthProvider";
import { TimerProvider } from "./context/TimerContext";
import { JournalProvider } from "./context/JournalContext";
import QuickLinks from "./components/QuickLinks"; // Import the QuickLinks component

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

function App() {
  const [isParkingLotOpen, setIsParkingLotOpen] = React.useState(false);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <TimerProvider>
          <JournalProvider>
            <Router>
              <div className="min-h-screen bg-gray-100">
                <div className="max-w-6xl mx-auto p-4 space-y-6">
                  {/* Header Section */}
                  <Header onParkingLotClick={() => setIsParkingLotOpen(true)} />
                  
                  {/* Navigation Menu */}
                  <Navigation />

                  {/* Quick Links Component */}
                  <QuickLinks />

                  {/* Main Content */}
                  <main>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <AppRoutes />
                    </ErrorBoundary>
                  </main>

                  {/* Parking Lot Modal */}
                  <ParkingLotModal
                    isOpen={isParkingLotOpen}
                    onClose={() => setIsParkingLotOpen(false)}
                  />
                </div>

                {/* Floating Parking Lot Button */}
                <FloatingParkingLotButton
                  onClick={() => setIsParkingLotOpen(true)}
                />
              </div>
            </Router>
          </JournalProvider>
        </TimerProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default Sentry.withProfiler(App);
