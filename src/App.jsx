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
            <Route path='/mypage' element={<UserDashboard />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
