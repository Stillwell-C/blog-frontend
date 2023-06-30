import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetUserPostsQuery } from "../users/usersApiSlice";
import PostDisplayLargeAbbr from "../../components/PostDisplayLargeAbbr";
import PostDisplayLargeAbbrSkeleton from "../../components/PostDisplayLargeAbbrSkeleton";
import PaginationButtons from "../../components/PaginationButtons";
import ErrorPage from "../../components/ErrorPage";

const UserPosts = () => {
  const { id: userId } = useAuth();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const {
    data: postData,
    isFetching,
    isError,
    isLoading,
  } = useGetUserPostsQuery({ userId, page: currentPage, limit: 10 });

  useEffect(() => {
    // setTotalPosts(postData?.totalPosts);
    setTotalPages(Math.ceil(postData?.totalPosts / 10) || 1);
    setPosts(postData?.posts);
  }, [postData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  let skeletonPosts = [];
  for (let i = 0; i < 10; i++) {
    skeletonPosts.push(<PostDisplayLargeAbbrSkeleton key={i} />);
  }

  let postContent;
  if (!isFetching && posts?.length) {
    postContent = posts.map((post) => (
      <PostDisplayLargeAbbr post={post} key={post._id} />
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
      <p className='margin-top-1'>
        An error occurred. Please refresh the page.
      </p>
    );
  }

  return (
    <div className='flex-container flex-column flex-align-center'>
      {isFetching && skeletonPosts}
      {postContent}
      {buttonContent}
      {errorContent}
    </div>
  );
};

export default UserPosts;
