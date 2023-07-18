import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCredentialsLoading } from "../features/auth/authSlice";
import menuImg from "../assets/menu-svgrepo-com.svg";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);

  const { loggedIn, isAdmin, isContributor } = useAuth();

  const authLoading = useSelector(selectCredentialsLoading);

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) window.location.reload();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) console.log("logout error: ", error?.data?.message);
  }, [isError]);

  let loginButton = (
    <button
      className='basic-button'
      style={{ minWidth: "95px" }}
      onClick={() => navigate("/login")}
    >
      Log in
    </button>
  );

  let newUserButton = (
    <button
      className='basic-button'
      style={{ minWidth: "95px" }}
      onClick={() => navigate("/register")}
    >
      Sign up
    </button>
  );

  let logoutButton = (
    <button
      className='basic-button'
      style={{ minWidth: "95px" }}
      onClick={sendLogout}
    >
      {isLoading ? "Logging Out" : "Log Out"}
    </button>
  );

  let newPostButton = null;
  if (isContributor) {
    newPostButton = (
      <button
        className='basic-button'
        style={{ minWidth: "95px" }}
        onClick={() => navigate("/posts/new")}
      >
        New Post
      </button>
    );
  }

  let adminDashButton = null;
  if (isAdmin && !pathname.match(/\/admindash/i)) {
    adminDashButton = (
      <button
        className='basic-button'
        style={{ minWidth: "95px" }}
        onClick={() => navigate("/admindash")}
      >
        Admin Dash
      </button>
    );
  }

  let myPageButton = null;
  if (!pathname.match(/\/mypage/i)) {
    myPageButton = (
      <button
        className='basic-button'
        style={{ minWidth: "95px" }}
        onClick={() => navigate("/mypage")}
      >
        My Page
      </button>
    );
  }

  let buttonLoadingSkeleton = (
    <div className='header-button-skeleton flex-container flex-align-center flex-justify-center'>
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
      {adminDashButton}
      {newPostButton}
      {logoutButton}
    </>
  );

  const displayButtons = authLoading ? skeletonButtons : headerButtons;

  const handleLogoutLink = () => {
    setShowDropdown(false);
    sendLogout();
  };

  let homeLink = null;
  if (!pathname.match(/^\/$/i)) {
    homeLink = (
      <Link onClick={() => showDropdown(false)} to='/'>
        Home
      </Link>
    );
  }

  let allPostsLink = null;
  if (!pathname.match(/^\/posts$/i)) {
    allPostsLink = (
      <Link onClick={() => showDropdown(false)} to='/posts'>
        All Posts
      </Link>
    );
  }

  const loginLink = (
    <Link onClick={() => showDropdown(false)} to='/login'>
      Log in
    </Link>
  );
  const newUserLink = (
    <Link onClick={() => showDropdown(false)} to='/register'>
      Sign up
    </Link>
  );
  const logoutLink = (
    <Link onClick={handleLogoutLink} to='/'>
      Log out
    </Link>
  );
  const myPageLink = (
    <Link onClick={() => showDropdown(false)} to='mypage'>
      My page
    </Link>
  );
  let adminDashLink = null;
  if (isAdmin) {
    adminDashLink = (
      <Link onClick={() => showDropdown(false)} to='/admindash'>
        Admin dashboard
      </Link>
    );
  }
  let newPostLink = null;
  if (isContributor) {
    newPostLink = (
      <Link onClick={() => showDropdown(false)} to='posts/new'>
        New post
      </Link>
    );
  }

  const dropDownLinks = !loggedIn ? (
    <>
      {homeLink}
      {allPostsLink}
      {loginLink}
      {newUserLink}
    </>
  ) : (
    <>
      {homeLink}
      {allPostsLink}
      {myPageLink}
      {adminDashLink}
      {newPostLink}
      {logoutLink}
    </>
  );

  return (
    <header className='page-header'>
      <div className='header-top-content flex-container flex-align-center flex-justify-between padding-1'>
        <h1 className='header-title'>
          <Link to='/'>Wild Goose Chase </Link>
        </h1>

        <nav className='header-buttons-container gap-10p'>{displayButtons}</nav>
        <button
          className='header-dropdown-toggle-button'
          aria-label={`${showDropdown ? "hide" : "display"} nagivation menu`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={menuImg} alt='' />
        </button>
      </div>
      <nav
        className={`header-dropdown-menu flex-column flex-align-center ${
          showDropdown ? "active" : ""
        }`}
      >
        {dropDownLinks}
      </nav>
    </header>
  );
};

export default Header;
