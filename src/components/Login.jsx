import { useState, useEffect, useRef } from "react";
import birdImg from "../assets/stork.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <section className='auth-page-container'>
      <div className='auth-page-content-wrapper'>
        <div className='auth-form-container'>
          <h2>Log In</h2>
          <form>
            <div
              className={errorMsg ? "form-error-div" : "error-offscreen"}
              ref={errRef}
            >
              {errorMsg}
            </div>
            <div className='form-line'>
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
            <div className='form-line'>
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
              >
                Log in
              </button>
            </div>
            <div className='auth-form-link-div'>
              <p>Need an account?</p>
              <Link to='/register'>Sign Up</Link>
            </div>
          </form>
        </div>
        <img src={birdImg} alt='' />
      </div>
    </section>
  );
};

export default Login;
