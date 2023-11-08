import { createBrowserRouter } from "react-router-dom";
import Roots from "../Layout/Roots/Roots";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddFood from "./../AddFood/AddFood";
import DateSortingComponent from "../AddFood/DateSortingComponent";
import AvailableFoods from "../AddFood/AvailableFoods/AvailableFoods";
import SingleFood from "../SingleFood/SingleFood";
import Modal from "./../AddFood/DateSortingComponent";
import ManageMyFoods from "../ManageFood/ManageMyFoods";
import MyFoodRequest from "../FoodRequest/MyFoodRequest";
import ManageAFood from "../ManageAFood/ManageAFood";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-food",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/requested-foods",
        element: (
          <PrivateRoute>
            <MyFoodRequest></MyFoodRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-a-food/:id",
        element: <ManageAFood></ManageAFood>,
      },

      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
        loader: () => fetch("http://localhost:5000/available-foods"),
      },
      {
        path: "/available-foods/:id",
        element: <SingleFood></SingleFood>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/available-foods/${params.id}`),
      },
    ],
  },
]);
