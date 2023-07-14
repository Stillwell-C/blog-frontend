import gooseImg from "../assets/Goose.svg";
import birdFlight from "../assets/Flock-Of-Flying-Geese-Silhouette.svg";
import { useEffect, useState } from "react";
import HomeTopPosts from "./HomeTopPosts";
import HomeRecentPosts from "./HomeRecentPosts";
import { useNavigate } from "react-router-dom";
import { useGetMultiplePostsQuery } from "../features/posts/postsApiSlice";
import ErrorPage from "./ErrorPage";

const Home = () => {
  const navigate = useNavigate();

  const {
    data: postData,
    isLoading,
    isError,
  } = useGetMultiplePostsQuery({
    page: 1,
    limit: 12,
    top: true,
  });

  // const [isLoading, setIsLoading] = useState(true);
  const [topPosts, setTopPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (postData) {
      setTopPosts(postData?.top);
      setPosts(postData?.posts);
    }
    console.log("post data: ", postData);
  }, [isLoading]);

  // useEffect(() => {
  //   setTopPosts(
  //     postData?.ids
  //       ?.filter((id) => postData.entities[id].top === true)
  //       .map((id) => postData.entities[id])
  //   );
  //   setPosts(
  //     postData?.ids
  //       ?.filter((id) => postData.entities[id].top !== true)
  //       .map((id) => postData.entities[id])
  //   );
  //   console.log("post data: ", postData);
  // }, [isLoading]);

  const content = (
    <main className='fill-screen'>
      <section className='home-top-container padding-2 flex-container flex-column'>
        <div className='home-top-center flex-container flex-align-center flex-justify-center'>
          <div className='home-top-center-content flex-continer flex-column'>
            <h2>Waterfowl of Korea</h2>
            <p>Exploring the Avian Splendor of Korea&#39;s Wetlands</p>
            <img className='fade-in' src={gooseImg} alt='grayscale goose' />
          </div>
        </div>
        <aside className='home-top-posts flex-container flex-column flex-align-center'>
          <h3>Top Posts</h3>
          {<HomeTopPosts topPosts={topPosts} isLoading={isLoading} />}
        </aside>
      </section>
      <div className='home-middle-container padding-2'>
        <div className='home-middle-wrapper flex-container flex-align-center flex-justify-center'>
          <img
            className='fade-in'
            src={birdFlight}
            alt='flock of birds flying'
          />
        </div>
      </div>
      <section className='home-bottom-container flex-container flex-column flex-align-center'>
        <h3>Recent Posts</h3>
        <div className='home-bottom-post-wrapper flex-container flex-justify-center gap-20p'>
          {<HomeRecentPosts posts={posts} isLoading={isLoading} />}
        </div>
        <button
          className='basic-button'
          title='More posts'
          onClick={() => navigate("/posts")}
        >
          More
        </button>
      </section>
    </main>
  );

  return isError ? <ErrorPage /> : content;
};

export default Home;
