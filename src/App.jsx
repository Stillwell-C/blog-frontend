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

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<PersistentLogin />}>
          <Route index element={<Home />} />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/posts'>
            <Route index element={<AllPosts />} />
            <Route path='new' element={<NewPost />} />
            <Route path=':postID' element={<Post />} />
            <Route path=':postID/edit' element={<EditPost />} />
          </Route>

          <Route path='/users'></Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
