import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersistLogin from "../../hooks/usePersistLogin";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentialsLoading } from "./authSlice";
import ErrorPage from "../../components/ErrorPage";

const PersistentLogin = () => {
  // const [persist, setPersist] = usePersistLogin();
  const token = useSelector(selectCurrentToken);
  const runEffect = useRef(false);

  const dispatch = useDispatch();

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

      if (!token && persist) verifyRefreshToken();
    }

    //Ref will hold value after unmount & remount
    return () => (runEffect.current = true);
  }, []);

  //Save login: true to local
  //If error -> set this to false ?

  let content;
  if (
    !persist ||
    (isSuccess && loginSuccess) ||
    (token && isUninitialized) ||
    isLoading
  ) {
    content = <Outlet />;
  }
  // else if (isLoading) {
  //   //persist: yes, token: no
  //   console.log("loading");
  //   content = <Outlet />;
  // }
  else if (isError) {
    //persist: yes, token: no
    setPersist(false);
    content = (
      <ErrorPage message={<Link to='/login'>Please login again</Link>} />
    );
  }

  return content;
};

export default PersistentLogin;
