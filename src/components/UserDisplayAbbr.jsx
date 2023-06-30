import { useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import { useDeleteUserMutation } from "../features/users/usersApiSlice";
import dateOptions from "../utils/DateOptions";

const UserDisplayAbbr = ({ user }) => {
  const errRef = useRef();
  const { isAdmin } = useAuth();

  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();

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
    if (isError) errRef.current.focus();
  }, [isError]);

  return (
    //Fix class
    <article className='post-display-wrapper post-display-abbr-wrapper'>
      <h3>Username: {user?.username}</h3>
      <p>Roles: {user?.roles?.join(", ")}</p>
      <p>
        Created at:{" "}
        {new Date(user?.createdAt).toLocaleDateString("en-us", dateOptions)}
      </p>
      <p>
        Updated at:{" "}
        {new Date(user?.updatedAt).toLocaleDateString("en-us", dateOptions)}
      </p>
      <div className='flex-container flex-align-center flex-justify-center margin-top-1'>
        <button
          type='button'
          className='basic-button delete-button flex-container flex-justify-center flex-align-center'
          onClick={() => handleDelete({ id: post._id })}
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
    </article>
  );
};

export default UserDisplayAbbr;
