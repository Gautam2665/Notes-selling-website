import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import App from "../App";
  import Home from "../home/Home";
  import Shop from "../shop/Shop";
  import About from "../components/About";
  import Blog from "../components/Blog";
  import SingleNotes from "../shop/SingleNotes";
  import DashboardLayout from "../dashboard/DashboardLayout";
  import Dashboard from "../dashboard/Dashboard";
  import UploadNotes from "../dashboard/UploadNotes";
  import ManageNotes from "../dashboard/ManageNotes";
  import EditNotes from "../dashboard/EditNotes";
  
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
            path: "/blog",
            element: <Blog/>,
        },
        {
          path: "/notes/:id",
          element: <SingleNotes/>,
          loader: ({ params }) => fetch(`http://localhost:5000/notes/${params.id}`)
      },
      ],
    },
    {
      path: '/admin/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: '/admin/dashboard',
          element: <Dashboard/>,
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
    }
  ]);
  
  export default router;
  