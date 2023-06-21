import errorRobot from "../assets/BrokenRobot.svg";

const Error = () => {
  return (
    <section className='fill-screen error-page'>
      <img src={errorRobot} alt='' />
      <h2>Error</h2>
      <p>Something went wrong</p>
      <p>Please try again</p>
    </section>
  );
};

export default Error;
