import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const products = useSelector((state) => state.product.products);

  const handleEditComplete = () => {
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>
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
