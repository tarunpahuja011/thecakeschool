import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import "./AdminUsers.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AdminAddProduct.css";
import { message } from "antd";
import CryptoJS from "crypto-js";

const AdminEditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    stock: "Yes",
    images: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 3) {
      alert("You can only upload up to 3 files.");
      e.target.value = null;
      return;
    }
    setSelectedFiles(files);
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("id", form?._id);
    formData.append("name", form?.name);
    formData.append("stock", form?.stock);
    formData.append("desc", form?.desc);

    const filesArray = Array.from(selectedFiles);
    if (filesArray.length === 0) {
      message.error("No photo is selected");
      return;
    }
    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];
      formData.append("images", file);
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/product/update-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        setLoading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        navigate("/admin-products");
      } else {
        setLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading files:", error);
    }
  };

  const getProduct = async () => {
    try {
      const res = await axios.post("/api/product/get-product", {
        id: params.id,
      });
      if (res.data.success) {
        setForm(res.data.data);
        setSelectedFiles(res.data.data.images);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <h3 className="m-0">Edit Product</h3>
        </div>
        <hr />
        <div className="add-product-container">
          <div className="form-fields mb-3">
            <input
              className="w-100"
              aria-label="Select Image"
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
              name="image"
              required
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <div className="form-fields mb-3">
            <input
              className="w-100"
              name="name"
              onChange={handleChange}
              value={form?.name}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="form-fields mb-3">
            <textarea
              style={{ border: "1px solid #000" }}
              name="desc"
              id=""
              cols="30"
              rows="3"
              placeholder="Description"
              className="form-control"
              onChange={handleChange}
              value={form?.desc}
            ></textarea>
          </div>
          {/* <div className="form-fields mb-3">
            <label htmlFor="" className="text-dark">
              <small>Stock</small>
            </label>
            <select
              onChange={handleChange}
              value={form?.stock}
              name="stock"
              className="w-100"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div> */}
          <button className="w-100 py-3" onClick={handleUpdateProduct}>
            Update
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEditProduct;
