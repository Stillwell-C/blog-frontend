import { useEffect, useState } from "react";
import PostDisplayLarge from "./PostDisplayLarge";
import PostDisplayLargeSkeleton from "./PostDisplayLargeSkeleton";
import AllPostsPageBtns from "./AllPostsPageBtns";
import { useGetMultiplePostsQuery } from "../features/posts/postsApiSlice";
import Error from "./Error";

const AllPosts = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const {
    data: postData,
    isFetching,
    isError,
  } = useGetMultiplePostsQuery({
    page: currentPage,
    limit: 10,
    top: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    // setTotalPosts(postData?.totalPosts);
    setTotalPages(Math.ceil(postData?.totalPosts / 10) || 1);
    setPosts(postData?.posts);
  }, [isFetching]);

  let skeletonPosts = [];
  for (let i = 0; i < 10; i++) {
    skeletonPosts.push(<PostDisplayLargeSkeleton key={i} />);
  }

  return (
    <section className='all-posts-container fill-screen'>
      <h2>All Posts</h2>
      {isFetching && skeletonPosts}
      {!isFetching &&
        posts &&
        posts.map((post) => <PostDisplayLarge post={post} key={post._id} />)}
      {!isFetching && posts && (
        <AllPostsPageBtns
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {isError && <Error />}
    </section>
  );
};

export default AllPosts;