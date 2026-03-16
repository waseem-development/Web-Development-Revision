import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Logo from "../Logo";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[oklch(0.08_0_0)] dark:bg-[oklch(0.05_0_0)] flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span
            className="font-display text-[18vw] font-bold leading-none"
            style={{ color: 'oklch(1 0 0 / 3%)' }}
          >
            Share.
          </span>
        </div>
        <div className="relative z-10">
          <Logo />
        </div>
        <div className="relative z-10 max-w-sm">
          <blockquote className="font-display text-3xl font-normal italic leading-snug text-white/90 mb-6">
            "There is no greater agony than bearing an untold story inside you."
          </blockquote>
          <p className="text-sm text-white/40 font-light">— Maya Angelou</p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          {[0,1,2].map(i => (
            <div
              key={i}
              className={`h-1 rounded-full ${i === 1 ? 'w-8 bg-amber' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 flex justify-center">
            <Logo />
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
              Start writing today
            </h1>
            <p className="text-sm text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-amber hover:underline font-medium">
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
                  errors.name ? 'border-destructive' : 'border-default'
                }`}
                {...register("name", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  pattern: { value: /^[a-zA-Z\s]{2,}$/, message: "Letters only" },
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
                  errors.email ? 'border-destructive' : 'border-default'
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
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
                    errors.password ? 'border-destructive' : 'border-default'
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Must include uppercase, lowercase, number & special character",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ghost hover:text-muted transition-colors"
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
              className="flex items-center justify-center gap-2 w-full py-3.5 mt-1 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity text-sm"
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
              <Link to="#" className="hover:text-amber transition-colors">Terms</Link>
              {" "}and{" "}
              <Link to="#" className="hover:text-amber transition-colors">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;