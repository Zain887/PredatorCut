import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, isAdmin }) => {
  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !isAdmin) {
    // If authenticated but not an admin, redirect to home
    return <Navigate to="/" replace />;
  }

  // If authenticated and an admin, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
