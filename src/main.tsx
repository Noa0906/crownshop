import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/use-cart";
import React, { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";

// Lazy load route components
const Landing = lazy(() => import("./pages/Landing.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const ProductAbout = lazy(() => import("./pages/ProductAbout.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  state = { hasError: false, message: "" };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message || "런타임 에러" };
  }
  componentDidCatch(err: Error) {
    console.error("[Root] crash:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold">런타임 에러</p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {this.state.message}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);
  return null;
}

// --- Convex (선택적) ---
const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;

// 동적 임포트로 Convex 로드
const ConvexProviders = lazy(async () => {
  if (!convexUrl) {
    // Convex 없으면 그냥 children 통과
    return {
      default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    };
  }
  const [{ ConvexAuthProvider }, { ConvexReactClient }] = await Promise.all([
    import("@convex-dev/auth/react"),
    import("convex/react"),
  ]);
  const convex = new ConvexReactClient(convexUrl);
  return {
    default: ({ children }: { children: React.ReactNode }) => (
      <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>
    ),
  };
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <Suspense fallback={null}>
        <ConvexProviders>
          <CartProvider>
            <HashRouter>
              <RouteSyncer />
              <Suspense fallback={<RouteLoading />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/about/:id" element={<ProductAbout />} />
                  <Route
                    path="/auth"
                    element={<AuthPage redirectAfterAuth="/dashboard" />}
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <Suspense fallback={<RouteLoading />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </HashRouter>
          </CartProvider>
          <Toaster />
        </ConvexProviders>
      </Suspense>
    </RootErrorBoundary>
  </StrictMode>,
);
