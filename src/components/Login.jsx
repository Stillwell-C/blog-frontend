import { useState, useEffect, useRef } from "react";
import birdImg from "../assets/stork.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import usePersistLogin from "../hooks/usePersistLogin";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const errRef = useRef();

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [persistLogin, setPersistLogin] = usePersistLogin();

  const [login, { isLoading, error, isSuccess, isError }] = useLoginMutation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    // setPersistLogin(true);
    // try {
    //   const { accessToken } = await login({ username, password }).unwrap;
    //   dispatch(setCredentials({ accessToken }));
    //   setUsername("");
    //   setPassword("");
    //   navigate("/");
    // } catch (err) {
    //   if (!err.status) {
    //     setErrorMsg("No Server Response");
    //   } else {
    //     setErrorMsg(err?.data?.message);
    //   }
    // }
    const response = await login({ username, password });
    dispatch(setCredentials({ accessToken: response.data.accessToken }));
  };

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      navigate("/");
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

  return (
    <main className='auth-page-container fill-screen'>
      <div className='auth-page-content-wrapper'>
        <section className='auth-form-container'>
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
              <Link to='/register'>Sign Up</Link>
            </div>
          </form>
        </section>
        <img className='fade-in' src={birdImg} alt='' />
      </div>
    </main>
  );
};

export default Login;
