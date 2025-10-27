import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from ".././components/ui/Button";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Store or send user data (example: localStorage or API call)
    const userData = { username, email, password };
    console.log("Registered User:", userData);

    // Example: redirect to dashboard after registration
    navigate("/dashboard");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black px-6">
      <div className="glass-card w-full max-w-md p-8 rounded-2xl border border-primary/20">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-primary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-primary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-primary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full neon-pulse hover-glow-primary"
          >
            Register
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </section>
  );
};

export default Register;
