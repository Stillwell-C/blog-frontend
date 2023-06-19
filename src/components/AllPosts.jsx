import { useEffect, useState } from "react";
import axios from "../api/axios";
import PostDisplayLarge from "./PostDisplayLarge";
import PostDisplayLargeSkeleton from "./PostDisplayLargeSkeleton";
import AllPostsPageBtns from "./AllPostsPageBtns";

const POST_URL = "/posts";

const AllPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState();
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const axiosGet = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${POST_URL}?page=${currentPage}&limit=10`
        );
        setTotalPosts(response?.data?.totalPosts);
        setTotalPages(Math.ceil(response?.data?.totalPosts / 10) || 1);
        setPosts(response?.data?.posts);
        setIsLoading(false);
        console.log(response.data);
      } catch (err) {
        console.log(err);
        //maybe navigate to 404
      }
    };
    axiosGet();
  }, [currentPage]);

  let skeletonPosts = [];
  for (let i = 0; i < 10; i++) {
    skeletonPosts.push(<PostDisplayLargeSkeleton key={i} />);
  }

  return (
    <section className='all-posts-container fill-screen'>
      <h2>All Posts</h2>
      {isLoading && skeletonPosts}
      {!isLoading &&
        posts.map((post) => <PostDisplayLarge post={post} key={post._id} />)}
      {!isLoading && (
        <AllPostsPageBtns
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
};

export default AllPosts;
