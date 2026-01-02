import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const { admin, loading } = useAuth();
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    // wait until auth check finishes
    if (loading || !admin) {
      setCategoryLoading(false);
      return;
    }

    const fetchCategories = async () => {
      try {
        // const res = await fetch("/category/all", {
        //   method: "GET",
        //   credentials: "include", //  send cookie
        // });

        const res = await fetch(`${API_URL}/category/all`, {
          method: "GET",
          credentials: "include", // send cookies
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Category fetch failed", err);
        setCategories([]);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, [admin, loading]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        categoryLoading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
