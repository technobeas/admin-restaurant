import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { admin, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    // wait until auth check is finished
    if (loading || !admin) {
      setProductLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        // const res = await fetch("/product/all", {
        //   method: "GET",
        //   credentials: "include", //  cookie-based auth
        // });

        const res = await fetch(`${API_URL}/product/all`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        console.log(data);
        setProducts(data.products);
      } catch (err) {
        console.error("Product fetch failed", err);
        setProducts([]);
      } finally {
        setProductLoading(false);
      }
    };

    fetchProducts();
  }, [admin, loading]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        productLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
