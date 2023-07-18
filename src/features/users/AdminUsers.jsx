import { useEffect, useRef, useState } from "react";
import PaginationButtons from "../../components/PaginationButtons";
import PostDisplayLargeAbbrSkeleton from "../../components/PostDisplayLargeAbbrSkeleton";
import { useGetAllUsersQuery } from "./usersApiSlice";
import UserDisplayAbbr from "./UserDisplayAbbr";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const errRef = useRef();

  const {
    data: userData,
    isFetching,
    isError,
    isLoading,
  } = useGetAllUsersQuery({ page: currentPage, limit: 10 });

  useEffect(() => {
    setTotalPages(Math.ceil(userData?.totalUsers / 10) || 1);
    setUsers(userData?.users);
  }, [userData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (isError) errRef?.current?.focus();
  }, [isError]);

  let skeletonPosts = [];
  for (let i = 0; i < 10; i++) {
    skeletonPosts.push(<PostDisplayLargeAbbrSkeleton key={i} />);
  }

  let userContent;
  if (!isFetching && users?.length) {
    userContent = users.map((user) => (
      <UserDisplayAbbr key={user._id} user={user} />
    ));
  } else if (!isFetching && !users?.length && !isError) {
    userContent = <p className='margin-top-1'>No comments found</p>;
  }

  let buttonContent;
  if (!isLoading && users?.length) {
    buttonContent = (
      <PaginationButtons
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  let errorContent;
  if (isError) {
    errorContent = (
      <p className='margin-top-1 .err-text' ref={errRef}>
        An error occurred. Please refresh the page.
      </p>
    );
  }

  return (
    <section className='flex-container flex-column flex-align-center'>
      {errorContent}
      {isFetching && skeletonPosts}
      {userContent}
      {buttonContent}
    </section>
  );
};

export default AdminUsers;
