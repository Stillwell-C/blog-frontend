import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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

  const headerButtons = (
    <>
      {loginButton}
      {newUserButton}
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
