import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  // While checking cookie session
  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Checking session...
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return children;
};

export default ProtectedRoute;
