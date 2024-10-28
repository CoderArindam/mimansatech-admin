import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState(null);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to home if not authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleEditComplete = () => {
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>
      <div className="flex justify-center">
        <button
          onClick={logout}
          className="text-white bg-red-500 px-5 py-3 rounded-md mb-5"
        >
          Logout
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <ProductForm
          editingProduct={editingProduct}
          onEditComplete={handleEditComplete}
        />
      </div>
      {products.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <ProductList setEditingProduct={setEditingProduct} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
