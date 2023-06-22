import { Link, useNavigate } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

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
  // let mypageButton
  let newPostButton = (
    <button className='basic-button' onClick={() => navigate("/posts/new")}>
      New Post
    </button>
  );

  const headerButtons = (
    <>
      {loginButton}
      {newUserButton}
      {logoutButton}
    </>
  );

  return (
    <header className='page-header'>
      <h1 className='header-title'>
        <Link to='/'>Wild Goose Chase </Link>
      </h1>

      <nav className='header-buttons-container'>{headerButtons}</nav>
    </header>
  );
};

export default Header;
