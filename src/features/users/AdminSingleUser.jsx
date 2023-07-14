import { useNavigate, useParams } from "react-router-dom";
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
import ConfirmModal from "../../components/ConfirmModal";

const AdminSingleUser = () => {
  const { userID } = useParams();
  const errRef = useRef();
  const navigate = useNavigate();

  const [userCheckbox, setUserCheckbox] = useState(false);
  const [contributorCheckbox, setContributorCheckbox] = useState(false);
  const [adminCheckbox, setAdminCheckbox] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [adminConfirm, setAdminConfirm] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const modalText = "delete this account";

  const {
    data: userData,
    isLoading: dataIsLoading,
    isSuccess: dataIsSuccess,
    isError: dataIsError,
    error: dataError,
  } = useGetUserQuery(userID);

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
    if (userData?.roles.some((role) => role.match(/user/i)))
      setUserCheckbox(true);
    if (userData?.roles.some((role) => role.match(/contributor/i)))
      setContributorCheckbox(true);
    if (userData?.roles.some((role) => role.match(/admin/i))) {
      setAdminCheckbox(true);
      setAdminConfirm(true);
    }
  }, [dataIsSuccess]);

  const deleteButtonContent = !deleteIsLoading ? (
    "Delete"
  ) : (
    <BeatLoader color='#CC0000' size={8} />
  );

  const updateButtonContent = !updateIsLoading ? (
    "Save changes"
  ) : (
    <BeatLoader color='#333' size={8} />
  );

  const handleDelete = async () => {
    await deleteUser({ id: userData._id });
    navigate("/admindash");
  };

  const handleDeleteAdmin = async () => {
    await deleteUser({ id: userData._id, adminPassword });
    navigate("/admindash");
  };

  useEffect(() => {
    if (confirmDelete && !adminConfirm) {
      handleDelete();
    }
    if (confirmDelete && adminConfirm) {
      handleDeleteAdmin();
    }
  }, [confirmDelete]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrMsg("");
    if (adminConfirm) {
      setErrMsg("Cannot edit an admin profile");
      return;
    }
    let roles = [];
    if (userCheckbox) roles.push("User");
    if (contributorCheckbox) roles.push("Contributor");
    if (adminCheckbox) roles.push("Admin");

    await updateUser({ id: userData._id, roles });
  };

  useEffect(() => {
    if (errMsg.length || dataIsError || deleteIsError || updateIsError)
      errRef?.current?.focus();
  }, [errMsg, dataIsError, deleteIsError, updateIsError]);

  let editPage = (
    <>
      <div
        ref={errRef}
        className={
          errMsg.length || dataIsError || deleteIsError || updateIsError
            ? "form-error-div margin-top-2"
            : "error-offscreen"
        }
        aria-live='assertive'
      >
        {errMsg}
        {dataError?.userData?.message}
        {deleteError?.userData?.message}
        {updateError?.userData?.message}
      </div>
      <form
        onSubmit={handleUpdate}
        className='admin-user-edit-form flex-container flex-column flex-align-center'
      >
        <h2 className='margin-top-2'>Edit User: {userData?.username}</h2>
        <div>
          <p className='margin-btm-5p'>User Roles:</p>
          <div className='admin-user-edit-checkboxes flex-container'>
            <label
              htmlFor='user-checkbox'
              className='admin-user-edit-checkbox flex-container flex-align-center'
            >
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
            <label
              htmlFor='contributor-checkbox'
              className='admin-user-edit-checkbox flex-container flex-align-center'
            >
              <input
                type='checkbox'
                id='contributor-checkbox'
                name='contributor-checkbox'
                checked={contributorCheckbox}
                onChange={() => setContributorCheckbox(!contributorCheckbox)}
              />
              Contributor
            </label>
            <label
              htmlFor='admin-checkbox'
              className='admin-user-edit-checkbox flex-container flex-align-center'
            >
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
        </div>
        <div>
          <p>
            {`Created at: ${new Date(userData?.createdAt).toLocaleDateString(
              "en-us",
              dateOptions
            )}`}
          </p>
          <p>
            {`Updated at: ${new Date(userData?.updatedAt).toLocaleDateString(
              "en-us",
              dateOptions
            )}`}
          </p>
        </div>
        <div className='flex-container flex-align-center flex-justify-center margin-top-1 gap-2'>
          <button
            type='submit'
            className='basic-button flex-container flex-justify-center flex-align-center'
            disabled={deleteIsLoading || updateIsLoading ? true : false}
            style={{ minWidth: "124px" }}
          >
            {updateButtonContent}
          </button>
          <button
            type='button'
            className='basic-button delete-button flex-container flex-justify-center flex-align-center'
            onClick={() => setModalOpen(true)}
            disabled={deleteIsLoading || updateIsLoading ? true : false}
          >
            {deleteButtonContent}
          </button>
        </div>
      </form>
      {modalOpen && (
        <ConfirmModal
          text={modalText}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setConfirmTask={setConfirmDelete}
          adminConfirm={adminConfirm}
          setAdminPassword={setAdminPassword}
        />
      )}
    </>
  );

  let content;
  if (dataIsLoading) {
    content = <LoadingPage />;
  }
  if (dataIsError) {
    content = <ErrorPage message={dataError?.userData?.message} />;
  }
  if (dataIsSuccess) {
    content = editPage;
  }

  return (
    <main className='fill-screen flex-container flex-column flex-align-center'>
      {content}
    </main>
  );
};

export default AdminSingleUser;
