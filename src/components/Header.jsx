import { Link, useNavigate } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCredentialsLoading } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();

  // const [authLoading, setAuthLoading] = useState(true);
  const { loggedIn, isAdmin, isContributor } = useAuth();

  const authLoading = useSelector(selectCredentialsLoading);

  console.log("auth loading: ", authLoading, "||  logged in: ", loggedIn);

  // useEffect(() => {
  //   setAuthLoading(false);
  // }, [loggedIn]);

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  // useEffect(() => {
  //   if (isSuccess) navigate("/");
  // }, [isSuccess]);

  let loginButton = (
    <button className='basic-button' onClick={() => navigate("/login")}>
      Log in
    </button>
  );
  let newUserButton = (
    <button className='basic-button' onClick={() => navigate("/register")}>
      Sign up
    </button>
  );
  let logoutButton = (
    <button className='basic-button' onClick={sendLogout}>
      {isLoading ? "Logging Out" : "Log Out"}
    </button>
  );
  let newPostButton = (
    <button className='basic-button' onClick={() => navigate("/posts/new")}>
      New Post
    </button>
  );
  let myPageButton = (
    <button className='basic-button' onClick={() => navigate("/mypage")}>
      My Page
    </button>
  );

  let buttonLoadingSkeleton = (
    <div className='header-button-skeleton'>
      <div className='skeleton skeleton-title-sm skeleton-width-80'></div>
    </div>
  );

  const skeletonButtons = (
    <>
      {buttonLoadingSkeleton}
      {buttonLoadingSkeleton}
    </>
  );

  const headerButtons = !loggedIn ? (
    <>
      {loginButton}
      {newUserButton}
    </>
  ) : (
    <>
      {myPageButton}
      {isContributor && newPostButton}
      {logoutButton}
    </>
  );

  const displayButtons = authLoading ? skeletonButtons : headerButtons;

  return (
    <header className='page-header'>
      <h1 className='header-title'>
        <Link to='/'>Wild Goose Chase </Link>
      </h1>

      <nav className='header-buttons-container'>{displayButtons}</nav>
    </header>
  );
};

export default Header;
