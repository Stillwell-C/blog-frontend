import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostSkeleton from "./PostSkeleton";
import dateOptions from "../utils/DateOptions";
import outlinedHeart from "../assets/heart-outline.svg";
import filledHeart from "../assets/heart-filled.svg";
import {
  useGetPostQuery,
  useUpdatePostLikeMutation,
} from "../features/posts/postsApiSlice";
import ErrorPage from "./ErrorPage";
import useAuth from "../hooks/useAuth";
import AddComment from "../features/comments/AddComment";
import PostComments from "../features/comments/PostComments";

const Post = () => {
  const { postID } = useParams();

  const errRef = useRef();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // const [isLoading, setIsLoading] = useState(true);
  const [postContent, setPostContent] = useState({});
  const [parsedDate, setParsedDate] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(false);

  const { id, isAdmin, loggedIn } = useAuth();

  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useGetPostQuery({ postID, userID: id });

  const [
    updatePostLike,
    { isLoading: likeIsLoading, isError: likeIsError, error: likeError },
  ] = useUpdatePostLikeMutation();

  const parseDate = (createdDate, updatedDate) => {
    if (createdDate === updatedDate) {
      setParsedDate(
        new Date(createdDate).toLocaleDateString("en-us", dateOptions)
      );
    } else {
      setParsedDate(
        `Last Updated: ${new Date(createdDate).toLocaleDateString(
          "en-us",
          dateOptions
        )}`
      );
    }
  };

  useEffect(() => {
    parseDate(postData?.createdAt, postData?.updatedAt);
    setPostContent(postData);
    setLikeCount(postData?.likes);
    setUserLike(postData?.userLikesPost);
  }, [isLoading]);

  let editButtons = null;
  if (id === postContent?.author?._id || isAdmin) {
    editButtons = (
      <button
        className='basic-button'
        type='button'
        onClick={() => navigate(`${pathname}/edit`)}
      >
        Edit Post
      </button>
    );
  }

  let buttonHeart = userLike ? filledHeart : outlinedHeart;

  //Maybe move to own component
  const handleLike = async () => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    if (!userLike) {
      try {
        await updatePostLike({ postID, userID: id, increment: 1 });
        setUserLike(true);
        setLikeCount((prev) => prev + 1);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await updatePostLike({ postID, userID: id, increment: -1 });
        setUserLike(false);
        setLikeCount((prev) => prev - 1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  let likeErrorMsg = likeIsError ? "Error. Please refresh page." : "";

  useEffect(() => {
    if (likeIsError) errRef.current.focus();
  }, [likeIsError]);

  const LoadedPage = (
    <>
      <div className='single-post-content'>
        <article>
          <h2>{postContent?.title}</h2>
          <div className='single-post-author'>
            <span>By: {postContent?.author?.username}</span>
          </div>
          <div className='single-post-date'>
            <span>{parsedDate}</span>
          </div>
          <div className='single-post-epigraph-content'>
            <p className='epigraph-text'>{postContent?.epigraph}</p>
            <p className='epigraph-author'>{`  - ${postContent?.epigraphAuthor}`}</p>
          </div>
          <div className='single-post-text'>
            <p>{postContent?.text}</p>
          </div>
          <div className='edit-post-btn-div margin-top-2'>{editButtons}</div>
          <div className='post-like-btn-div flex-container flex-column'>
            <button
              type='button'
              className='post-like-btn flex-container flex-align-center basic-button'
              aria-label={
                userLike
                  ? `Unlike this post. Current number of likes: ${likeCount}`
                  : `Like this post. Current number of likes: ${likeCount}`
              }
              onClick={handleLike}
            >
              <img src={buttonHeart} alt='' /> {likeCount}
            </button>
            <div
              className={likeIsError ? "form-error-div" : "error-offscreen"}
              ref={errRef}
              aria-live='assertive'
            >
              {likeErrorMsg}
            </div>
          </div>
        </article>
        <div className='post-page-break'></div>
        <section>
          <h3>Comments</h3>
          <AddComment />
          <PostComments />
        </section>
      </div>
    </>
  );

  const content = isError ? (
    <ErrorPage />
  ) : isLoading ? (
    <PostSkeleton />
  ) : (
    LoadedPage
  );

  return (
    <main className='fill-screen flex-container flex-justify-center padding-2'>
      {content}
    </main>
  );
};

export default Post;
