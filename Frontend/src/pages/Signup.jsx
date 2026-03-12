
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, addUser } from "../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const users = await getUsers();
      if (users.find((person) => person.email === email)) {
        setError("Email already exists");
        return;
      }
      const newUser = { name, email, password };
      const saved = await addUser(newUser);
      if (saved && saved._id) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("Unable to signup right now. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong while signing up. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{background: "#C9D6DF"}}>
      <div
        className="card p-4 shadow-lg border-0"
        style={{width: "420px",borderRadius: "20px",background:"linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.98))"}}>
        <h3 className="text-center mb-3 fw-bold">Create your account</h3>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input type="text" className="form-control" name="name" placeholder="Enter your full name" required value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" className="form-control" name="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Create a strong password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}
          <button className="btn btn-success w-100 mt-2" type="submit">
            Sign up
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <a href="/login" className="fw-semibold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;