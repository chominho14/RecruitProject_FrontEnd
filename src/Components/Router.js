import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../Routes/Home/Home";
import Join from "../Routes/Join/Join";
import Login from "../Routes/Login/Login";
import Position from "../Routes/Position/Position";
import Profile from "../Routes/Profile/Profile";
import Setting from "../Routes/Profile/Setting";
import Submitted from "../Routes/Profile/Submitted";
import Resume from "../Routes/Resume/Resume";
import ErrorComponent from "./ErrorComponent";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "position/:positionId",
        element: <Position />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "join",
        element: <Join />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: "submitted",
            element: <Submitted />,
          },
          {
            path: "setting",
            element: <Setting />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
