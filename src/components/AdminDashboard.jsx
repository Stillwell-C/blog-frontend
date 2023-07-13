import { useState } from "react";
import AdminPosts from "../features/posts/AdminPosts";
import AdminComments from "../features/comments/AdminComments";
import AdminUsers from "../features/users/AdminUsers";

const AdminDashboard = () => {
  const [displayContent, setDisplayContent] = useState("users");

  let content;
  if (displayContent === "users") {
    content = <AdminUsers />;
  } else if (displayContent === "posts") {
    content = <AdminPosts />;
  } else if (displayContent === "comments") {
    content = <AdminComments />;
  }

  return (
    <main className='fill-screen flex-container flex-justify-center'>
      <div className='dashboard-content margin-top-2'>
        <h2>Admin Dashboard</h2>
        <div className='dashboard-display-buttons margin-top-1'>
          <button
            type='button'
            aria-label='Display users'
            style={displayContent === "users" ? { fontWeight: "bold" } : {}}
            onClick={() => setDisplayContent("users")}
          >
            Users
          </button>
          <button
            type='button'
            aria-label='Display posts'
            style={displayContent === "posts" ? { fontWeight: "bold" } : {}}
            onClick={() => setDisplayContent("posts")}
          >
            Posts
          </button>
          <button
            type='button'
            aria-label='Display comments'
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

export default AdminDashboard;
