import { useState, useRef, useEffect } from "react";
import spoonbill from "../assets/spoonbill.svg";
import { Link } from "react-router-dom";
import axios from "../api/axios";

//Begin with upper/lower case letter and contain 3-23 more characters
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//Min 8 char long. Must contain at least one letter & one number
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/;

const REGISTER_URL = "/users";

const Register = () => {
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) return;
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setConfirmPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!USER_REGEX.test(username)) {
      setErrorMsg("Invalid username");
      errRef.current.focus();
      return;
    }
    if (!PWD_REGEX.test(password)) {
      setErrorMsg("Invalid password");
      errRef.current.focus();
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords must match");
      errRef.current.focus();
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSuccess(true);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err.response.status);
      if (!err.response) {
        setErrorMsg("No server reponse");
      } else if (err.response.status === 409) {
        setErrorMsg("Username taken");
      } else {
        setErrorMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  const successPage = (
    <>
      <img className='img-color-fix' src={spoonbill} alt='' />
      <div className='auth-form-container success'>
        <h2>Success</h2>
        <p className='auth-success-link'>
          Please <Link to='/login'>log in</Link>
        </p>
      </div>
    </>
  );

  const registrationPage = (
    <>
      <img className='img-color-fix' src={spoonbill} alt='' />
      <div className='auth-form-container'>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div
            ref={errRef}
            className={errorMsg ? "form-error-div" : "error-offscreen"}
            aria-live='assertive'
          >
            {errorMsg}
          </div>
          <div
            className={`form-line ${username && !validUsername ? "error" : ""}`}
          >
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
              ref={usernameRef}
              required
              aria-invalid={validUsername ? "false" : "true"}
              aria-describedby='usernameNote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id='usernameNote'
              className={
                userFocus && username && !validUsername
                  ? "form-description form-fade-in"
                  : "offscreen"
              }
            >
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          <div
            className={`form-line ${password && !validPassword ? "error" : ""}`}
          >
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
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby='passwordNote'
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id='passwordNote'
              className={
                passwordFocus && !validPassword
                  ? "form-description form-fade-in"
                  : "offscreen"
              }
            >
              8 to 24 characters. <br />
              Must include at least one letter and one number.
            </p>
          </div>
          <div
            className={`form-line ${
              confirmPassword && !confirmPasswordMatch ? "error" : ""
            }`}
          >
            <label htmlFor='confirmPassword' className='form-label'>
              confirm password:
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='form-input'
              placeholder='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-invalid={confirmPasswordMatch ? "false" : "true"}
              aria-describedby='confirmNote'
              onFocus={() => setConfirmFocus(true)}
              onBlur={() => setConfirmFocus(false)}
            />
            <p
              id='confirmNote'
              className={
                confirmFocus && !confirmPasswordMatch
                  ? "form-description form-fade-in"
                  : "offscreen"
              }
            >
              Passwords must match.
            </p>
          </div>
          <div className='button-div'>
            <button
              disabled={
                !validUsername || !validPassword || !confirmPasswordMatch
                  ? true
                  : false
              }
              className='basic-button'
              type='submit'
            >
              Sign up
            </button>
          </div>
          <div className='auth-form-link-div'>
            <p>Have an account?</p>
            <Link to='/login'>Log in</Link>
          </div>
        </form>
      </div>
    </>
  );

  const content = (
    <section className='auth-page-container fill-screen'>
      <div className='auth-page-content-wrapper'>
        {success ? successPage : registrationPage}
      </div>
    </section>
  );

  return content;
};

export default Register;
