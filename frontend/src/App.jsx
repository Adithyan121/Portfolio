import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ReactGA from "react-ga4";
import TrackPageViews from "./TrackPageViews";
import "./App.css";

// Eager load Home for performance (LCP)
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load other pages
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const PreviewSite = lazy(() => import("./pages/PreviewSite"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));
const Verify = lazy(() => import("./pages/Verify"));

const LoadingFallback = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    color: '#000'
  }}>
    Loading...
  </div>
);
// ✅ Initialize GA4 ONCE
ReactGA.initialize("G-FRXJDY9VLK");


function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <TrackPageViews />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/preview/:id" element={<PreviewSite />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
