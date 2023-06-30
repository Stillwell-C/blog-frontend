import UserPosts from "../features/posts/UserPosts";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import UserComments from "../features/comments/UserComments";

const UserDashboard = () => {
  const { username, roles } = useAuth();
  const [displayContent, setDisplayContent] = useState("posts");

  let content;
  if (displayContent === "posts") {
    content = <UserPosts />;
  } else if (displayContent === "comments") {
    content = <UserComments />;
  }

  return (
    <section className='fill-screen flex-container flex-justify-center'>
      <div className='dashboard-content margin-top-2'>
        <h2 className='margin-btm-1'>My Page</h2>
        <p>Username: {username}</p>
        <p>Account Status: {roles.join(", ")}</p>
        <div className='dashboard-display-buttons margin-top-1'>
          <button
            type='button'
            aria-label='Display your posts'
            style={displayContent === "posts" ? { fontWeight: "bold" } : {}}
            onClick={() => setDisplayContent("posts")}
          >
            Posts
          </button>
          <button
            type='button'
            aria-label='Display your comments'
            style={displayContent === "comments" ? { fontWeight: "bold" } : {}}
            onClick={() => setDisplayContent("comments")}
          >
            Comments
          </button>
        </div>
        {content}
      </div>
    </section>
  );
};

export default UserDashboard;
