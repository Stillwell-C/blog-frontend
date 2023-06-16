import gooseImg from "../assets/Goose.svg";
import birdFlight from "../assets/Flock-Of-Flying-Geese-Silhouette.svg";

const Home = () => {
  return (
    <section className='home-container'>
      <div className='home-top-container'>
        <div className='home-top-center'>
          <div className='home-top-center-content'>
            <h2>Waterfowl of Korea</h2>
            <p>Exploring the Avian Splendor of Korea&#39;s Wetlands</p>
            <img src={gooseImg} />
          </div>
        </div>
        <div className='home-top-posts'>
          <h3>Top Posts</h3>
          <div className='top-posts-list'>
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
          </div>
        </div>
      </div>
      <div className='home-middle-container'>
        <div className='home-middle-wrapper'>
          <img src={birdFlight} />
        </div>
      </div>
      <div className='home-bottom-container'>
        <h3>All Posts</h3>
        <div className='home-bottom-post-wrapper'>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
          <article className='post-wrapper'>
            <h4>Post title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus, molestias?
            </p>
          </article>
        </div>
        <button className='basic-button' title='More posts'>
          More
        </button>
      </div>
    </section>
  );
};

export default Home;
