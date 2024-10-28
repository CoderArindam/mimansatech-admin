import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { addProduct, updateProduct } from "../features/productSlice";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai";

const ProductForm = ({ editingProduct, onEditComplete }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([
    {
      id: uuidv4(),
      name: "",
      price: "",
      description: "",
      image: "",
      imageFile: null,
      imageUrl: "",
      uploadType: "file",
      status: true,
    },
  ]);

  useEffect(() => {
    if (editingProduct) {
      setProducts([editingProduct]);
    }
  }, [editingProduct]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        id: uuidv4(),
        name: "",
        price: "",
        description: "",
        image: "",
        imageFile: null,
        imageUrl: "",
        uploadType: "file",
        status: true,
      },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    products.forEach((product) => {
      const data = {
        ...product,
        image:
          product.uploadType === "file"
            ? product.imageFile
              ? URL.createObjectURL(product.imageFile)
              : product.image
            : product.imageUrl,
      };
      if (editingProduct) {
        dispatch(updateProduct(data));
        onEditComplete();
      } else {
        dispatch(addProduct(data));
      }
    });
    setProducts([
      {
        id: uuidv4(),
        name: "",
        price: "",
        description: "",
        image: "",
        imageFile: null,
        imageUrl: "",
        uploadType: "file",
        status: true,
      },
    ]);
  };

  const onDrop = (acceptedFiles, index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      imageFile: acceptedFiles[0],
      imageUrl: "",
    };
    setProducts(updatedProducts);
  };

  const removeImage = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      imageFile: null,
      imageUrl: "",
    };
    setProducts(updatedProducts);
  };

  const handleUploadTypeSelect = (index, type) => {
    const updatedProducts = [...products];
    updatedProducts[index].uploadType = type;
    setProducts(updatedProducts);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-700 text-center">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>

      {products.map((product, index) => (
        <div key={index} className="border rounded-lg p-4 relative space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2">
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Product Name"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2 px-2">
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => handleChange(index, e)}
                placeholder="Price"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </div>

          <div className="w-full px-2">
            <textarea
              name="description"
              value={product.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Description"
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />
          </div>

          <div className="flex items-center justify-between mb-2">
            <span>Upload Image</span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleUploadTypeSelect(index, "file")}
                className={`py-1 px-3 rounded-lg ${
                  product.uploadType === "file"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                File
              </button>
              <button
                type="button"
                onClick={() => handleUploadTypeSelect(index, "url")}
                className={`py-1 px-3 rounded-lg ${
                  product.uploadType === "url"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                URL
              </button>
            </div>
          </div>

          {product.uploadType === "file" ? (
            product.imageFile ? (
              <div className="containere">
                <div className="relative w-24 h-24 mb-4">
                  <img
                    src={URL.createObjectURL(product.imageFile)}
                    alt="Uploaded Preview"
                    className="w-full h-full object-cover rounded-md border border-gray-300"
                  />
                  <AiOutlineCloseCircle
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 cursor-pointer text-xl"
                    title="Remove image"
                  />
                  <p className="text-sm text-gray-500 mt-1 text-center">
                    {product.imageFile.name}
                  </p>
                </div>
              </div>
            ) : (
              <Dropzone
                onDrop={(acceptedFiles) => onDrop(acceptedFiles, index)}
              />
            )
          ) : (
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={(e) => handleChange(index, e)}
              placeholder="Paste image URL here"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            type="button"
            onClick={() => handleRemoveProduct(index)}
            className="py-6 text-red-500 hover:text-red-700"
          >
            Remove This Field
          </button>
        </div>
      ))}
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={handleAddProduct}
          className="w-[1/2] pt-3 pb-3 pr-5 pl-5 bg-green-500 flex-col text-white rounded-lg hover:bg-green-600 transition duration-300"
        >
          {products.length === 1 ? "Add Product" : "Add Products"}
        </button>

        <button
          type="submit"
          className="w-[1/2] pt-3 pb-3 pr-5 pl-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {editingProduct ? "Update Product" : "Submit Form"}
        </button>
      </div>
    </form>
  );
};

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer border-dashed border-2 p-4 rounded-lg flex flex-col items-center text-gray-500"
    >
      <AiOutlineCloudUpload className="text-4xl text-blue-500 mb-2" />
      <input {...getInputProps()} />
      <p>Drag & drop an image here, or click to select one</p>
    </div>
  );
};

export default ProductForm;
