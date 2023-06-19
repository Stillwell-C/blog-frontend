import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateOptions from "../utils/DateOptions";

const PostDisplayLarge = ({ post }) => {
  const [date, setDate] = useState("");

  const displayText =
    post.text < 250 ? post.text : `${post.text.slice(0, 250)}...`;

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
    <article className='post-display-wrapper post-display-large-wrapper'>
      <div>
        <Link to={`/posts/${post._id}`}>
          <h4>{post.title}</h4>
        </Link>
        <p className='pdl-author-display'>By: {post.author.username}</p>
        <p className='pdl-post-text'>{displayText}</p>
      </div>
      <p className='pdl-date'>{date}</p>
    </article>
  );
};

export default PostDisplayLarge;
