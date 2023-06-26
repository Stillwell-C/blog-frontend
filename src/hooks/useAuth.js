import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isContributor = false;
  let isAdmin = false;

  if (token) {
    const decodedToken = jwtDecode(token);
    const { username, roles, id } = decodedToken.UserInfo;

    isContributor = roles.some((role) => role.match(/contributor/i));
    isAdmin = roles.some((role) => role.match(/admin/i));

    return { username, id, roles, isAdmin, isContributor, loggedIn: true };
  } else {
    return {
      username: "",
      id: "",
      roles: [],
      isAdmin,
      isContributor,
      loggedIn: false,
    };
  }
};

export default useAuth;
