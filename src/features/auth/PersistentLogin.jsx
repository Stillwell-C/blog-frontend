import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersistLogin from "../../hooks/usePersistLogin";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentialsLoading } from "./authSlice";
import ErrorPage from "../../components/ErrorPage";
import LoadingFullPage from "../../components/LoadingFullPage";

const PersistentLogin = () => {
  const [persistLogin, setPersistLogin] = usePersistLogin();
  const token = useSelector(selectCurrentToken);
  const runEffect = useRef(false);

  const dispatch = useDispatch();

  const [loginSuccess, setLoginSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    console.log(isUninitialized);
    //To handle things being run twice in strict mode
    if (runEffect.current === true || process.env.NODE_ENV !== "development") {
      //get new access token with valid refresh token
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          dispatch(setCredentialsLoading(true));
          await refresh();
          //isSuccess may occur before credentials are set
          setLoginSuccess(true);
          dispatch(setCredentialsLoading(false));
        } catch (err) {
          console.log(err);
          dispatch(setCredentialsLoading(false));
        }
      };

      if (!token && persistLogin) verifyRefreshToken();
    }

    //Ref will hold value after unmount & remount
    return () => (runEffect.current = true);
  }, []);

  let content;
  if (persistLogin && isLoading) {
    //Displaying outlet will kick out of protected routes
    //So loading pages is displayed.
    content = <LoadingFullPage />;
  } else if (
    !persistLogin ||
    (isSuccess && loginSuccess) ||
    (token && isUninitialized)
  ) {
    content = <Outlet />;
  } else if (isError) {
    //persist login, but token not found
    setPersistLogin(false);
    content = (
      <ErrorPage message={<Link to='/login'>Please login again</Link>} />
    );
  }

  return content;
};

export default PersistentLogin;
