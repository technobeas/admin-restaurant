import { useState } from "react";
import "../Style/AddCategories.css";
import { useCategories } from "../context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const AddCategory = () => {
  const { setCategories } = useCategories();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Category name and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      setLoading(true);

      // const res = await fetch("/category/create", {
      //   method: "POST",
      //   credentials: "include", // \ cookie auth
      //   body: formData,
      // });

      const res = await fetch(`${API_URL}/category/create`, {
        method: "POST",
        credentials: "include", // send cookie for auth
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add category");

      const data = await res.json();

      //  push ONLY the product object
      setProducts((prev) =>
        Array.isArray(prev) ? [data.product, ...prev] : prev
      );

      toast.success(newCategory.message || "Category added successfully");
      navigate("/admin/categories");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-category">
      <h2 className="add-category__title">Add New Category</h2>

      <form className="add-category__form" onSubmit={handleSubmit}>
        {/* Category Name */}
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Category Image</label>

          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img src={preview} alt="Preview" className="image-preview" />
            )}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
