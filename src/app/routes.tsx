import { createBrowserRouter } from "react-router";
import Login from "./components/Login";
import CustomerLayout from "./components/customer/CustomerLayout";
import CustomerMenu from "./components/customer/CustomerMenu";
import CustomerCart from "./components/customer/CustomerCart";
import CustomerPayment from "./components/customer/CustomerPayment";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminSuppliers from "./components/admin/AdminSuppliers";
import AdminTables from "./components/admin/AdminTables";
import AdminBilling from "./components/admin/AdminBilling";
import AdminIngredients from "./components/admin/AdminIngredients";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/customer",
    Component: CustomerLayout,
    children: [
      { index: true, Component: CustomerMenu },
      { path: "cart", Component: CustomerCart },
      { path: "payment", Component: CustomerPayment },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "suppliers", Component: AdminSuppliers },
      { path: "tables", Component: AdminTables },
      { path: "billing", Component: AdminBilling },
      { path: "ingredients", Component: AdminIngredients },
    ],
  },
]);
