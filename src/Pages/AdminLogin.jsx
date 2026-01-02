import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminLogin.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // const res = await fetch("/user/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include", //  cookie-based auth
      //   body: JSON.stringify({ email, password }),
      // });

      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for cookies
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Login failed");
      }

      // backend sets cookie → now re-check auth
      await login();

      toast.success("Login successful! 🎉");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 300);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        {/* Header */}
        <div className="admin-login__header">
          <h1>Admin Login</h1>
          <p>Sign in to manage your store</p>
        </div>

        {/* Form */}
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-login__group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-login__group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="admin-login__error">{error}</p>}

          <button
            type="submit"
            className="admin-login__button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="admin-login__footer">
          © {new Date().getFullYear()} Your Brand
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
