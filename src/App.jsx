import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";

import ProtectedRoute from './Components/ProtectedRoute';
import AdminLogin from "./Pages/AdminLogin";
import AdminLayout from "./Layouts/AdminLayout";

import AdminHome from "./Pages/AdminHome";
import AdminProducts from "./Pages/AdminProducts";
import AdminCategories from "./Pages/AdminCategories";
import AddProduct from "./Pages/AddProducts";
import AddCategory from "./Pages/AddCategories";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>

    {/* toastify */}
     <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
      />

      <Routes>
        {/* Public admin login */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected admin area */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProductProvider>
                <CategoryProvider>
                  <AdminLayout />
                </CategoryProvider>
              </ProductProvider>
            </ProtectedRoute>
          }
        >
          {/*  NESTED ADMIN ROUTES */}
          <Route index element={<AdminHome />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
