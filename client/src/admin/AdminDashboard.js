import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import CakeIcon from "@mui/icons-material/Cake";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState(null);
  const [total, setTotal] = useState(0);
  const [topUsers, setTopUsers] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const getAllQueries = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/get-all-queries", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setQueries(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/admin-get-all-orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setData(res.data.data.reverse());
        setOrders(res.data.data.reverse());
        setTotal(res.data.total);
        const filteredOrders = selectedMonth
          ? res.data.data.filter((order) => {
              return (
                new Date(order.createdAt).getMonth() + 1 ===
                Number(selectedMonth)
              );
            })
          : res.data.data;

        const ordersData = filteredOrders.reverse();
        // Create an object to store total amounts for each user
        const userTotalAmounts = {};
        // Calculate total amount for each user
        ordersData.forEach((order) => {
          const userEmail = order.customer_email;
          const orderPrice = parseFloat(order.price);
          if (!userTotalAmounts[userEmail]) {
            userTotalAmounts[userEmail] = 0;
          }
          userTotalAmounts[userEmail] += orderPrice;
        });
        // Convert userTotalAmounts object to an array of objects
        const topUsersArray = Object.keys(userTotalAmounts).map((email) => ({
          customer_email: email,
          totalAmount: userTotalAmounts[email],
        }));
        // Sort topUsersArray based on totalAmount in descending order
        topUsersArray.sort((a, b) => b.totalAmount - a.totalAmount);
        // Get the top 10 users
        const top10Users = topUsersArray.slice(0, 10);
        setTopUsers(top10Users);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // PRODUCTS
  const getAllProducts = async () => {
    try {
      const res = await axios.get("/api/product/get-all-products");
      if (res.data.success) {
        setProducts(res.data.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formattedTotal =
    total >= 1000
      ? total % 1000 === 0
        ? `${total / 1000}k`
        : `${(total / 1000).toFixed(1)}k`
      : total;

  const formattedOrder =
    orders?.length >= 1000
      ? orders?.length % 1000 === 0
        ? `${orders?.length / 1000}k`
        : `${(orders?.length / 1000).toFixed(1)}k`
      : orders?.length;

  useEffect(() => {
    getAllOrders();
    getAllQueries();
    getAllProducts();
  }, [selectedMonth]);

  return (
    <AdminLayout>
      <div className="page-title">
        <h3 className="m-0">Dashboard</h3>
      </div>
      <hr />
      <div className="admin-dashboard-container p-0">
        <div
          className="dash-card"
          onClick={() => navigate("/admin-register-users")}
        >
          <div className="count">
            <h1 className="m-0">
              {loading ? (
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <b>{formattedOrder || 0}</b>
              )}
            </h1>
            <span className="text-muted">Total Registration</span>
          </div>
          <HowToRegIcon className="icon" />
        </div>
        <div className="dash-card" onClick={() => navigate("/admin-products")}>
          <div className="count">
            <h1 className="m-0">
              {loading ? (
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <b>{products?.length || 0}</b>
              )}
            </h1>
            <span className="text-muted">Total Products</span>
          </div>
          <CakeIcon className="icon" />
        </div>
        <div className="dash-card" onClick={() => navigate("/admin-courses")}>
          <div className="count">
            <h1 className="m-0">
              {loading ? (
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <b>{formattedTotal || 0}</b>
              )}
            </h1>
            <span className="text-muted">Total Courses</span>
          </div>
          <AutoStoriesIcon className="icon" />
        </div>
        <div className="dash-card" onClick={() => navigate("/admin-queries")}>
          <div className="count">
            <h1 className="m-0">
              <h1 className="m-0">
                {loading ? (
                  <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <b>
                    {queries?.filter((item) => {
                      return item.status === "pending";
                    }).length || 0}
                  </b>
                )}
              </h1>
            </h1>
            <span className="title">Queries</span>
          </div>
          <HelpIcon className="icon" />
        </div>
      </div>
      <div className="admin-recent-things">
        <div className="recent-orders">
          <h5>Recent Registrations</h5>
          <hr />
          <table className="table ">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Course Name</th>
                <th>Course Price</th>
                <th>Date</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {data
                ?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <small>{item?.orderId}</small>
                      </td>
                      <td>
                        <small>{item?.email}</small>
                      </td>
                      <td>
                        <small>{item?.mobile}</small>
                      </td>
                      <td>
                        <small>{item?.courseName}</small>
                      </td>
                      <td>
                        <small>{item?.coursePrice}</small>
                      </td>
                      <td>
                        <small>
                          {new Date(item?.createdAt).toLocaleString("default", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </small>
                      </td>
                      <td>
                        <RemoveRedEyeIcon
                          onClick={() =>
                            navigate(`/admin-view-registered-user/${item?._id}`)
                          }
                          className="text-success icon"
                        />
                      </td>
                    </tr>
                  );
                })
                .slice(0, 5)}
            </tbody>
          </table>
        </div>
        <div className="recent-queries">
          <h5>Recent Queries</h5>
          <hr />
          <table className="table ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {queries &&
                queries
                  ?.filter((item) => {
                    return item.status === "pending";
                  })
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <small>{item?.name}</small>
                        </td>
                        <td>
                          <small>{item?.email}</small>
                        </td>
                        <td>
                          <small>{item?.mobile}</small>
                        </td>
                        <td>
                          <small>{(item?.msg).slice(0, 10)}..</small>
                        </td>
                      </tr>
                    );
                  })
                  .slice(0, 5)}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
