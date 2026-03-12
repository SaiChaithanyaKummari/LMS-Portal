
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const users = await getUsers();
      const user = users.find(
        (person) => person.email === email && person.password === password
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Unable to login right now. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"style={{background:"#ffffff"}}>
      <div className="card p-4 shadow-lg border" style={{width: "420px",borderRadius: "20px",background:"#ffffff"}}>
        <h3 className="text-center mb-3 fw-bold">Welcome back</h3>
        <p className="text-center text-muted mb-4">Log in to continue your learning journey.</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" className="form-control" name="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input type={showPassword ? "text" : "password"} className="form-control" name="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button className="btn btn-outline-secondary d-flex align-items-center" type="button" onClick={() => setShowPassword(!showPassword)} style={{ borderColor: '#dee2e6' }}>
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
            <button className="btn btn-link p-0 mt-1" type="button">Forgot Password?</button>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button className="btn btn-dark w-100 mt-2" type="submit">Log in</button>
        </form>
        <p className="text-center mt-3 mb-0">Don&apos;t have an account?{" "}<a href="/signup" className="fw-semibold">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;