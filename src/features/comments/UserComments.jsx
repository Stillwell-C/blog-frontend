import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetUserCommentsQuery } from "../users/usersApiSlice";
import CommentDisplayAbbr from "../../components/CommentDisplayAbbr";
import PaginationButtons from "../../components/PaginationButtons";
import ErrorPage from "../../components/ErrorPage";
import PostDisplayLargeAbbrSkeleton from "../../components/PostDisplayLargeAbbrSkeleton";

const UserComments = () => {
  const { id: userId } = useAuth();

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const {
    data: commentData,
    isFetching,
    isError,
    isLoading,
  } = useGetUserCommentsQuery({ userId, page: currentPage, limit: 10 });

  useEffect(() => {
    setTotalPages(Math.ceil(commentData?.totalComments / 10) || 1);
    setComments(commentData?.comments);
  }, [commentData]);

  useEffect(() => console.log("total pages: ", totalPages), [totalPages]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  let skeletonPosts = [];
  for (let i = 0; i < 10; i++) {
    skeletonPosts.push(<PostDisplayLargeAbbrSkeleton key={i} />);
  }

  return (
    <div className='flex-container flex-column flex-align-center'>
      {isFetching && skeletonPosts}
      {!isFetching &&
        comments &&
        comments.map((comment) => (
          <CommentDisplayAbbr comment={comment} key={comment._id} />
        ))}
      {!isLoading && comments && (
        <PaginationButtons
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {isError && <ErrorPage />}
    </div>
  );
};

export default UserComments;
