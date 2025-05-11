import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import PreviewSite from "./pages/PreviewSite";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/preview/:id" element={<PreviewSite />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/admin" element={<Admin />} />

        {/* Protect /admin route */}
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
// function App() {
//   return (
//     <HashRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/project/:id" element={<ProjectDetails />} />
//         <Route path="/preview/:id" element={<PreviewSite />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/verify" element={<Verify />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <Admin />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </HashRouter>
//   );
// }

export default App;