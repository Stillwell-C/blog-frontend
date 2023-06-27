import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostSkeleton from "./PostSkeleton";
import dateOptions from "../utils/DateOptions";
import outlinedHeart from "../assets/heart-outline.svg";
import filledHeart from "../assets/heart-filled.svg";
import { useGetPostQuery } from "../features/posts/postsApiSlice";
import ErrorPage from "./ErrorPage";
import useAuth from "../hooks/useAuth";
import AddComment from "../features/comments/AddComment";

const Post = () => {
  const { postID } = useParams();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // const [isLoading, setIsLoading] = useState(true);
  const [postContent, setPostContent] = useState({});
  const [parsedDate, setParsedDate] = useState("");

  const { data: postData, isLoading, isError } = useGetPostQuery(postID);

  const { id, isAdmin } = useAuth();

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
        </article>
        <div className='post-like-btn-div'>
          <button
            type='button'
            className='post-like-btn basic-button'
            aria-label={`Like this post. Current likes: ${postContent?.likes}`}
          >
            <img src={outlinedHeart} alt='' /> {postContent?.likes}
          </button>
        </div>
        <div className='post-page-break'></div>
        <h3>Comments</h3>
        <AddComment />
        <div className='post-user-comments margin-top-2'></div>
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
    <section className='fill-screen single-post-container'>{content}</section>
  );
};

export default Post;
