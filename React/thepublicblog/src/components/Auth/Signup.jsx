import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, ArrowRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";

const QUOTES = [
  {
    text: "There is no greater agony than bearing an untold story inside you.",
    author: "Maya Angelou",
  },
  {
    text: "Start writing, no matter what. The water does not flow until the faucet is turned on.",
    author: "Louis L'Amour",
  },
  {
    text: "You can always edit a bad page. You can't edit a blank page.",
    author: "Jodi Picoult",
  },
];

function QuoteSlider() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (index) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 300);
  };

  const prev = () => goTo((current - 1 + QUOTES.length) % QUOTES.length);
  const next = () => goTo((current + 1) % QUOTES.length);

  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative z-10 max-w-sm">
      <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s ease" }}>
        <blockquote className="font-display text-2xl font-normal italic leading-snug text-white/90 mb-4">
          "{QUOTES[current].text}"
        </blockquote>
        <p className="text-sm text-white/40 font-light">— {QUOTES[current].author}</p>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-1.5 rounded-full border border-white/20 text-white/40 hover:text-white/80 hover:border-white/40 transition-colors cursor-pointer"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="flex items-center gap-2">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all cursor-pointer ${
                i === current
                  ? "w-6 h-1.5 bg-amber"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-1.5 rounded-full border border-white/20 text-white/40 hover:text-white/80 hover:border-white/40 transition-colors cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const signup = async (data) => {
    setError("");
    setLoading(true);
    try {
      const result = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(result)) {
        navigate("/");
      } else {
        setError(result.error?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">

      {/* Left panel — always dark, warm in light mode */}
      <div
        className={`hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden transition-colors duration-300 ${
          isDark ? "bg-[oklch(0.08_0_0)]" : "bg-[oklch(0.22_0.03_60)]"
        }`}
      >
        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span
            className="font-display text-[18vw] font-bold leading-none"
            style={{ color: "oklch(1 0 0 / 3%)" }}
          >
            Share.
          </span>
        </div>

        {/* Always use dark logo — visible on both dark backgrounds */}
        <div className="relative z-10">
          <img
            src="/logo-dark.png"
            alt="ThePublicBlog"
            className="h-14 w-auto object-contain"
          />
        </div>

        <QuoteSlider />

        {/* Bottom amber rule */}
        <div className="relative z-10 w-10 h-0.5 bg-amber rounded-full" />
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10 flex justify-center">
            <img
              src={isDark ? "/logo-dark.png" : "/logo-light.png"}
              alt="ThePublicBlog"
              className="h-14 w-auto object-contain"
            />
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
              Start writing today
            </h1>
            <p className="text-sm text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-amber hover:underline font-medium cursor-pointer">
                Sign in
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl border border-destructive/30 bg-destructive/5 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(signup)} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-ghost">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl bg-surface border text-sm outline-none transition-colors placeholder:text-ghost focus:border-amber ${
                  errors.name ? "border-destructive" : "border-default"
                }`}
                {...register("name", {
                  required: "Please enter your full name.",
                  minLength: { value: 2, message: "Name must be at least 2 characters." },
                  pattern: { value: /^[a-zA-Z\s]{2,}$/, message: "Name can only contain letters." },
                })}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-ghost">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-surface border text-sm outline-none transition-colors placeholder:text-ghost focus:border-amber ${
                  errors.email ? "border-destructive" : "border-default"
                }`}
                {...register("email", {
                  required: "Please enter your email address.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium uppercase tracking-widest text-ghost">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 rounded-xl bg-surface border text-sm outline-none transition-colors placeholder:text-ghost focus:border-amber ${
                    errors.password ? "border-destructive" : "border-default"
                  }`}
                  {...register("password", {
                    required: "Please enter a password.",
                    minLength: { value: 8, message: "Password must be at least 8 characters." },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Must include uppercase, lowercase, number & special character.",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ghost hover:text-muted transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3.5 mt-1 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity text-sm cursor-pointer"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="text-xs text-center text-ghost mt-1">
              By signing up you agree to our{" "}
              <Link to="#" className="hover:text-amber transition-colors cursor-pointer">Terms</Link>
              {" "}and{" "}
              <Link to="#" className="hover:text-amber transition-colors cursor-pointer">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;