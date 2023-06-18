import gooseImg from "../assets/Goose.svg";
import birdFlight from "../assets/Flock-Of-Flying-Geese-Silhouette.svg";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import HomeTopPosts from "./HomeTopPosts";
import HomeRecentPosts from "./HomeRecentPosts";

const POST_URL = "/posts?top=true&limit=12";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topPosts, setTopPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const response = await axios.get(`${POST_URL}`);
        console.log(response.data);
        setTopPosts(response.data.top);
        setPosts(response.data.posts);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        //maybe navigate to 404
      }
    };
    axiosGet();
  }, []);
  return (
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
          {/* <div className='top-posts-list'>
            <article className='post-wrapper'>
              <h4>Top post 1</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus, molestias?
              </p>
            </article>
            <article className='post-wrapper'>
              <h4>Top post 2</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus, molestias?
              </p>
            </article>
            <article className='post-wrapper'>
              <h4>Top post 2</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus, molestias?
              </p>
            </article>
          </div> */}
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

          {/* <div className='post-display-small-wrapper loading'>
            <div className='pds-title-loading-wrapper'>
              <div className='pds-title-loading short'></div>
              <div className='pds-title-loading'></div>
            </div>
            <div className='pds-text-loading-wrapper'>
              <div className='pds-text-loading short'></div>
              <div className='pds-text-loading'></div>
              <div className='pds-text-loading'></div>
              <div className='pds-text-loading'></div>
              <div className='pds-text-loading short'></div>
            </div>
          </div>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-display-small-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article> */}
        </div>
        <button className='basic-button' title='More posts'>
          More
        </button>
      </div>
    </section>
  );
};

export default Home;
