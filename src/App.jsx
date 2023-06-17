import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import NewPost from "./components/NewPost";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/posts'>
          <Route path='new' element={<NewPost />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
