import "./App.css";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/Layout/Layout";
import Airports from "./pages/Airports/AirportsPage";
import NewAirportPage from "./pages/Airports/NewAirportPage";
import EditAirportPage from "./pages/Airports/EditAirportPage";
import EditStuffPage from "./pages/FlicoStuff/EditStuffPage";
import NewStuffPage from "./pages/FlicoStuff/NewStuffPage";
import FlicoStuff from "./pages/FlicoStuff/FlicoStuffPage";
import OutsourcesPage from "./pages/Outsources/OutsourcesPage";
import NewOutsourcePage from "./pages/Outsources/NewOutsourcePage";
import EditOutsourcePage from "./pages/Outsources/EditOutsourcePage";
import OutProducts from "./pages/OutProducts/OutProductsPage";
import EditOutProductPage from "./pages/OutProducts/EditOutProductPage";
import NewOutProductPage from "./pages/OutProducts/NewOutProductPage";
import UsersPage from "./pages/Users/UsersPage";
import EditUserPage from "./pages/Users/EditUserPage";
import ClosetsPage from "./pages/Closets/ClosetsPage";
import NewClosetPage from "./pages/Closets/NewClosetPage";
import EditClosetPage from "./pages/Closets/EditClosetPage";
import ProductsPage from "./pages/Products/ProductsPage";
import EditProductPage from "./pages/Products/EditProductPage";
import NewProductPage from "./pages/Products/NewProductPage";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import OrderDetailPage from "./pages/Orders/OrderDetailPage";
import NewOrderPage from "./pages/Orders/NewOrderPage";
import EditOrderPage from "./pages/Orders/EditOrderPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import Warehouses from "./pages/Warehouses/Warehouses";
import NewWarehousePage from "./pages/Warehouses/NewWarehousePage";
import EditWarehousePage from "./pages/Warehouses/EditWarehousePage";
import UserDetailsPage from "./pages/Users/UserDetailsPage";
import NewUserPage from "./pages/Users/NewUserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <div>ERROR PAGE</div>,
    children: [
      { index: true, element: <Navigate to="airports" /> },
      { path: "airports", element: <Airports /> },
      { path: "airports/new", element: <NewAirportPage /> },
      { path: "airports/edit/:id", element: <EditAirportPage /> },
      { path: "flicostuff", element: <FlicoStuff /> },
      { path: "flicostuff/new", element: <NewStuffPage /> },
      { path: "flicostuff/edit/:id", element: <EditStuffPage /> },
      { path: "outsources", element: <OutsourcesPage /> },
      { path: "outsources/new", element: <NewOutsourcePage /> },
      { path: "outsources/edit/:id", element: <EditOutsourcePage /> },
      { path: "outproducts", element: <OutProducts /> },
      { path: "outproducts/new", element: <NewOutProductPage /> },
      { path: "outproducts/edit/:id", element: <EditOutProductPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "users/new", element: <NewUserPage /> },
      { path: "users/edit/:id", element: <EditUserPage /> },
      { path: "users/:id", element: <UserDetailsPage /> },
      { path: "closets", element: <ClosetsPage /> },
      { path: "closets/new", element: <NewClosetPage /> },
      { path: "closets/edit/:id", element: <EditClosetPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/edit/:id", element: <EditProductPage /> },
      { path: "products/new", element: <NewProductPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "orders/edit/:id", element: <EditOrderPage /> },
      { path: "orders/new", element: <NewOrderPage /> },
      { path: "orders/:id", element: <OrderDetailPage /> },
      { path: "warehouses", element: <Warehouses /> },
      { path: "warehouses/new", element: <NewWarehousePage /> },
      { path: "warehouses/edit/:id", element: <EditWarehousePage /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
