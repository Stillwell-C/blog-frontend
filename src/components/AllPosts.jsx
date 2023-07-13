import { useEffect, useState } from "react";
import PostDisplayLarge from "./PostDisplayLarge";
import PostDisplayLargeSkeleton from "./PostDisplayLargeSkeleton";
import PaginationButtons from "./PaginationButtons";
import { useGetMultiplePostsQuery } from "../features/posts/postsApiSlice";
import ErrorPage from "./ErrorPage";

const AllPosts = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const {
    data: postData,
    isFetching,
    isError,
    isLoading,
  } = useGetMultiplePostsQuery({
    page: currentPage,
    limit: 10,
    top: false,
  });

  // useEffect(() => {
  //   console.log("Page: ", currentPage);
  // }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    // setTotalPosts(postData?.totalPosts);
    setTotalPages(Math.ceil(postData?.totalPosts / 10) || 1);
    setPosts(postData?.posts);
    console.log("page: ", currentPage, "data: ", postData);
  }, [postData]);

  // useEffect(() => {
  //   // setTotalPosts(postData?.totalPosts);
  //   setTotalPages(Math.ceil(postData?.totalPosts / 10) || 1);
  //   setPosts(postData?.ids.map((id) => postData.entities[id]));
  //   console.log("page: ", currentPage, "data: ", postData);
  // }, [postData]);

  let skeletonPosts = [];
  for (let i = 0; i < 10; i++) {
    skeletonPosts.push(<PostDisplayLargeSkeleton key={i} />);
  }

  return (
    <main className='all-posts-container fill-screen'>
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
      {isError && <ErrorPage />}
    </main>
  );
};

export default AllPosts;
