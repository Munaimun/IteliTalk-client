import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the desired component if authenticated
  return <Outlet />;
};

// Add prop types validation
PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // Specify that isAuthenticated must be a boolean and is required
};

export default PrivateRoute;
