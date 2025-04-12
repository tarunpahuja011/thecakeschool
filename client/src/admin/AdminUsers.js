import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { message } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import axios from "axios";
import "./AdminUsers.css";
import IMAGES from "../img/image";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);

  // delete user
  // const handleDeleteUser = async (id) => {
  //   try {
  //     const res = await axios.post("/api/admin/delete-user", { id });
  //     if (res.data.success) {
  //       message.success(res.data.message);
  //       getAllUser();
  //     } else {
  //       message.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(null);
    } else {
      const filtered = allUser.filter((user) => {
        return user?.email.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredUsers(filtered);
    }
  };

  // get all users
  const getAllUser = async () => {
    try {
      const res = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setAllUser(res.data.data.reverse());
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch(); // Call handleSearch in useEffect
  }, [searchQuery, allUser]);

  useEffect(() => {
    getAllUser(); // Call handleSearch in useEffect
  }, []);

  const filterUser = filteredUsers && filteredUsers ? filteredUsers : allUser;
  return (
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <div className="d-flex gap-2">
            <h3 className="m-0">Users</h3>
            <button onClick={() => navigate("/admin-add-user")}>
              Add User
            </button>
          </div>
          <h6>Total Users - {allUser?.length}</h6>
        </div>
        <hr />
        <div className="table-container">
          <div className="tools">
            <div className="form-fields">
              <SearchIcon className="text-dark me-2" />
              <input
                className="mb-4 py-2"
                type="search"
                name="search"
                placeholder="Search by email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <table className="table user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterUser?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <small>{user?.name}</small>
                    </td>
                    <td>
                      <small>{user?.email}</small>
                    </td>
                    <td>
                      <small>
                        {user?.created
                          ? new Date(user?.created).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )
                          : ""}
                      </small>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <EditIcon
                          onClick={() =>
                            navigate(`/admin-edit-user/${user?._id}`)
                          }
                          className="me-2 text-muted"
                        />
                        {/* <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteUser(user?._id)}
                          className="text-danger"
                        /> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
