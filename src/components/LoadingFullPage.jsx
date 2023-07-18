import usePageTitle from "../hooks/usePageTitle";
import LoadingPage from "./LoadingPage";

const LoadingFullPage = () => {
  usePageTitle("Wild Goose Chase");
  return (
    <main className='layout'>
      <LoadingPage />
    </main>
  );
};

export default LoadingFullPage;
