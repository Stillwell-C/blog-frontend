import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostDisplaySmall = ({ post }) => {
  const [date, setDate] = useState("");

  const displayText =
    post.text < 100 ? post.text : `${post.text.slice(0, 100)}...`;

  const parseDate = (createdDate, updatedDate) => {
    if (createdDate === updatedDate) {
      setDate(new Date(createdDate).toUTCString());
    } else {
      setDate(`Last Updated: ${new Date(createdDate).toUTCString()}`);
    }
  };

  useEffect(() => {
    parseDate(post.createdAt, post.updatedAt);
  }, []);

  return (
    <article className='post-display-small-wrapper post-wrapper'>
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
