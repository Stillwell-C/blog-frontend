import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireLogin = () => {
  const location = useLocation();
  const { loggedIn } = useAuth();

  const content = loggedIn ? (
    <Outlet />
  ) : (
    //This will replace inaccessible page from history
    <Navigate to='/login' state={{ from: location }} replace />
  );

  return content;
};

export default RequireLogin;
