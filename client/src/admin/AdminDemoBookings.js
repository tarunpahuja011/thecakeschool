import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "./AdminUsers.css";

const AdminDemoBookings = () => {
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  async function getAllDemo() {
    try {
      const res = await axios.get("/api/demo/get-all-demo");
      if (res.data.success) {
        setAllUser(res.data.data);
        setOriginalUserData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleClearFilter() {
    setAllUser(originalUserData);
    setSearchEmail("");
    setSelectedDate("");
    setSelectedMonth("");
  }

  //! Search
  const handleSearch = () => {
    if (originalUserData) {
      const filteredUsers = originalUserData.filter((order) => {
        const emailMatch =
          order.email &&
          order.email.toLowerCase().includes(searchEmail.toLowerCase());

        const dateMatch =
          order.created &&
          (!selectedDate ||
            new Date(order.created).toISOString().split("T")[0] ===
              new Date(selectedDate).toISOString().split("T")[0]);

        const monthMatch =
          order.created &&
          (!selectedMonth ||
            new Date(order.created).getMonth() === Number(selectedMonth) - 1);

        return emailMatch && monthMatch && dateMatch;
      });
      setAllUser(filteredUsers);
    }
  };

  useEffect(() => {
    getAllDemo();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchEmail, selectedDate, selectedMonth]);

  return (
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <h3 className="m-0">List of Demo Bookings</h3>
          <h6>Total Bookings - {allUser?.length}</h6>
        </div>
        <hr />
        <div className="table-container">
          <div className="tools mb-5">
            <div className="form-fields">
              <input
                className="border"
                type="search"
                name="email"
                placeholder="Search by Email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </div>
            <div className="form-fields">
              <input
                type="date"
                name="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="form-fields">
              <select
                className="text-dark"
                name="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <button
              className="bg-danger px-3"
              onClick={() => handleClearFilter()}
            >
              Clear Filter
            </button>
          </div>
          <table className="table user-table">
            <thead>
              <tr>
                <th>
                  <small>Photo</small>
                </th>
                <th>
                  <small>Name</small>
                </th>
                <th>
                  <small>Email</small>
                </th>
                <th>
                  <small>Phone</small>
                </th>
                <th>
                  <small>Booking Date</small>
                </th>
                <th>
                  <small>Status</small>
                </th>
                <th>
                  <small>View</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser &&
                allUser?.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={user?.photo} alt="" />
                      </td>
                      <td>
                        <small>{user?.fullName}</small>
                      </td>
                      <td>
                        <small>{user?.email}</small>
                      </td>
                      <td>
                        <small>{user?.phone}</small>
                      </td>
                      <td>
                        <small>
                          {new Date(user?.created).toLocaleString("default", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </small>
                      </td>
                      <td>
                        <small>{user?.status}</small>
                      </td>
                      <td align="center">
                        <RemoveRedEyeIcon
                          onClick={() =>
                            navigate(`/admin-view-demo/${user?._id}`)
                          }
                          className="icon"
                        />
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

export default AdminDemoBookings;
