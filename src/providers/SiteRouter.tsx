import Forgot from "@/pages/Auth/Forgot/Forgot";
import Registration from "@/pages/Auth/Registration/Registration";
import ResetPassword from "@/pages/Auth/ResetPassword/ResetPassword";
import Signin from "@/pages/Auth/Signin/Signin";
import Home from "@/pages/Public/Home/Home";
import { ReactNode, FC } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "/auth/signin",
        element: <Signin />,
      },
      {
        path: "/auth/registration",
        element: <Registration />,
      },
      {
        path: "/auth/forgot",
        element: <Forgot />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

const SiteRouter: FC = (): ReactNode => (
  <>
    <RouterProvider router={router} />
  </>
);

export default SiteRouter;
