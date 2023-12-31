import { Link } from "react-router-dom";
import birdImg from "../assets/frog-in-mouth.svg";
import usePageTitle from "../hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("Error. Not Found.");
  return (
    <section className='error-page fill-screen flex-container flex-column flex-align-center flex-justify-center padding-1'>
      <img src={birdImg} alt='' />
      <h2>404 Not Found</h2>
      <p>seems you&apos;re on your own wild goose chase</p>
      <Link to='/'>Home</Link>
    </section>
  );
};

export default NotFound;
