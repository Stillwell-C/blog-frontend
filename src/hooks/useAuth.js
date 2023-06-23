import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isContributor = false;
  let isAdmin = false;

  if (token) {
    const decodedToken = jwtDecode(token);
    const { username, roles } = decodedToken.UserInfo;

    isContributor = roles.includes("Contributor");
    isAdmin = roles.includes("Admin");

    return { username, roles, isAdmin, isContributor, loggedIn: true };
  } else {
    return { username: "", roles: [], isAdmin, isContributor, loggedIn: false };
  }
};

export default useAuth;
