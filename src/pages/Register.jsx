import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from ".././components/ui/Button";

const Register = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // Toggle between login and register

  // States for Register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //    localStorage.setItem("username", JSON.stringify(userData.username));

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Registered User:", data);
        localStorage.setItem("username", username);
        navigate("/dashboard");
      } else {
        alert(data.error || "Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Server error. Please try later.");
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Login Successful:", data);
        localStorage.setItem("username", data.user.username);
        navigate("/dashboard");
      } else {
        alert(data.error || "Invalid credentials or user not found.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server error. Please try later.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black px-6">
      <div className="glass-card w-full max-w-md p-8 rounded-2xl border border-primary/20">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>

        {/* Register Form */}
        {!isLogin && (
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

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full neon-pulse hover-glow-primary"
            >
              Register
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </p>
          </form>
        )}

        {/* Login Form */}
        {isLogin && (
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
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
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-primary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full neon-pulse hover-glow-primary"
            >
              Login
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don’t have an account?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Register
              </span>
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default Register;
