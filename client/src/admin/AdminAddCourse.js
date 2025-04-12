import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "./AdminUsers.css";
import "./AdminAddCourse.css";

const AdminAddCourse = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [details, setDetails] = useState([{ heading: "", data: [] }]);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    duration: "",
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

  const handleAddCourse = async () => {
    const formData = new FormData();
    formData.append("name", form?.name);
    formData.append("price", form?.price);
    formData.append("desc", form?.desc);
    formData.append("duration", form?.duration);
    formData.append("stock", form?.stock);
    formData.append("details", JSON.stringify(details));

    const filesArray = Array.from(selectedFiles);
    const isAllFilesValid = filesArray.every(
      (file) => file.size <= 2 * 1024 * 1024
    );
    if (!isAllFilesValid) {
      message.error("One or more selected files exceed the 2MB size limit.");
      return;
    }
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
      const res = await axios.post("/api/course/add-course", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/admin-courses");
        setLoading(false);
        setForm({
          name: "",
          desc: "",
          price: "",
          stock: "Yes",
          images: [],
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading files:", error);
    }
  };

  //! DETAILS
  const handleAddHeading = () => {
    const newDetails = [...details];
    newDetails.push({ heading: "", data: [] });
    setDetails(newDetails);
  };

  const handleAddData = (index) => {
    const newDetails = [...details];
    newDetails[index].data.push("");
    setDetails(newDetails);
  };

  const handleRemoveData = (headingIndex, dataIndex) => {
    const newDetails = [...details];
    newDetails[headingIndex].data.splice(dataIndex, 1);
    setDetails(newDetails);
  };

  const handleRemoveHeading = (index) => {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  const handleDetailsChange = (index, e) => {
    const newDetails = [...details];
    newDetails[index].heading = e.target.value;
    setDetails(newDetails);
  };

  const handleDataChange = (headingIndex, dataIndex, e) => {
    const newDetails = [...details];
    newDetails[headingIndex].data[dataIndex] = e.target.value;
    setDetails(newDetails);
  };

  return (
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <h3 className="m-0">Add Product</h3>
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
            <input
              className="w-100"
              name="price"
              onChange={handleChange}
              value={form?.price}
              type="text"
              placeholder="Enter price"
            />
          </div>
          <div className="form-fields mb-3">
            <input
              className="w-100"
              name="duration"
              onChange={handleChange}
              value={form?.duration}
              type="text"
              placeholder="Enter Duration"
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
          <div className="details form-fields mb-3">
            <button className="mb-3" onClick={handleAddHeading}>
              Add Topic
            </button>
            <div className="row">
              {details.map((heading, headingIndex) => (
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-5">
                  <div className="topic-container" key={headingIndex}>
                    <input
                      className="w-100"
                      name="heading"
                      value={heading.heading}
                      onChange={(e) => handleDetailsChange(headingIndex, e)}
                      type="text"
                      placeholder="Enter heading"
                    />
                    <button onClick={() => handleRemoveHeading(headingIndex)}>
                      Remove
                    </button>
                  </div>
                  <div className="data-container">
                    {heading.data.map((dataItem, dataIndex) => (
                      <div className="data" key={dataIndex}>
                        <input
                          className="w-100"
                          value={dataItem}
                          onChange={(e) =>
                            handleDataChange(headingIndex, dataIndex, e)
                          }
                          type="text"
                          placeholder="Enter data"
                        />
                        <button
                          className="bg-danger"
                          onClick={() =>
                            handleRemoveData(headingIndex, dataIndex)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <button
                      className="bg-success py-3"
                      onClick={() => handleAddData(headingIndex)}
                    >
                      Add Data
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-100 py-3" onClick={handleAddCourse}>
            Add Course
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddCourse;
