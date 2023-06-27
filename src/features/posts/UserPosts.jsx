import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetUserPostsQuery } from "../users/usersApiSlice";
import PostDisplayLargeAbbr from "../../components/PostDisplayLargeAbbr";
import PostDisplayLargeAbbrSkeleton from "../../components/PostDisplayLargeAbbrSkeleton";
import PaginationButtons from "../../components/PaginationButtons";
import ErrorPage from "../../components/ErrorPage";

const UserPosts = () => {
  const { id: userId } = useAuth();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const {
    data: postData,
    isFetching,
    isError,
  } = useGetUserPostsQuery({ userId, page: currentPage, limit: 10 });

  useEffect(() => {
    // setTotalPosts(postData?.totalPosts);
    setTotalPages(Math.ceil(postData?.totalPosts / 10) || 1);
    setPosts(postData?.posts);
  }, [postData]);

  let skeletonPosts = [];
  for (let i = 0; i < 10; i++) {
    skeletonPosts.push(<PostDisplayLargeAbbrSkeleton key={i} />);
  }

  useEffect(() => console.log(postData), [postData]);

  return (
    <div>
      {isFetching && skeletonPosts}
      {!isFetching &&
        posts &&
        posts.map((post) => (
          <PostDisplayLargeAbbr post={post} key={post._id} />
        ))}
      {!isFetching && posts && (
        <PaginationButtons
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {isError && <ErrorPage />}
    </div>
  );
};

export default UserPosts;
