import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import dateOptions from "../utils/DateOptions";
import { BeatLoader } from "react-spinners";
import { useDeletePostMutation } from "../features/posts/postsApiSlice";
import useAuth from "../hooks/useAuth";

const PostDisplayLargeAbbr = ({ post, adminDisplay = false }) => {
  const [date, setDate] = useState("");
  const errRef = useRef();

  const { isAdmin } = useAuth();

  const [deletePost, { isLoading, isSuccess, isError, error }] =
    useDeletePostMutation();

  const parseDate = (createdDate, updatedDate) => {
    if (createdDate === updatedDate) {
      setDate(new Date(createdDate).toLocaleDateString("en-us", dateOptions));
    } else {
      setDate(
        `Updated: ${new Date(updatedDate).toLocaleDateString(
          "en-us",
          dateOptions
        )}`
      );
    }
  };

  useEffect(() => {
    parseDate(post.createdAt, post.updatedAt);
  }, []);

  const buttonContent = !isLoading ? (
    "Delete"
  ) : (
    <BeatLoader color='#CC0000' size={8} />
  );

  const handleDelete = async () => {
    if (!isAdmin) return;
    await deletePost({ id: post._id });
  };

  useEffect(() => {
    if (isError && adminDisplay) errRef.current.focus();
  }, [isError]);

  let adminButtons = null;
  if (adminDisplay) {
    adminButtons = (
      <>
        <div className='flex-container flex-align-center flex-justify-center margin-top-1'>
          <button
            type='button'
            className='basic-button delete-button flex-container flex-justify-center flex-align-center'
            onClick={() => handleDelete()}
            disabled={isLoading ? true : false}
          >
            {buttonContent}
          </button>
        </div>
        <div
          className={isError ? "form-error-div" : "error-offscreen"}
          ref={errRef}
          aria-live='assertive'
        >
          {error}
        </div>
      </>
    );
  }

  return (
    <article className='post-display-wrapper post-display-abbr-wrapper'>
      <div>
        <Link to={`/posts/${post._id}`}>
          <h4>{post.title}</h4>
        </Link>
      </div>
      <p className='pdl-date'>{date}</p>
      {adminButtons}
    </article>
  );
};

export default PostDisplayLargeAbbr;
