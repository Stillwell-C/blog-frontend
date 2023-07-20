import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import EditPostForm from "./EditPostForm";
import { useGetPostQuery } from "./postsApiSlice";
import { Navigate, useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import usePageTitle from "../../hooks/usePageTitle";
import ErrorPage from "../../components/ErrorPage";

const EditPost = () => {
  const { postID } = useParams();

  usePageTitle("Edit Post");

  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useGetPostQuery({ postID });

  const { id, isAdmin } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAdmin || postData?.author._id !== id) {
        <Navigate to='/' state={{ from: location }} replace />;
      }
    }
  }, [isLoading]);

  const content = isLoading ? (
    <LoadingPage />
  ) : isError ? (
    <ErrorPage message={error?.data?.message} />
  ) : (
    <EditPostForm post={postData} />
  );

  return <main className='fill-screen flex-container'>{content}</main>;
};

export default EditPost;
