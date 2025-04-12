import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { message } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminUsers.css";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);

  // delete product
  const handleDeleteProduct = async (id, images) => {
    const shouldDelete = window.confirm("Are you sure to delete?");
    if (shouldDelete) {
      try {
        const res = await axios.post("/api/course/delete-course", {
          id,
          images,
        });
        if (res.data.success) {
          getAllCourses();
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // User clicked "Cancel" or closed the dialog
    }
  };

  // Search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(null);
    } else {
      const filtered = products.filter((product) => {
        return product?.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredUsers(filtered);
    }
  };

  // get all products
  const getAllCourses = async () => {
    try {
      const res = await axios.get("/api/course/get-all-courses");
      if (res.data.success) {
        setProducts(res.data.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch(); // Call handleSearch in useEffect
  }, [searchQuery, products]);

  useEffect(() => {
    getAllCourses();
  }, []);

  const filterProduct =
    filteredUsers && filteredUsers ? filteredUsers : products;
  return (
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <h3 className="m-0">Courses</h3>
          <button onClick={() => navigate("/admin-add-course")}>Add New</button>
        </div>
        <hr />
        <div className="table-container">
          <div className="tools">
            <div className="form-fields">
              <SearchIcon className="text-dark me-2" />
              <input
                className="mb-4"
                type="search"
                name="search"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <table className="table user-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterProduct?.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={`${product?.images[0]}`} alt="" />
                    </td>
                    <td>
                      <small>{product?.name}</small>
                    </td>
                    <td>
                      <small>{product?.price}</small>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <EditIcon
                          onClick={() =>
                            navigate(`/admin-edit-course/${product?._id}`)
                          }
                        />
                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleDeleteProduct(product?._id, product?.images)
                          }
                          className="text-danger"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination"></div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProduct;
