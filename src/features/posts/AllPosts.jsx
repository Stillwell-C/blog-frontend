import { useEffect, useState } from "react";
import PostDisplayLarge from "../../components/PostDisplayLarge";
import PostDisplayLargeSkeleton from "../../components/PostDisplayLargeSkeleton";
import PaginationButtons from "../../components/PaginationButtons";
import { useGetMultiplePostsQuery } from "./postsApiSlice";
import ErrorPage from "../../components/ErrorPage";
import usePageTitle from "../../hooks/usePageTitle";

const AllPosts = () => {
  usePageTitle("All Posts");

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const {
    data: postData,
    isFetching,
    isError,
    isLoading,
    error,
  } = useGetMultiplePostsQuery({
    page: currentPage,
    limit: 10,
    top: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(postData?.totalPosts / 10) || 1);
    setPosts(postData?.posts);
  }, [postData]);

  let skeletonPosts = [];
  for (let i = 0; i < 10; i++) {
    skeletonPosts.push(<PostDisplayLargeSkeleton key={i} />);
  }

  return (
    <main className='all-posts-container gap-10p fill-screen padding-2 flex-container flex-column flex-align-center'>
      <h2>All Posts</h2>
      {isFetching && skeletonPosts}
      {!isFetching &&
        posts &&
        posts.map((post) => <PostDisplayLarge post={post} key={post._id} />)}
      {!isLoading && posts && (
        <PaginationButtons
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {isError && <ErrorPage message={error?.data?.message} />}
    </main>
  );
};

export default AllPosts;
