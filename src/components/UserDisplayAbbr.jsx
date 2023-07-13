import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import { useDeleteUserMutation } from "../features/users/usersApiSlice";
import dateOptions from "../utils/DateOptions";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const UserDisplayAbbr = ({ user }) => {
  const errRef = useRef();
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const modalText = "delete this account";

  const buttonContent = !isLoading ? (
    "Delete"
  ) : (
    <BeatLoader color='#CC0000' size={8} />
  );

  const handleDelete = async () => {
    if (!isAdmin) return;
    await deleteUser({ id: user._id });
  };

  useEffect(() => {
    if (confirmDelete) {
      handleDelete();
    }
  }, [confirmDelete]);

  useEffect(() => {
    if (isError) errRef.current.focus();
  }, [isError]);

  return (
    <article className='post-display-wrapper post-display-abbr-wrapper'>
      <h3>Username: {user?.username}</h3>
      <p>Roles: {user?.roles?.join(", ")}</p>
      <p>
        {`Created at: ${new Date(user?.createdAt).toLocaleDateString(
          "en-us",
          dateOptions
        )}`}
      </p>
      <p>
        {`Updated at: ${new Date(user?.updatedAt).toLocaleDateString(
          "en-us",
          dateOptions
        )}`}
      </p>
      <div className='flex-container flex-align-center flex-justify-center margin-top-1'>
        <button
          type='button'
          className='basic-button flex-container flex-justify-center flex-align-center margin-r-2'
          onClick={() => navigate(`/admindash/${user._id}`)}
        >
          Edit User
        </button>
        <button
          type='button'
          className='basic-button delete-button flex-container flex-justify-center flex-align-center'
          onClick={() => setModalOpen(true)}
          disabled={isLoading ? true : false}
          style={{ minWidth: "69px" }}
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
      {modalOpen && (
        <ConfirmModal
          text={modalText}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setConfirmTask={setConfirmDelete}
        />
      )}
    </article>
  );
};

export default UserDisplayAbbr;
