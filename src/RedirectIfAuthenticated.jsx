import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const RedirectIfAuthenticated = ({ isAuthenticated, redirectPath = "/" }) => {
  console.log("RedirectIfAuthenticated: isAuthenticated =", isAuthenticated);

  // If the user is already authenticated, redirect them to the specified path (default: home)
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render the desired component (login page) if not authenticated
  return <Outlet />;
};

// Add prop types validation
RedirectIfAuthenticated.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // Specify that isAuthenticated must be a boolean and is required
  redirectPath: PropTypes.string, // Optional prop to specify the redirect path, default is '/'
};

export default RedirectIfAuthenticated;
