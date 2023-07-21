import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import menuImg from "../assets/menu-svgrepo-com.svg";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);

  const { loggedIn, isAdmin, isContributor } = useAuth();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) window.location.reload();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) window.location.reload();
  }, [isError]);

  let redirectPath;
  if (pathname.match(/\/login/i) || pathname.match(/\/register/i)) {
    redirectPath = "/";
  } else {
    redirectPath = pathname;
  }

  let loginButton = (
    <button
      className='basic-button'
      style={{ minWidth: "95px" }}
      onClick={() => navigate("/login", { state: { redirectPath } })}
    >
      Log in
    </button>
  );

  let newUserButton = (
    <button
      className='basic-button'
      style={{ minWidth: "95px" }}
      onClick={() => navigate("/register", { state: { redirectPath } })}
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

  const handleLogoutLink = () => {
    setShowDropdown(false);
    sendLogout();
  };

  let homeLink = null;
  if (!pathname.match(/^\/$/i)) {
    homeLink = (
      <Link onClick={() => setShowDropdown(false)} to='/'>
        Home
      </Link>
    );
  }

  let allPostsLink = null;
  if (!pathname.match(/^\/posts$/i)) {
    allPostsLink = (
      <Link onClick={() => setShowDropdown(false)} to='/posts'>
        All Posts
      </Link>
    );
  }

  const loginLink = (
    <Link
      onClick={() => setShowDropdown(false)}
      to='/login'
      state={{ redirectPath }}
    >
      Log in
    </Link>
  );
  const newUserLink = (
    <Link
      onClick={() => setShowDropdown(false)}
      to='/register'
      state={{ redirectPath }}
    >
      Sign up
    </Link>
  );
  const logoutLink = <Link onClick={handleLogoutLink}>Log out</Link>;
  const myPageLink = (
    <Link onClick={() => setShowDropdown(false)} to='/mypage'>
      My page
    </Link>
  );
  let adminDashLink = null;
  if (isAdmin) {
    adminDashLink = (
      <Link onClick={() => setShowDropdown(false)} to='/admindash'>
        Admin dashboard
      </Link>
    );
  }
  let newPostLink = null;
  if (isContributor) {
    newPostLink = (
      <Link onClick={() => setShowDropdown(false)} to='posts/new'>
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

        <nav className='header-buttons-container gap-10p'>{headerButtons}</nav>
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
