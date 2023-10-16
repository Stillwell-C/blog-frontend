import githubLogo from "../assets/github.svg";

const Footer = () => {
  return (
    <footer className='page-footer flex-container flex-justify-center gap-1'>
      <a
        className='footer-link flex-container flex-align-center'
        href='https://github.com/Stillwell-C'
      >
        Stillwell-C
      </a>
      <a
        className='footer-link flex-container flex-align-center'
        href='https://github.com/Stillwell-C'
      >
        <img src={githubLogo} alt='' />
      </a>
      <a
        className='footer-link flex-container flex-align-center'
        href='https://github.com/Stillwell-C/blog-frontend'
      >
        About
      </a>
    </footer>
  );
};

export default Footer;
