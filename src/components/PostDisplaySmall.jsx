import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateOptions from "../utils/DateOptions";

const PostDisplaySmall = ({ post }) => {
  const [date, setDate] = useState("");

  const displayText =
    post.text < 100 ? post.text : `${post.text.slice(0, 100)}...`;

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
    parseDate(post.createdAt, post.updatedAt);
  }, []);

  return (
    <article className='post-display-small-wrapper post-display-wrapper flex-container flex-column flex-justify-between padding-1'>
      <div>
        <Link to={`/posts/${post._id}`}>
          <h4>{post.title}</h4>
        </Link>
        <p className='pds-author-display'>By: {post.author.username}</p>
        <p className='pds-post-text'>{displayText}</p>
      </div>
      <p className='pds-date'>{date}</p>
    </article>
  );
};

export default PostDisplaySmall;
