import { createHashRouter } from "react-router";

import Cart from "../views/front/Cart";
import Home from "../views/front/Home";
import Products from "../views/front/Products";
import NotFound from "../views/front/NotFound";
import FrontendLayout from "../layout/FrontendLayout";
import SingleProduct from "../views/front/SingleProduct";

const routes = [
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
const router = createHashRouter(routes);

export default router;
