import { Link, useLocation, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useAddNewCommentMutation } from "./commentsApiSlice";
import { useEffect, useRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const AddComment = () => {
  const { id, loggedIn } = useAuth();
  const { postID } = useParams();
  const { pathname } = useLocation();

  const errRef = useRef();

  const [commentBody, setCommentBody] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [addNewComment, { isLoading, isSuccess, isError, error }] =
    useAddNewCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!commentBody.length) {
      setErrorMsg("Must include comment");
      errRef.current.focus();
      return;
    }
    if (commentBody.length > 1000) {
      setErrorMsg("Comment must be less than 1000 characters");
      errRef.current.focus();
      return;
    }
    const trimmedCommentBody = commentBody.trim();
    addNewComment({
      author: id,
      parentPostId: postID,
      commentBody: trimmedCommentBody,
    });
  };

  useEffect(() => {
    if (isSuccess) setCommentBody("");
  }, [isSuccess]);

  useEffect(() => {
    if (!errorMsg.length) return;
    if (isError) errRef.current.focus();
  }, [isError, errorMsg]);

  let buttonContent = isLoading ? (
    <BeatLoader color='#333' size={8} />
  ) : (
    "Submit"
  );

  let content = null;
  if (!loggedIn) {
    content = (
      <div className='add-user-comment-msg'>
        To submit a comment please{" "}
        <Link to='/login' state={{ redirectPath: pathname }}>
          log in
        </Link>{" "}
        or{" "}
        <Link to='/register' state={{ redirectPath: pathname }}>
          sign up
        </Link>
        .
      </div>
    );
  }
  if (loggedIn) {
    content = (
      <div className='add-user-comment flex-container flex-column flex-align-center'>
        <div
          className={errorMsg || isError ? "form-error-div" : "error-offscreen"}
          ref={errRef}
        >
          {errorMsg}
          {error?.data?.message}
        </div>
        <div className='msg-div'></div>
        <form
          onSubmit={handleSubmit}
          className='flex-container flex-column gap-5p'
        >
          <label htmlFor='userComment'>Add comment:</label>
          <textarea
            name='userComment'
            id='userComment'
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          ></textarea>
          <button
            type='submit'
            disabled={isLoading ? true : false}
            aria-disabled={isLoading ? true : false}
            className='basic-button flex-container flex-align-center flex-justify-center'
          >
            {buttonContent}
          </button>
        </form>
      </div>
    );
  }

  return content;
};

export default AddComment;
