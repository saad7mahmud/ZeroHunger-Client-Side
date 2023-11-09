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
import UpdateFood from "../UpdateFood/UpdateFood";

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
        path: "/manage-my-food/:id",
        element: <ManageAFood></ManageAFood>,
        loader: ({ params }) =>
          fetch(
            `https://zero-hunger-server-five.vercel.app/manage-my-food/${params.id}`
          ),
      },

      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
        // loader: () => fetch(`https://zero-hunger-server-five.vercel.app/available-foods?sort=${asc? "asc":"desc"}`),
      },
      {
        path: "/available-foods/:id",
        element: (
          <PrivateRoute>
            <SingleFood></SingleFood>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://zero-hunger-server-five.vercel.app/available-foods/${params.id}`
          ),
      },
      {
        path: "/update-food/:id",
        element: <UpdateFood></UpdateFood>,
        loader: ({ params }) =>
          fetch(
            `https://zero-hunger-server-five.vercel.app/available-foods-update/${params.id}`
          ),
      },
    ],
  },
]);
