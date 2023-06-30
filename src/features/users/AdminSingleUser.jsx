import { useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "./usersApiSlice";
import LoadingPage from "../../components/LoadingPage";
import ErrorPage from "../../components/ErrorPage";
import dateOptions from "../../utils/DateOptions";
import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";

const AdminSingleUser = () => {
  const { userID } = useParams();
  const errRef = useRef();

  const [userCheckbox, setUserCheckbox] = useState(false);
  const [contributorCheckbox, setContributorCheckbox] = useState(false);
  const [adminCheckbox, setAdminCheckbox] = useState(false);

  const { data, isLoading, isSuccess, isError, error } =
    useGetUserQuery(userID);

  const [
    updateUser,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  const [
    deleteUser,
    {
      isLoading: deleteIsLoading,
      isSuccess: deleteIsSuccess,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (data?.roles.some((role) => role.match(/user/i))) setUserCheckbox(true);
    if (data?.roles.some((role) => role.match(/contributor/i)))
      setContributorCheckbox(true);
    if (data?.roles.some((role) => role.match(/admin/i)))
      setAdminCheckbox(true);
  }, [isSuccess]);

  const deleteButtonContent = !deleteIsLoading ? (
    "Delete"
  ) : (
    <BeatLoader color='#CC0000' size={8} />
  );

  const updateButtonContent = !updateIsLoading ? (
    "Edit User"
  ) : (
    <BeatLoader color='#333' size={8} />
  );

  const handleDelete = async () => {
    await deleteUser({ id: data._id });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let roles = [];
    if (userCheckbox) roles.push("User");
    if (contributorCheckbox) roles.push("Contributor");
    if (adminCheckbox) roles.push("Admin");

    await updateUser({ id: data._id, roles });
  };

  let editPage = (
    <>
      <div
        ref={errRef}
        className={
          isError || deleteIsError || updateIsError
            ? "form-error-div"
            : "error-offscreen"
        }
        aria-live='assertive'
      >
        {error?.data?.message}
        {deleteError?.data?.message}
        {updateError?.data?.message}
      </div>
      <form onSubmit={handleUpdate}>
        <h2 className='margin-top-2'>Edit User: {data?.username}</h2>
        <p>User Roles:</p>
        <div>
          <label className='margin-r-1' htmlFor='user-checkbox'>
            <input
              type='checkbox'
              id='user-checkbox'
              name='user-checkbox'
              disabled
              checked={userCheckbox}
              onChange={() => setUserCheckbox(!userCheckbox)}
            />
            User
          </label>
          <label className='margin-r-1' htmlFor='contributor-checkbox'>
            <input
              type='checkbox'
              id='contributor-checkbox'
              name='contributor-checkbox'
              checked={contributorCheckbox}
              onChange={() => setContributorCheckbox(!contributorCheckbox)}
            />
            Contributor
          </label>
          <label className='margin-r-1' htmlFor='admin-checkbox'>
            <input
              type='checkbox'
              id='admin-checkbox'
              name='admin-checkbox'
              checked={adminCheckbox}
              onChange={() => setAdminCheckbox(!adminCheckbox)}
            />
            Admin
          </label>
        </div>
        <p>
          Created at:
          {new Date(data?.createdAt).toLocaleDateString("en-us", dateOptions)}
        </p>
        <p>
          Updated at:
          {new Date(data?.updatedAt).toLocaleDateString("en-us", dateOptions)}
        </p>
        <div className='flex-container flex-align-center flex-justify-center margin-top-1'>
          <button
            type='submit'
            className='basic-button flex-container flex-justify-center flex-align-center margin-r-2'
            disabled={deleteIsLoading || updateIsLoading ? true : false}
          >
            {updateButtonContent}
          </button>
          <button
            type='button'
            className='basic-button delete-button flex-container flex-justify-center flex-align-center'
            onClick={handleDelete}
            disabled={deleteIsLoading || updateIsLoading ? true : false}
          >
            {deleteButtonContent}
          </button>
        </div>
      </form>
    </>
  );

  let content;
  if (isLoading) {
    content = <LoadingPage />;
  }
  if (isError) {
    content = <ErrorPage message={error?.data?.message} />;
  }
  if (isSuccess) {
    content = editPage;
  }

  return (
    <section className='fill-screen flex-container flex-column flex-align-center'>
      {content}
    </section>
  );
};

export default AdminSingleUser;
