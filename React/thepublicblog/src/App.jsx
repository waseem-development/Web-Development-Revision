import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/config";
import { setUser, clearAuth } from "./store/authSlice";
import { Loader2, PenLine, BookOpen, Users } from "lucide-react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthLayout from "./components/AuthLayout";
import LoginComponent from "./pages/LoginComponent";
import SignupComponent from "./pages/SignupComponent";
import PostForm from "./components/post-form/PostForm";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

/* ── Home ── */
function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <PenLine size={22} strokeWidth={1.5} />,
      title: "Write freely",
      desc: "A distraction-free editor built for people who love words.",
    },
    {
      icon: <BookOpen size={22} strokeWidth={1.5} />,
      title: "Read everything",
      desc: "Discover stories, ideas, and perspectives from writers worldwide.",
    },
    {
      icon: <Users size={22} strokeWidth={1.5} />,
      title: "Build an audience",
      desc: "Share your voice with readers who are genuinely interested.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-default">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-bold text-[20vw] leading-none"
            style={{ color: "var(--border-subtle)" }}
          >
            Words.
          </span>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 py-32 text-center fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-default bg-surface text-xs text-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block" />
            Open to everyone. Free forever.
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight tracking-tight text-foreground mb-6">
            Your ideas deserve{" "}
            <span className="text-amber italic">to be heard.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted font-light max-w-xl mx-auto mb-10 leading-relaxed">
            ThePublicBlog is a place where anyone can write, share stories,
            and connect with curious readers around the world.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3.5 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Start writing today
            </button>
            <button
              onClick={() => navigate("/all-posts")}
              className="px-8 py-3.5 border border-default text-foreground font-medium rounded-xl hover:bg-surface-raised transition-colors text-sm"
            >
              Browse posts
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20 stagger">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="fade-in p-6 rounded-2xl border border-default bg-surface hover:border-amber/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-glow flex items-center justify-center text-amber mb-4">
                {icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-default bg-surface">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Ready to share your story?
          </h2>
          <p className="text-muted mb-8 font-light">
            Join thousands of writers publishing on ThePublicBlog.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3.5 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Create a free account
          </button>
        </div>
      </section>
    </>
  );
}

/* ── All Posts ── */
function AllPosts() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-semibold mb-8">All Posts</h1>
      <p className="text-muted">Posts will appear here.</p>
    </div>
  );
}

/* ── Single Post ── */
function Post() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-muted">Post content will appear here.</p>
    </div>
  );
}

/* ── Add Post ── */
function AddPost() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 pb-8 border-b border-default">
        <h1 className="font-display text-4xl font-semibold mb-2">
          Write a Post
        </h1>
        <p className="text-muted text-sm">
          Share your story with the world.
        </p>
      </div>
      <PostForm />
    </div>
  );
}

/* ── Edit Post ── */
function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      appwriteService.getPost(id).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 pb-8 border-b border-default">
        <h1 className="font-display text-4xl font-semibold mb-2">
          Edit Post
        </h1>
        <p className="text-muted text-sm">Update your post below.</p>
      </div>
      <PostForm post={post} />
    </div>
  );
}

/* ── My Posts ── */
function MyPosts() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-semibold mb-8">My Posts</h1>
      <p className="text-muted">Your posts will appear here.</p>
    </div>
  );
}

/* ── Profile ── */
function Profile() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-semibold mb-8">Profile</h1>
      <p className="text-muted">Profile info will appear here.</p>
    </div>
  );
}

/* ── 404 ── */
function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="font-display text-8xl font-semibold text-amber">404</h1>
      <p className="text-xl text-muted font-light">This page doesn't exist.</p>
      <a href="/" className="text-sm text-amber hover:underline mt-2">
        Go back home →
      </a>
    </div>
  );
}

export default App;