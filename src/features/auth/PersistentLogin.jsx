import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersistLogin from "../../hooks/usePersistLogin";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import ErrorPage from "../../components/ErrorPage";

const PersistentLogin = () => {
  const [persist, setPersist] = usePersistLogin();
  const token = useSelector(selectCurrentToken);
  const runEffect = useRef(false);

  const [loginSuccess, setLoginSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    //To handle things being run twice in strict mode
    if (runEffect.current === true || process.env.NODE_ENV !== "development") {
      //get new access token with valid refresh token
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh();
          //isSuccess may occur before credentials are set
          setLoginSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    //Ref will hold value after unmount & remount
    return () => (runEffect.current = true);
  }, []);

  //Save login: true to local
  //If error -> set this to false ?

  let content;
  if (!persist || (isSuccess && loginSuccess) || (token && isUninitialized)) {
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    //persist: yes, token: no
    setPersist(false);
    content = (
      <ErrorPage message={<Link to='/login'>Please login again</Link>} />
    );
  }

  return content;
};

export default PersistentLogin;
