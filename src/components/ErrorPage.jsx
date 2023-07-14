import errorRobot from "../assets/BrokenRobot.svg";

const ErrorPage = ({ message }) => {
  let content;
  if (message) {
    content = message;
  } else {
    content = "Please try again";
  }
  return (
    <section className='fill-screen error-page flex-container flex-column flex-align-center flex-justify-center'>
      <img src={errorRobot} alt='' />
      <h2>Error</h2>
      <p>Something went wrong</p>
      <p>{content}</p>
    </section>
  );
};

export default ErrorPage;
