
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    <div className="d-flex justify-content-center align-items-center vh-100"style={{background:"#C9D6DF"}}>
      <div className="card p-4 shadow-lg border-0" style={{width: "420px",borderRadius: "20px",background:"linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.98))",}}>
        <h3 className="text-center mb-3 fw-bold">Welcome back</h3>
        <p className="text-center text-muted mb-4">Log in to continue your learning journey.</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input type="email" className="form-control" name="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input type="password"className="form-control" name="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className="btn btn-link p-0 mt-1" type="button">Forgot Password?</button>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button className="btn btn-success w-100 mt-2" type="submit">Log in</button>
        </form>
        <p className="text-center mt-3 mb-0">Don&apos;t have an account?{" "}<a href="/signup" className="fw-semibold">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;