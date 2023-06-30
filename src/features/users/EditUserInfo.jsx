import { useEffect, useRef, useState } from "react";
import { useUpdateUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useRefreshMutation } from "../auth/authApiSlice";
import { setCredentials } from "../auth/authSlice";
import { useDispatch } from "react-redux";

//Begin with upper/lower case letter and contain 3-23 more characters
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//Min 8 char long. Must contain at least one letter & one number
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/;

const EditUserInfo = () => {
  const usernameRef = useRef();
  const errRef = useRef();

  const { username: originalUsername, id } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    refresh,
    {
      isUninitialized,
      isLoading: refreshIsLoading,
      isSuccess: refreshIsSuccess,
      isError: refreshIsError,
      error: refreshError,
    },
  ] = useRefreshMutation();

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
    setUsername(originalUsername);
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

  //   useEffect(() => {
  //     if (isSuccess && refreshIsSuccess) {
  //       setUsername("");
  //       setPassword("");
  //       setConfirmPassword("");
  //       navigate("/mypage");
  //     }
  //   }, [refreshIsSuccess]);

  useEffect(() => {
    if (!errorMsg.length) return;
    if (isError || errorMsg.length) errRef.current.focus();
  }, [isError, errorMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (originalUsername === username && !password.length) {
      //No data has been changed
      return;
    }
    if (originalUsername !== username && !USER_REGEX.test(username)) {
      setErrorMsg("Invalid username");
      return;
    }
    if (password.length && !PWD_REGEX.test(password)) {
      setErrorMsg("Invalid password");
      return;
    }
    if (password.legnth && !confirmPassword.length) {
      setErrorMsg("Please confirm your new password");
      return;
    }
    if (password.length && password !== confirmPassword) {
      setErrorMsg("Passwords must match");
      return;
    }
    const updatedUserData = {};
    if (username.length && originalUsername !== username)
      updatedUserData.username = username;
    if (password.length) updatedUserData.password = username;
    const response = await updateUser({ ...updatedUserData, id });
    const { accessToken } = response.data;
    dispatch(setCredentials({ accessToken }));
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    navigate("/mypage");
  };

  return (
    <section className='fill-screen flex-container flex-column flex-align-center margin-top-2'>
      <h2>Edit user information</h2>
      <p>Only edit the fields you wish to update.</p>
      <form className='margin-top-1' onSubmit={handleSubmit}>
        <div
          ref={errRef}
          className={
            isError || errorMsg || refreshIsError
              ? "form-error-div"
              : "error-offscreen"
          }
          aria-live='assertive'
        >
          {/* See if this is sufficient for message */}
          {errorMsg}
          {error?.data?.message}
          {refreshError?.data?.message}
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
            disabled={originalUsername === username && !password.length}
            className='basic-button'
            type='submit'
          >
            Edit Info
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditUserInfo;
