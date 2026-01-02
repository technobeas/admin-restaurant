import { createContext, useContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Check admin session from backend (cookie-based)
  const checkAuth = async () => {
    try {
      // const res = await fetch("/user/me", {
      //   method: "GET",
      //   credentials: "include", //  send cookies
      // });

      const res = await fetch(`${API_URL}/user/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not logged in");

      const data = await res.json();
      setAdmin(data.user); // decoded user from backend
    } catch (err) {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  // Run once on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // Called after successful login
  const login = async () => {
    setLoading(true);
    await checkAuth(); // backend already set cookie
  };

  // Logout → clear cookie on backend
  const logout = async () => {
    try {
      // await fetch("/user/logout", {
      //   method: "GET",
      //   credentials: "include",
      // });

      await fetch(`${API_URL}/user/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed");
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
