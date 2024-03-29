import { useParams } from "react-router-dom";
import { useGetPostCommentsQuery } from "../posts/postsApiSlice";
import { useEffect, useRef, useState } from "react";
import PostComment from "../../components/PostComment";
import { ScaleLoader, BeatLoader } from "react-spinners";

const PostComments = () => {
  const { postID } = useParams();

  const [commentData, setCommentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const runEffect = useRef(false);

  const { data, isFetching, isSuccess, isError } = useGetPostCommentsQuery({
    postId: postID,
    limit: 10,
    page: currentPage,
  });

  useEffect(() => {
    if (
      (runEffect.current === true || process.env.NODE_ENV !== "development") &&
      data?.comments
    ) {
      setCommentData((prev) => [...prev, ...data.comments]);
      setTotalPages(Math.ceil(data?.totalComments / 10) || 1);
    }

    return () => (runEffect.current = true);
  }, [data]);

  let buttonContent = isFetching ? (
    <BeatLoader color='#333' size={8} />
  ) : (
    "More Comments"
  );

  const morePostsButton = (
    <button
      type='button'
      className='basic-button margin-top-1'
      style={{ minWidth: "140px" }}
      onClick={() => setCurrentPage((prev) => prev + 1)}
    >
      {buttonContent}
    </button>
  );

  let content = null;
  if (commentData?.length && isSuccess) {
    content = (
      <>
        {commentData.map((comment) => (
          <PostComment comment={comment} key={comment._id} />
        ))}
        {totalPages > currentPage && morePostsButton}
      </>
    );
  } else if (!commentData?.length && isSuccess) {
    content = <p>No comments yet. Be the first to comment.</p>;
  } else if (!commentData?.length && isFetching) {
    content = (
      <ScaleLoader className='post-comments-loader' color='#333' height={45} />
    );
  } else if (isError) {
    content = (
      <p className='.err-text'>
        An error has occurred. Refresh page to see comments.
      </p>
    );
  }

  return (
    <div className='flex-container flex-column post-comments-container gap-1'>
      {content}
    </div>
  );
};

export default PostComments;
