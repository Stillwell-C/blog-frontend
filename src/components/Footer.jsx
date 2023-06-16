import githubLogo from "../assets/github.svg";

const Footer = () => {
  return (
    <footer className='page-footer'>
      <a className='footer-link' href='https://github.com/Stillwell-C'>
        Stillwell-C
      </a>
      <a className='footer-link' href='https://github.com/Stillwell-C'>
        <img src={githubLogo} alt='' />
      </a>
    </footer>
  );
};

export default Footer;
