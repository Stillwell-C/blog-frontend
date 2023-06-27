import { useParams } from "react-router-dom";
import { useGetPostCommentsQuery } from "../posts/postsApiSlice";
import { useEffect, useState } from "react";

const PostComments = () => {
  const { postID } = useParams();

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching, isSuccess, isError, error } =
    useGetPostCommentsQuery({
      postId: postID,
      limit: 10,
      page: currentPage,
    });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [isError]);

  return <div>Comments</div>;
};

export default PostComments;
