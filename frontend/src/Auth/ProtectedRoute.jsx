import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedRoute = ({ children, adminOnly = false, agentOnly = false }) => {
  const { userInfo, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  // not logged in
  if (!userInfo) return <Navigate to="/login" replace />;

  // admin pages
  if (adminOnly && userInfo.role !== "admin") return <Navigate to="/" replace />;

  // agent pages (only specific agent)
   if (agentOnly && !(userInfo.role === "agent" && userInfo.email === "agjent@barkea.com")) {
    return <Navigate to="/" replace />; // <-- fix: ridrejton tek faqja kryesore jo vetë agentPanel
  }

  // normal users or allowed roles
  return children;
};

export default ProtectedRoute;
