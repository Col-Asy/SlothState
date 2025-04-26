"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signInWithGoogle } from "@/hooks/useAuth";
import { Loader, Mail, Lock } from "lucide-react";
import clsx from "clsx";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundBeams } from "@/components/ui/background-beams";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFirebaseError = (code: string) => {
    switch (code) {
      case "auth/invalid-credential":
        return "Invalid email or password";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later";
      default:
        return "Failed to sign in. Please try again";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err: any) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <BackgroundBeams className="absolute inset-0 -z-10" />
      <div className="relative z-10 p-10 text-white"></div>

      <div className="relative z-10 w-full max-w-5xl h-[850px] grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-accent/20 glass-card">
        {/* Left: Sign In Form (opaque to block beams) */}
        <div className="relative z-10 flex items-center justify-center py-12 px-6 md:px-12 bg-background">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center mb-8 transition-all duration-300 hover:scale-105">
              <img
                src="logo.jpg"
                alt="SlothState Logo"
                className="h-12 w-12 mr-2"
                style={{ objectFit: "contain" }}
              />
              <span className="text-2xl font-bold text-primary">
                SlothState
              </span>
              <span className="text-2xl font-bold text-foreground ml-1">.</span>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-center">Sign In</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Welcome back! Please enter your details.
            </p>
            {error && (
              <div className="mb-4 text-destructive text-center px-2 animate-fade-in">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="transition-all duration-300 hover:translate-y-[-4px]">
                <label
                  className="block font-medium mb-1 text-foreground"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary transition placeholder:text-muted-foreground"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-label="Email address"
                  />
                </div>
              </div>
              <div className="transition-all duration-300 hover:translate-y-[-4px]">
                <label
                  className="block font-medium mb-1 text-foreground"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary transition placeholder:text-muted-foreground"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="your password"
                    aria-label="Password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 select-none text-foreground">
                  <input
                    type="checkbox"
                    className="accent-primary h-4 w-4 rounded border-input"
                  />
                  <span className="text-sm text-muted-foreground">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent font-medium hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className={clsx(
                  "w-full py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow transition duration-300 hover:shadow-lg hover:bg-accent flex items-center justify-center gap-2",
                  loading && "cursor-not-allowed opacity-70"
                )}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin-slow h-5 w-5" /> Signing
                    In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <div className="my-4 flex items-center justify-center">
              <span className="w-1/5 h-px bg-border" />
              <span className="text-sm text-muted-foreground mx-2">or</span>
              <span className="w-1/5 h-px bg-border" />
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={clsx(
                "w-full py-2 bg-background/60 backdrop-blur-sm border border-input text-muted-foreground font-semibold rounded-lg flex items-center justify-center gap-2 shadow transition duration-300 hover:shadow-lg hover:bg-accent/20",
                loading && "cursor-not-allowed opacity-70"
              )}
              disabled={loading}
            >
              {/* Google SVG */}
              Sign In with Google
            </button>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-accent font-semibold hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Aurora Background effect (opaque to block beams) */}
        <div className="relative z-10 hidden md:block">
          <AuroraBackground
            className="hidden md:flex items-center justify-center bg-transparent p-0 m-0"
            showRadialGradient
          >
            {/* Add meaningful content or leave empty */}
            <div />
          </AuroraBackground>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
