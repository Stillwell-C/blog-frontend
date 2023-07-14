import { useEffect, useRef, useState } from "react";
import PaginationButtons from "../../components/PaginationButtons";
import { useGetMultiplePostsQuery } from "./postsApiSlice";
import PostDisplayLargeAbbrSkeleton from "../../components/PostDisplayLargeAbbrSkeleton";
import PostDisplayLargeAbbr from "../../components/PostDisplayLargeAbbr";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const errRef = useRef();

  const {
    data: postData,
    isFetching,
    isError,
    isLoading,
  } = useGetMultiplePostsQuery({ page: currentPage, limit: 10, top: false });

  useEffect(() => {
    // setTotalPosts(postData?.totalPosts);
    setTotalPages(Math.ceil(postData?.totalPosts / 10) || 1);
    setPosts(postData?.posts);
  }, [postData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (isError) errRef?.current?.focus();
  }, [isError]);

  let skeletonPosts = [];
  for (let i = 0; i < 10; i++) {
    skeletonPosts.push(<PostDisplayLargeAbbrSkeleton key={i} />);
  }

  let postContent;
  if (!isFetching && posts?.length) {
    postContent = posts.map((post) => (
      <PostDisplayLargeAbbr post={post} key={post._id} adminDisplay={true} />
    ));
  } else if (!isFetching && !posts?.length && !isError) {
    postContent = <p className='margin-top-1'>No comments found</p>;
  }

  let buttonContent;
  if (!isLoading && posts?.length) {
    buttonContent = (
      <PaginationButtons
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  let errorContent;
  if (isError) {
    errorContent = (
      <p className='margin-top-1 err-text' ref={errRef}>
        An error occurred. Please refresh the page.
      </p>
    );
  }
  return (
    <section className='flex-container flex-column flex-align-center'>
      {errorContent}
      {isFetching && skeletonPosts}
      {postContent}
      {buttonContent}
    </section>
  );
};

export default AdminPosts;
