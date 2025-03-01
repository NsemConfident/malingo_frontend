import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostActivityForm from "../pages/PostActivityForm";
import CreateActivity from "../pages/CreateActivity";
import LoginForm from "../pages/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login-form",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/post-activity",
    element: <PostActivityForm />,
  },
  {
    path: "/create-activity",
    element: <CreateActivity/>
  },
]);
const MalingoRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MalingoRoutes;
