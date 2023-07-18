import { useState, useRef, useEffect } from "react";
import spoonbill from "../../assets/spoonbill.svg";
import { Link } from "react-router-dom";
import { useAddNewUserMutation } from "./usersApiSlice";
import { BeatLoader } from "react-spinners";
import usePageTitle from "../../hooks/usePageTitle";

//Begin with upper/lower case letter and contain 3-23 more characters
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//Min 8 char long. Must contain at least one letter & one number
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/;

const Register = () => {
  const usernameRef = useRef();
  const errRef = useRef();

  usePageTitle("Sign Up");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

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

  useEffect(() => {
    if (isSuccess) return;
    usernameRef?.current.focus();
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
    await addNewUser({ username, password });
  };

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!errorMsg.length) return;
    if (isError || errorMsg.length) errRef.current.focus();
  }, [isError, errorMsg]);

  const buttonContent = !isLoading ? (
    "Sign up"
  ) : (
    <BeatLoader color='#333' size={8} />
  );

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
      <img className='img-color-fix fade-in' src={spoonbill} alt='' />
      <section className='auth-form-container flex-container flex-column'>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div
            ref={errRef}
            className={
              isError || errorMsg ? "form-error-div" : "error-offscreen"
            }
            aria-live='assertive'
          >
            {errorMsg}
            {error?.data?.message}
          </div>
          <div
            className={`form-line flex-container flex-column ${
              username && !validUsername ? "error" : ""
            }`}
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
            className={`form-line flex-container flex-column ${
              password && !validPassword ? "error" : ""
            }`}
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
            className={`form-line flex-container flex-column ${
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
              style={{ minWidth: "77px" }}
            >
              {buttonContent}
            </button>
          </div>
          <div className='auth-form-link-div'>
            <p>Have an account?</p>
            <Link to='/login'>Log in</Link>
          </div>
        </form>
      </section>
    </>
  );

  const content = (
    <main className='auth-page-container fill-screen flex-container flex-align-center flex-justify-center'>
      <div className='auth-page-content-wrapper gap-20p flex-container flex-align-center flex-justify-center flex-column'>
        {isSuccess ? successPage : registrationPage}
      </div>
    </main>
  );

  return content;
};

export default Register;
