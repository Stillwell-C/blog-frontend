import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetUserCommentsQuery } from "../users/usersApiSlice";
import CommentDisplayAbbr from "../../components/CommentDisplayAbbr";
import PaginationButtons from "../../components/PaginationButtons";
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

  let commentContent;
  if (!isFetching && comments?.length) {
    commentContent = comments.map((comment) => (
      <CommentDisplayAbbr comment={comment} key={comment._id} />
    ));
  } else if (!isFetching && !comments?.length) {
    commentContent = <p className='margin-top-1'>No comments found</p>;
  }

  let buttonContent;
  if (!isLoading && comments) {
    <PaginationButtons
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />;
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
      {commentContent}
      {buttonContent}
      {errorContent}
    </div>
  );
};

export default UserComments;
