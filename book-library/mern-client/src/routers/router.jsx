import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import Home from "../home/Home";
import SingleBook from "../shop/SingleBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/book/${params.id}`),
      },
    ],
  },
]);

export default router;
