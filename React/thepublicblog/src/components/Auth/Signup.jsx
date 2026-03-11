import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../Logo";
import { useForm } from "react-hook-form";
import FormCard from "../FormCard";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signup = async (data) => {
    setError("");
    try {
      const result = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(result)) {
        navigate("/");
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit(signup)}>
        <FormCard
          title="Create an Account"
          description="Sign up to start writing and sharing posts"
          footer={
            <div className="flex flex-col gap-3 w-full">
              <Button type="submit" className="w-full">Sign up</Button>
              <p className="text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          }
        >
          <div className="flex justify-center mb-2">
            <Logo />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s]{2,}$/,
                  message: "Name can only contain letters",
                },
              })}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Must include uppercase, lowercase, number and special character",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

        </FormCard>
      </form>
    </div>
  );
}

export default Signup;