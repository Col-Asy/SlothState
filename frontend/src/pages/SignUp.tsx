"use client";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "@/hooks/useAuth";
import { Loader, Mail, Lock, User } from "lucide-react";
import clsx from "clsx";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundBeams } from "@/components/ui/background-beams";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(email, password, name);
      navigate("/additional-details");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Beams behind everything */}
      <BackgroundBeams className="absolute inset-0 -z-10" />
      <div className="relative z-10 p-10 text-white"></div>

      <div className="relative z-10 w-full max-w-5xl h-[850px] grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-accent/20 glass-card">
        {/* Left: Sign Up Form */}
        <div className="relative z-10 flex items-center justify-center py-12 px-6 md:px-12 bg-background">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center mb-8 transition-all duration-300 hover:scale-105">
              <img
                src="/public/logo.jpg"
                alt="SlothState Logo"
                className="h-12 w-12 mr-2"
                style={{ objectFit: "contain" }}
              />
              <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-green-600 to-emerald-400">
                SlothState
              </span>
              <span className="text-2xl font-bold text-white ml-1">.</span>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Get started with your free account
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
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    id="name"
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary transition placeholder:text-muted-foreground"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-label="Full Name"
                  />
                </div>
              </div>
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
                    autoComplete="new-password"
                    placeholder="Create a password"
                    aria-label="Password"
                  />
                </div>
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
                    <Loader className="animate-spin-slow h-5 w-5" /> Creating Account...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-accent font-semibold hover:underline transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Aurora Background effect (opaque to block beams) */}
        <div className="relative z-10 hidden md:block">
          <AuroraBackground className="hidden md:flex items-center justify-center bg-transparent p-0 m-0" showRadialGradient>
            <div />
          </AuroraBackground>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
