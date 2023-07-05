import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import EditPostForm from "./EditPostForm";
import { useGetPostQuery } from "./postsApiSlice";
import { Navigate, useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";

const EditPost = () => {
  const { postID } = useParams();

  const { data: postData, isLoading, isError } = useGetPostQuery({ postID });

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
  ) : (
    <EditPostForm post={postData} />
  );

  return <section className='fill-screen'>{content}</section>;
};

export default EditPost;
