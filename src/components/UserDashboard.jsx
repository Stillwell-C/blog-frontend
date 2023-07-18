import UserPosts from "../features/posts/UserPosts";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import UserComments from "../features/comments/UserComments";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const UserDashboard = () => {
  const { username, roles } = useAuth();

  usePageTitle("My Page");

  const navigate = useNavigate();

  const [displayContent, setDisplayContent] = useState("posts");

  let content;
  if (displayContent === "posts") {
    content = <UserPosts />;
  } else if (displayContent === "comments") {
    content = <UserComments />;
  }

  return (
    <main className='fill-screen flex-container flex-justify-center'>
      <div className='dashboard-content flex-container flex-column flex-align-center margin-top-2'>
        <div className='flex-container flex-align-center margin-btm-1 gap-2'>
          <h2>My Page</h2>
          <button
            className='basic-button'
            onClick={() => navigate("/mypage/edit")}
          >
            Edit user info
          </button>
        </div>
        <p>Username: {username}</p>
        <p>Account Status: {roles.join(", ")}</p>
        <div className='dashboard-display-buttons flex-container flex-justify-center margin-top-1'>
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
    </main>
  );
};

export default UserDashboard;
