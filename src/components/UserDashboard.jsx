import UserPosts from "../features/posts/UserPosts";
import useAuth from "../hooks/useAuth";

const UserDashboard = () => {
  const { username, roles } = useAuth();

  return (
    <section className='fill-screen flex-container flex-align-center flex-justify-center flex-column'>
      <div>Current User: {username}</div>
      <div>Account Status: {roles.join(", ")}</div>
      <UserPosts />
    </section>
  );
};

export default UserDashboard;
