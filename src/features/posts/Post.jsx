import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostSkeleton from "../../components/PostSkeleton";
import dateOptions from "../../utils/DateOptions";
import outlinedHeart from "../../assets/heart-outline.svg";
import filledHeart from "../../assets/heart-filled.svg";
import { useGetPostQuery, useUpdatePostLikeMutation } from "./postsApiSlice";
import ErrorPage from "../../components/ErrorPage";
import useAuth from "../../hooks/useAuth";
import AddComment from "../comments/AddComment";
import PostComments from "../comments/PostComments";
import usePageTitle from "../../hooks/usePageTitle";
import { BeatLoader } from "react-spinners";

const Post = () => {
  const { postID } = useParams();

  const errRef = useRef();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [postContent, setPostContent] = useState({});
  const [parsedDate, setParsedDate] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(false);
  const [postTitle, setPostTitle] = useState();

  usePageTitle(postTitle || "Wild Goose Chase");

  const { id, isAdmin, loggedIn } = useAuth();

  const {
    data: postData,
    isLoading: postIsLoading,
    isError: postIsError,
    error: postError,
  } = useGetPostQuery({ postID, userID: id });

  const [updatePostLike, { isLoading: likeIsLoading, isError: likeIsError }] =
    useUpdatePostLikeMutation();

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
    setPostTitle(postData?.title);
  }, [postIsLoading]);

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

  const buttonHeart = userLike ? filledHeart : outlinedHeart;
  let buttonContent;
  if (likeIsLoading) {
    buttonContent = <BeatLoader color='#333' size={8} />;
  } else {
    buttonContent = (
      <>
        <img src={buttonHeart} alt='' /> <span>{likeCount}</span>
      </>
    );
  }

  //Maybe move to own component
  const handleLike = async () => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    if (!userLike) {
      updatePostLike({ postID, userID: id, increment: 1 });
      setUserLike(true);
      setLikeCount((prev) => prev + 1);
    } else {
      updatePostLike({ postID, userID: id, increment: -1 });
      setUserLike(false);
      setLikeCount((prev) => prev - 1);
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
          <div className='post-like-btn-div gap-5p flex-container flex-column'>
            <button
              type='button'
              className='post-like-btn gap-5p flex-container flex-align-center basic-button'
              aria-label={
                userLike
                  ? `Unlike this post. Current number of likes: ${likeCount}`
                  : `Like this post. Current number of likes: ${likeCount}`
              }
              onClick={handleLike}
              disabled={likeIsLoading}
              style={{ minWidth: "60px" }}
            >
              {buttonContent}
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

  const content = postIsError ? (
    <ErrorPage message={postError?.data?.message} />
  ) : postIsLoading ? (
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
