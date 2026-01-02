import { toast } from "react-toastify";
import "../Style/AdminCategories.css";
import { useCategories } from "../context/CategoryContext";
import { useMemo, useState } from "react";
import SearchBar from "../Components/SearchBar";
const API_URL = import.meta.env.VITE_API_URL;

const AdminCategories = () => {
  const { categories, setCategories, categoryLoading } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");

  //  normalize categories into array
  const categoryList = useMemo(() => {
    if (Array.isArray(categories)) return categories;
    if (categories?.categories && Array.isArray(categories.categories)) {
      return categories.categories;
    }
    return [];
  }, [categories]);

  // To Filter Porducts
  const filteredCategories = useMemo(() => {
    return categoryList.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoryList, searchTerm]);

  //  DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      // const res = await fetch(`/category/delete/${id}`, {
      //   method: "DELETE",
      //   credentials: "include",
      // });

      const res = await fetch(`${API_URL}/category/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      setCategories((prev) =>
        Array.isArray(prev) ? prev.filter((c) => c._id !== id) : prev
      );

      toast.success("Category Deleted...!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  //  HIDE CATEGORY
  const handleHide = async (id) => {
    try {
      // const res = await fetch(`/category/hide/${id}`, {
      //   method: "PUT",
      //   credentials: "include",
      // });

      const res = await fetch(`${API_URL}/category/hide/${id}`, {
        method: "PUT",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Hide failed");
      const data = await res.json();
      setCategories((prev) =>
        Array.isArray(prev)
          ? prev.map((c) => (c._id === id ? { ...c, hidden: true } : c))
          : prev
      );
      // alter on the hidden or unhidden
      if (data.category.hide) {
        toast.success("Category Hidden Succesfully...!");
      } else {
        toast.success("Category UnHidden Succesfully...!");
      }

      console.log(data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  // ⏳ LOADING STATE
  if (categoryLoading) {
    return (
      <p style={{ padding: "20px", marginTop: "50px" }}>
        Loading categories...
      </p>
    );
  }

  return (
    <div className="admin-categories">
      <div className="admin-categories-header">
        <h2>Categories</h2>
        <span>{categoryList.length} items</span>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search categories..."
      />

      <div className="admin-categories-list">
        {filteredCategories.length === 0 ? (
          <p style={{ padding: "20px" }}>No categories found</p>
        ) : (
          filteredCategories.map((cat) => (
            <div className="admin-category-row" key={cat._id}>
              <div className="admin-category-left">
                <img
                  src={cat.image?.url || "/placeholder.png"}
                  alt={cat.name}
                  className="admin-category-thumb"
                />

                <p className="admin-category-name">
                  {cat.name}
                  {cat.hidden && <span className="hidden-badge">Hidden</span>}
                </p>
              </div>

              <div className="admin-category-actions">
                {/* <button className="edit">Edit</button> */}

                <button className="hide" onClick={() => handleHide(cat._id)}>
                  {cat.hide ? "UnHide" : "Hide"}
                </button>

                <button
                  className="delete"
                  onClick={() => handleDelete(cat._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
