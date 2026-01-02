import { useState } from "react";
import "../Style/AddProducts.css";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const AddProduct = () => {
  const { setProducts } = useProducts();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
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

    if (!name || !category || !price || !image) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);

      // const res = await fetch("/product/create", {
      //   method: "POST",
      //   credentials: "include", // 🔥 cookie-based auth
      //   body: formData,
      // });

      const res = await fetch(`${API_URL}/product/create`, {
        method: "POST",
        credentials: "include", // send cookies for auth
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();

      //  push ONLY the product object
      setProducts((prev) =>
        Array.isArray(prev) ? [data.product, ...prev] : prev
      );

      toast.success("Product Added SuccesFully...!");

      setTimeout(() => {
        navigate("/admin/products");
      }, 100);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <h2 className="add-product__title">Add New Product</h2>

      <form className="add-product__form" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            placeholder="e.g. Juice, Smoothie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            placeholder="₹ Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Short Description</label>
          <textarea
            placeholder="Short product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Product Image</label>

          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img src={preview} alt="Preview" className="image-preview" />
            )}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
