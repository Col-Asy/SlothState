import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUsernameAvailable, saveAdditionalDetails } from "@/hooks/useAuth";

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
    <div className="auth-container">
      <h2>Complete Your Profile</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern="^[a-zA-Z0-9_]{3,20}$"
            required
          />
          {username.length > 0 && (
            <small className={isAvailable ? "text-green-500" : "text-red-500"}>
              {isAvailable ? "Available!" : "Not available"}
            </small>
          )}
        </div>
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit" disabled={!isAvailable || loading}>
          {loading ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
};

export default AdditionalDetails;
