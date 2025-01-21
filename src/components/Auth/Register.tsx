import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [step, setStep] = useState(1); // 1 = Sign-up, 2 = Profile completion
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [additionalInfo, setAdditionalInfo] = useState({
    bio: "",
    interests: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response: any) => {
    try {
      const result = await axios.post("/api/auth/google", { token: response.tokenId });
      localStorage.setItem("token", result.data.token);

      // If the user role is "pending," move to profile completion
      if (result.data.user.role === "pending") {
        setStep(2);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Google Sign-Up failed. Try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/auth/register", { ...formData, additionalInfo });
      localStorage.setItem("token", result.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  const handleProfileCompletion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update user profile in the backend
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/user/profile",
        { additionalInfo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard");
    } catch (err) {
      setError("Profile completion failed. Try again.");
    }
  };

  return (
    <div className="register-container">
      {error && <p className="error">{error}</p>}
      {step === 1 && (
        <>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="educator">Educator</option>
            </select>
            <button type="submit">Register</button>
          </form>
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Sign up with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={() => setError("Google Sign-Up failed.")}
            cookiePolicy="single_host_origin"
          />
        </>
      )}
      {step === 2 && (
        <>
          <h2>Complete Your Profile</h2>
          <form onSubmit={handleProfileCompletion}>
            <textarea
              placeholder="Bio"
              value={additionalInfo.bio}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, bio: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Interests"
              value={additionalInfo.interests}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, interests: e.target.value })}
              required
            />
            <button type="submit">Complete Profile</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
