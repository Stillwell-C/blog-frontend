import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateOptions from "../utils/DateOptions";

const PostDisplayLargeAbbr = ({ post }) => {
  const [date, setDate] = useState("");

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
    <article className='post-display-wrapper post-display-abbr-wrapper'>
      <div>
        <Link to={`/posts/${post._id}`}>
          <h4>{post.title}</h4>
        </Link>
      </div>
      <p className='pdl-date'>{date}</p>
    </article>
  );
};

export default PostDisplayLargeAbbr;
