// src/components/ProductList.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, toggleProductStatus } from "../features/productSlice";

const ProductList = ({ setEditingProduct }) => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const handleToggleStatus = (id) => {
    console.log("Toggling status for product ID:", id); // Debugging log
    dispatch(toggleProductStatus(id));
  };

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id} // Ensure unique key
          className="product-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded"
          />
          <h2 className="mt-2 text-lg font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="font-bold text-blue-500">₹{product.price}</p>
          <p
            className={`mt-1 ${
              product.status ? "text-green-500" : "text-red-500"
            }`}
          >
            Status: {product.status ? "Available" : "Unavailable"}
          </p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleToggleStatus(product.id)} // Pass unique ID
              className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 transition duration-300"
            >
              Toggle Status
            </button>
            <button
              onClick={() => dispatch(removeProduct(product.id))}
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
            <button
              onClick={() => setEditingProduct(product)}
              className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
