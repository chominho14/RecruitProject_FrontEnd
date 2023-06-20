import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Application from "../Routes/Application/Application";
import ApplyList from "../Routes/Company/ApplyList";
import CompanyJoin from "../Routes/Company/CompanyJoin";
import Upload from "../Routes/Company/Upload";
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
import ApplyListId from "../Routes/Company/ApplyListId";
import Saves from "../Routes/Profile/Saves";
import PositionModify from "../Routes/Position/PositionModify";
import Certification from "../Routes/Company/Certification";

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
        path: "position/modify/:positionId",
        element: <PositionModify />,
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

      {
        path: "profile/saves",
        element: <Saves />,
      },
      {
        path: "application/:positionId",
        element: <Application />,
      },
      {
        path: "company/upload",
        element: <Upload />,
      },
      {
        path: "company/companyjoin",
        element: <CompanyJoin />,
      },
      {
        path: "company/certification",
        element: <Certification />,
      },
      {
        path: "company/positionList",
        element: <ApplyList />,
      },
      {
        path: "company/positionList/:positionId",
        element: <ApplyListId />,
      },
    ],

    errorElement: <NotFound />,
  },
]);

export default router;
