import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireLogout = () => {
  const location = useLocation();
  const { loggedIn } = useAuth();

  const content = loggedIn ? (
    //This will replace inaccessible page from history
    <Navigate to='/' state={{ from: location }} replace />
  ) : (
    <Outlet />
  );

  return content;
};

export default RequireLogout;
