import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const isLoggedIn = window.localStorage.getItem("isLogedIn");
  const isAdmin = window.localStorage.getItem("adminUser") !== null;
  const isStudent = window.localStorage.getItem("studentUser") !== null;
  const location = useLocation();

  // Check if the user is logged in and has an admin role
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAdmin) {
    return children;
  }

  // If user is a student, redirect to the student path
  if (isStudent) {
    return <Navigate to="/student" state={{ from: location }} />;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default AdminRoute;
