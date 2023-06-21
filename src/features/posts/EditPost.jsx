import EditPostForm from "./EditPostForm";
import { useGetPostQuery } from "./postsApiSlice";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { postID } = useParams();

  const { data: postData, isLoading, isError } = useGetPostQuery(postID);

  const content = isLoading ? (
    <p>Loading...</p>
  ) : (
    <EditPostForm post={postData} />
  );

  return <section className='fill-screen'>{content}</section>;
};

export default EditPost;
