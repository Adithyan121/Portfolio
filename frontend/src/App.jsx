import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ReactGA from "react-ga4";
import TrackPageViews from "./TrackPageViews";
import { NotificationProvider } from "./context/NotificationContext";
import "./App.css";

// Eager load Home for performance (LCP)
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import FAQ from "./pages/FAQ";

// Lazy load other pages
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const PreviewSite = lazy(() => import("./pages/PreviewSite"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));
const Verify = lazy(() => import("./pages/Verify"));
const Blogs = lazy(() => import("./pages/Blogs"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetails = lazy(() => import("./pages/CaseStudyDetails"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));

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
      <NotificationProvider>
        <Analytics />
        <SpeedInsights />
        <TrackPageViews />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/preview/:id" element={<PreviewSite />} />

            <Route path="/blogs" element={<Blogs />} />
            <Route path="/casestudies" element={<CaseStudies />} />
            <Route path="/casestudies/:id" element={<CaseStudyDetails />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/faq" element={<FAQ />} />

            <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } /> 
            {/* <Route path="/admin" element={<Admin />} />*/}
          </Routes>
        </Suspense>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
