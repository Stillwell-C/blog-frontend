import { useState, useEffect, useRef } from "react";
import birdImg from "../../assets/stork.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { BeatLoader } from "react-spinners";
import usePageTitle from "../../hooks/usePageTitle";
import usePersistLogin from "../../hooks/usePersistLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn } = useAuth();

  const [persistLogin, setPersistLogin] = usePersistLogin();

  usePageTitle("Login");

  const usernameRef = useRef();
  const errRef = useRef();

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [login, { isLoading, error, isSuccess, isError }] = useLoginMutation();

  useEffect(() => {
    if (loggedIn) navigate("/");
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setPersistLogin(true);
    const response = await login({ username, password });
    dispatch(setCredentials({ accessToken: response.data.accessToken }));
  };

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      if (location?.state?.redirectPath) {
        navigate(location?.state?.redirectPath);
      } else {
        navigate("/");
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!errorMsg.length) return;
    if (isError || errorMsg.length) errRef.current.focus();
  }, [isError, errorMsg]);

  const buttonContent = !isLoading ? (
    "Log In"
  ) : (
    <BeatLoader color='#333' size={8} />
  );

  const registerLink = location?.state?.redirectPath ? (
    <Link to='/register' state={{ redirectPath: location.state.redirectPath }}>
      Sign Up
    </Link>
  ) : (
    <Link to='/register'>Sign Up</Link>
  );

  return (
    <main className='auth-page-container fill-screen flex-container flex-align-center flex-justify-center'>
      <div className='auth-page-content-wrapper gap-20p flex-container flex-align-center flex-justify-center flex-column'>
        <section className='auth-form-container flex-container flex-column'>
          <h2>Log In</h2>
          <form onSubmit={handleLogin}>
            <div
              className={
                isError || errorMsg.length
                  ? "form-error-div"
                  : "error-offscreen"
              }
              ref={errRef}
              aria-live='assertive'
            >
              {errorMsg}
              {error?.data?.message}
            </div>
            <div className='form-line flex-container flex-column'>
              <label htmlFor='username' className='form-label'>
                username:
              </label>
              <input
                type='text'
                id='username'
                className='form-input'
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete='off'
                spellCheck='false'
                required
                ref={usernameRef}
              />
            </div>
            <div className='form-line flex-container flex-column'>
              <label htmlFor='password' className='form-label'>
                password:
              </label>
              <input
                type='password'
                id='password'
                className='form-input'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='button-div'>
              <button
                disabled={!username || !password}
                className='basic-button'
                type='submit'
                style={{ minWidth: "66px" }}
              >
                {buttonContent}
              </button>
            </div>
            <div className='auth-form-link-div'>
              <p>Need an account?</p>
              {registerLink}
            </div>
          </form>
        </section>
        <div className='auth-page-img-div'>
          <img className='fade-in' src={birdImg} alt='' />
        </div>
      </div>
    </main>
  );
};

export default Login;
