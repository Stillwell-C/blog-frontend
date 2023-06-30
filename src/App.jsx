import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import NewPost from "./components/NewPost";
import Post from "./components/Post";
import AllPosts from "./components/AllPosts";
import EditPost from "./features/posts/EditPost";
import PersistentLogin from "./features/auth/PersistentLogin";
import UserDashboard from "./components/UserDashboard";
import RequireLogin from "./features/auth/RequireLogin";
import RequireRole from "./features/auth/RequireRole";
import UserPosts from "./features/posts/UserPosts";
import AdminDashboard from "./components/AdminDashboard";
import EditUserInfo from "./features/users/EditUserInfo";

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

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

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

          <Route path='/users'></Route>

          <Route element={<RequireLogin />}>
            <Route path='/mypage'>
              <Route index element={<UserDashboard />} />
              <Route path='edit' element={<EditUserInfo />} />
            </Route>
          </Route>

          <Route element={<RequireRole requiredRoles={[roles.Admin]} />}>
            <Route path='/admindash' element={<AdminDashboard />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
