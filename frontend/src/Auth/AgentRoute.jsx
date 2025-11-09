import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const AgentRoute = ({ children }) => {
  const { userInfo, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>; // wait until user is fetched

  // Not logged in
  if (!userInfo) return <Navigate to="/login" replace />;

  // Not the specific agent
  if (!(userInfo.role === "agent" && userInfo.email === "agjent@barkea.com")) {
    return <Navigate to="/" replace />;
  }

  // Logged in agent
  return children;
};

export default AgentRoute;
