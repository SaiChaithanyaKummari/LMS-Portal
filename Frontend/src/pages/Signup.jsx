
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      style={{background: "#ffffff"}}>
      <div
        className="card p-4 shadow-lg border-0"
        style={{width: "420px",borderRadius: "20px",background:"#ffffff"}}>
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
            <div className="input-group">
              <input type={showPassword ? "text" : "password"} className="form-control" name="password" placeholder="Create a strong password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button className="btn btn-outline-secondary d-flex align-items-center" type="button" onClick={() => setShowPassword(!showPassword)} style={{ borderColor: '#dee2e6' }}>
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <div className="input-group">
              <input type={showConfirmPassword ? "text" : "password"} className="form-control" name="confirmPassword" placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              <button className="btn btn-outline-secondary d-flex align-items-center" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ borderColor: '#dee2e6' }}>
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}
          <button className="btn btn-dark w-100 mt-2" type="submit">
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