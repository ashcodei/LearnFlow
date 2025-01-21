import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSuccess = async (response: any) => {
    try {
      const result = await axios.post("/api/auth/google", { token: response.tokenId });
      localStorage.setItem("token", result.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Google Sign-In failed. Try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", result.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Sign in with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={() => setError("Google Sign-In failed.")}
        cookiePolicy="single_host_origin"
      />
      <p>New user? <a href="/register">Create an account</a></p>
    </div>
  );
};

export default Login;
