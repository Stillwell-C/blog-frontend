import { useEffect, useState } from "react";
import dateOptions from "../utils/DateOptions";
import { useNavigate } from "react-router-dom";
import { useDeleteCommentMutation } from "../features/comments/commentsApiSlice";
import { BeatLoader } from "react-spinners";
import ConfirmModal from "./ConfirmModal";

const CommentDisplayAbbr = ({ comment }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const modalText = "delete this comment";

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

  const [deleteComment, { isLoading, isError, error }] =
    useDeleteCommentMutation();

  useEffect(() => {
    parseDate(comment.createdAt, comment.updatedAt);
  }, []);

  useEffect(() => {
    if (isError) console.log(error);
  }, [isError]);

  const commentDisplay =
    comment.commentBody.length > 200
      ? `${comment.commentBody.slice(0, 200)}...`
      : comment.commentBody;

  const buttonContent = !isLoading ? (
    "Delete"
  ) : (
    <BeatLoader color='#CC0000' size={8} />
  );

  const handleDelete = async () => {
    await deleteComment({ id: comment._id });
  };

  useEffect(() => {
    if (confirmDelete) {
      handleDelete();
    }
  }, [confirmDelete]);

  return (
    <div className='comment-display' role='comment'>
      <p>{commentDisplay}</p>
      <p>{date}</p>
      <div className='comment-button-div'>
        <button
          className='basic-button'
          type='button'
          onClick={() => navigate(`/posts/${comment.parentPostId}`)}
        >
          Open post
        </button>
        <button
          type='button'
          className='basic-button delete-button flex-container flex-justify-center flex-align-center'
          onClick={() => setModalOpen(true)}
          disabled={isLoading ? true : false}
        >
          {buttonContent}
        </button>
      </div>
      {modalOpen && (
        <ConfirmModal
          text={modalText}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setConfirmTask={setConfirmDelete}
        />
      )}
    </div>
  );
};

export default CommentDisplayAbbr;
