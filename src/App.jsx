import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/useAuth.js";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signin from "./components/AuthPage";
import Dashboard from "./pages/Dashboard";
import PostUpload from "./components/PostUploader";
import Profile from "./pages/Profile";
import UseerProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PostView from "./pages/PostView.jsx";
export default function App() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <div className="p-6 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
} />
          <Route path="/upload" element={<PostUpload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<UseerProfile />} />
          <Route path="/post/:id" element={<PostView />} />
        </Routes>
      </div>
    </>
  );
}
