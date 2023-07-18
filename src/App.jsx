import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./features/posts/Home";
import Register from "./features/users/Register";
import Login from "./features/auth/Login";
import NotFound from "./components/NotFound";
import NewPost from "./features/posts/NewPost";
import Post from "./features/posts/Post";
import AllPosts from "./features/posts/AllPosts";
import EditPost from "./features/posts/EditPost";
import PersistentLogin from "./features/auth/PersistentLogin";
import UserDashboard from "./components/UserDashboard";
import RequireLogin from "./features/auth/RequireLogin";
import RequireRole from "./features/auth/RequireRole";
import AdminDashboard from "./components/AdminDashboard";
import EditUserInfo from "./features/users/EditUserInfo";
import AdminSingleUser from "./features/users/AdminSingleUser";
import RequireLogout from "./features/auth/RequireLogout";

const roles = {
  User: "User",
  Contributor: "Contributor",
  Admin: "Admin",
};

function App() {
  return (
    <Routes>
      <Route element={<PersistentLogin />}>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<RequireLogout />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>

          <Route path='/posts'>
            <Route index element={<AllPosts />} />
            <Route path='new' element={<NewPost />} />
            <Route path=':postID' element={<Post />} />
            <Route
              element={
                <RequireRole requiredRoles={[roles.Contributor, roles.Admin]} />
              }
            >
              <Route path=':postID/edit' element={<EditPost />} />
            </Route>
          </Route>

          <Route element={<RequireLogin />}>
            <Route path='/mypage'>
              <Route index element={<UserDashboard />} />
              <Route path='edit' element={<EditUserInfo />} />
            </Route>
          </Route>

          <Route element={<RequireRole requiredRoles={[roles.Admin]} />}>
            <Route path='/admindash'>
              <Route index element={<AdminDashboard />} />
              <Route path=':userID' element={<AdminSingleUser />} />
            </Route>
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
