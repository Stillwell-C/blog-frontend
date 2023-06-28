import { useEffect, useState } from "react";
import dateOptions from "../utils/DateOptions";

const PostComment = ({ comment }) => {
  const [date, setDate] = useState();

  const parseDate = (createdDate, updatedDate) => {
    if (createdDate === updatedDate) {
      setDate(new Date(createdDate).toLocaleDateString("en-us", dateOptions));
    } else {
      setDate(
        `Updated: ${new Date(updatedDate).toLocaleDateString(
          "en-us",
          dateOptions
        )}`
      );
    }
  };

  useEffect(() => {
    parseDate(comment?.createdAt, comment?.updatedAt);
  }, []);

  return (
    <div role='comment' className='post-comment'>
      <h4>{comment?.author?.username}</h4>
      <p>{comment?.commentBody}</p>
      <p>{date}</p>
    </div>
  );
};

export default PostComment;
