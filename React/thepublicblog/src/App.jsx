import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import authService from "./appwrite/auth";
import { setUser, clearAuth } from "./store/authSlice";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthLayout from "./components/AuthLayout";

import Home from "./pages/Home";
import AllPosts from "./pages/AllPosts";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import MyPosts from "./pages/MyPosts";
import Profile from "./pages/Profile";
import LoginComponent from "./pages/LoginComponent";
import SignupComponent from "./pages/SignupComponent";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(setUser(userData));
        } else {
          dispatch(clearAuth());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-amber" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <AuthLayout authentication={false}>
                <LoginComponent />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout authentication={false}>
                <SignupComponent />
              </AuthLayout>
            }
          />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route
            path="/add-post"
            element={
              <AuthLayout authentication={true}>
                <AddPost />
              </AuthLayout>
            }
          />
          <Route
            path="/edit-post/:id"
            element={
              <AuthLayout authentication={true}>
                <EditPost />
              </AuthLayout>
            }
          />
          <Route
            path="/my-posts"
            element={
              <AuthLayout authentication={true}>
                <MyPosts />
              </AuthLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthLayout authentication={true}>
                <Profile />
              </AuthLayout>
            }
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;