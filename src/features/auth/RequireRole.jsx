import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireRole = ({ requiredRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  const content = roles.some((role) => requiredRoles.includes(role)) ? (
    <Outlet />
  ) : (
    //This will replace inaccessible page from history
    <Navigate to='/' state={{ from: location }} replace />
  );

  return content;
};

export default RequireRole;
