import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUsernameAvailable, saveAdditionalDetails } from "@/hooks/useAuth";
import { Loader, User, Info } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundBeams } from "@/components/ui/background-beams";

const AdditionalDetails: React.FC = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Debounced username check
  useEffect(() => {
    const checkUsername = async () => {
      if (username.length >= 3 && username.length <= 20) {
        const available = await checkUsernameAvailable(username);
        setIsAvailable(available);
        setError(available ? "" : "Username is already taken");
      } else {
        setIsAvailable(false);
        setError("");
      }
    };

    const timeoutId = setTimeout(checkUsername, 500);
    return () => clearTimeout(timeoutId);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores");
      setLoading(false);
      return;
    }

    try {
      await saveAdditionalDetails(username, bio);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <BackgroundBeams className="absolute inset-0 -z-10" />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl border border-accent/20 glass-card">
        <div className="flex flex-col items-center justify-center py-12 px-6 md:px-12 bg-background/90 backdrop-blur-sm">
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
          <h2 className="text-3xl font-bold mb-2 text-center">
            Complete Your Profile
          </h2>
          <p className="text-muted-foreground mb-6 text-center">
            Choose a unique username and tell us about yourself!
          </p>
          {error && (
            <div className="mb-4 text-destructive text-center px-2 animate-fade-in">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="transition-all duration-300 hover:translate-y-[-4px]">
              <label className="block font-medium mb-1 text-foreground">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  pattern="^[a-zA-Z0-9_]{3,20}$"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary transition placeholder:text-muted-foreground"
                  placeholder="your_username"
                  required
                />
              </div>
              {username.length > 0 && (
                <small
                  className={`block mt-1 text-xs ${
                    isAvailable
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {isAvailable ? "Username available!" : "Username not available"}
                </small>
              )}
            </div>

            <div className="transition-all duration-300 hover:translate-y-[-4px]">
              <label className="block font-medium mb-1 text-foreground">
                Bio <span className="text-xs text-muted-foreground">(optional)</span>
              </label>
              <div className="relative">
                <Info className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary transition placeholder:text-muted-foreground min-h-[80px] resize-none"
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isAvailable || loading}
              className={`w-full py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow transition duration-300 hover:shadow-lg hover:bg-accent flex items-center justify-center gap-2 ${
                (!isAvailable || loading) ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin-slow h-5 w-5" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails;
