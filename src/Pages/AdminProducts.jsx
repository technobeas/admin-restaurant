import SearchBar from "../Components/SearchBar";
import "../Style/AdminProducts.css";
import { useProducts } from "../context/ProductContext";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const AdminProducts = () => {
  const { products, setProducts, productLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  //  always work with an array
  const productList = useMemo(() => {
    if (Array.isArray(products)) return products;
    if (products?.products && Array.isArray(products.products)) {
      return products.products;
    }
    return [];
  }, [products]);

  // To Filter Porducts
  const filteredProducts = useMemo(() => {
    return productList.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productList, searchTerm]);

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      // const res = await fetch(`/product/delete/${id}`, {
      //   method: "DELETE",
      //   credentials: "include",
      // });

      const res = await fetch(`${API_URL}/product/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");
      const data = await res.json();

      setProducts((prev) =>
        Array.isArray(prev) ? prev.filter((p) => p._id !== id) : prev
      );

      console.log(data);
      if (data.success) {
        toast.success("Product Deleted...!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  //  HIDE PRODUCT
  const handleHide = async (id) => {
    try {
      // const res = await fetch(`/product/hide/${id}`, {
      //   method: "put",
      //   credentials: "include",
      // });

      const res = await fetch(`${API_URL}/product/hide/${id}`, {
        method: "PUT",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Hide failed");
      const data = await res.json();
      setProducts((prev) =>
        Array.isArray(prev)
          ? prev.map((p) => (p._id === id ? { ...p, hidden: true } : p))
          : prev
      );
      // alter on the hidden or unhidden
      if (data.product.isHide) {
        toast.success("Product Hidden...!");
      } else {
        toast.success("Product UnHidden...!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  //  TOGGLE POPULAR
  const handlePopular = async (id) => {
    try {
      // const res = await fetch(`/product/popular/${id}`, {
      //   method: "put",
      //   credentials: "include",
      // });

      const res = await fetch(`${API_URL}/product/popular/${id}`, {
        method: "PUT",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Popular update failed");

      const data = await res.json();

      setProducts((prev) =>
        Array.isArray(prev)
          ? prev.map((p) => (p._id === id ? data.product : p))
          : prev
      );
      console.log(data.product.isPopular);
      if (data.product.isPopular) {
        toast.success("Product Added To Popular");
      } else {
        toast.success("Product Removed From Popular...!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  //  LOADING STATE
  if (productLoading) {
    return (
      <p style={{ padding: "20px", marginTop: "50px" }}>Loading products...</p>
    );
  }

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h2>All Products</h2>
        <span>{productList.length} items</span>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by product name..."
      />

      {/*  PROUCT LIST */}
      <div className="admin-products-list">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((item) => (
            <div className="admin-product-row" key={item._id}>
              <div className="admin-product-left">
                <img
                  src={item.image?.url || "/placeholder.png"}
                  alt={item.name}
                />
                <div className="admin-product-text">
                  <p className="name">{item.name}</p>
                  <span className="price">₹{item.price}</span>

                  {item.hidden && <span className="hidden-badge">Hidden</span>}
                </div>
              </div>

              <div className="admin-product-actions">
                {/* <button className="edit">Edit</button> */}

                <button
                  className="delete"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>

                <button className="hide" onClick={() => handleHide(item._id)}>
                  {item.isHide ? "UnHide" : "Hide"}
                </button>

                <button
                  className="popular"
                  onClick={() => handlePopular(item._id)}
                >
                  {item.isPopular ? "Unpopular" : "Popular"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
