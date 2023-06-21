import gooseImg from "../assets/Goose.svg";
import birdFlight from "../assets/Flock-Of-Flying-Geese-Silhouette.svg";
import { useEffect, useState } from "react";
import HomeTopPosts from "./HomeTopPosts";
import HomeRecentPosts from "./HomeRecentPosts";
import { useNavigate } from "react-router-dom";
import { useGetMultiplePostsQuery } from "../features/posts/postsApiSlice";
import Error from "./Error";

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
    setTopPosts(postData?.top);
    setPosts(postData?.posts);
  }, [isLoading]);

  const content = (
    <section className='home-container fill-screen'>
      <div className='home-top-container'>
        <div className='home-top-center'>
          <div className='home-top-center-content'>
            <h2>Waterfowl of Korea</h2>
            <p>Exploring the Avian Splendor of Korea&#39;s Wetlands</p>
            <img className='fade-in' src={gooseImg} />
          </div>
        </div>
        <div className='home-top-posts'>
          <h3>Top Posts</h3>
          {<HomeTopPosts topPosts={topPosts} isLoading={isLoading} />}
        </div>
      </div>
      <div className='home-middle-container'>
        <div className='home-middle-wrapper'>
          <img className='fade-in' src={birdFlight} />
        </div>
      </div>
      <div className='home-bottom-container'>
        <h3>Recent Posts</h3>
        <div className='home-bottom-post-wrapper'>
          {<HomeRecentPosts posts={posts} isLoading={isLoading} />}
        </div>
        <button
          className='basic-button'
          title='More posts'
          onClick={() => navigate("/posts")}
        >
          More
        </button>
      </div>
    </section>
  );

  return isError ? <Error /> : content;
};

export default Home;
