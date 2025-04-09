import { routerType } from "../types/router.types";
import Home from "./Home";
import ImageDetails from "./ImageDetails";

const routes: routerType[] = [
  {
    path: "",
    element: <Home />,
    title: "home"
  },
  {
    path: "photo/:id",
    element: <ImageDetails />,
    title: "photo-details"
  }
];

export default routes;
