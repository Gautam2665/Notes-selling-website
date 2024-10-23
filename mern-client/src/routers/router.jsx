import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Buy from "../components/Buy";
import SingleNotes from "../shop/SingleNotes";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadNotes from "../dashboard/UploadNotes";
import ManageNotes from "../dashboard/ManageNotes";
import EditNotes from "../dashboard/EditNotes";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import Checkout from "../components/Checkout";
import CartPage from "../components/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/shop",
        element: <Shop/>,
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "/buy",
        element: <Buy/>,
      },
      {
        path: "/cart", 
        element: <CartPage/>,
      },
      {
        path: "/notes/:id",
        element: <SingleNotes/>,
        loader: ({ params }) => fetch(`http://localhost:5000/notes/${params.id}`)
      },
      {
        path: "/checkout", 
        element: <Checkout />,
      },
    ],
  },
  {
    path: '/admin/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
      },
      {
        path: '/admin/dashboard/upload',
        element: <UploadNotes/>,
      },
      {
        path: '/admin/dashboard/manage',
        element: <ManageNotes/>,
      },
      {
        path: '/admin/dashboard/edit-notes/:id',
        element: <EditNotes/>,
        loader: ({ params }) => fetch(`http://localhost:5000/notes/${params.id}`)
      }
    ],
  },
  {
    path: "sign-up",
    element: <Signup/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "logout",
    element: <Logout/>,
  }
]);

export default router;