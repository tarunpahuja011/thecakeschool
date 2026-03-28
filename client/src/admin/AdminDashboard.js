import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import CakeIcon from "@mui/icons-material/Cake";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import "./AdminDashboard.css";

function formatCompactNumber(n) {
  if (n == null || n === "") return 0;
  const num = Number(n);
  if (Number.isNaN(num)) return 0;
  if (num >= 1000) {
    return num % 1000 === 0 ? `${num / 1000}k` : `${(num / 1000).toFixed(1)}k`;
  }
  return num;
}

function StatSpinner() {
  return (
    <div className="spinner-border spinner-border-sm" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

function DashStatCard({ onClick, loading, value, label, Icon }) {
  return (
    <div className="dash-card" onClick={onClick}>
      <div className="count">
        <h1 className="m-0">{loading ? <StatSpinner /> : <b>{value}</b>}</h1>
        <span className="text-muted">{label}</span>
      </div>
      <Icon className="icon" />
    </div>
  );
}

function RecentRegistrationsTable({ orders, onViewUser }) {
  const rows = orders?.slice(0, 5) ?? [];

  return (
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
          {rows.map((item, index) => (
            <tr key={item?._id ?? index}>
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
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleString("default", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </small>
              </td>
              <td>
                <RemoveRedEyeIcon
                  onClick={() => onViewUser(item?._id)}
                  className="text-success icon"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecentQueriesTable({ queries }) {
  const rows = queries?.slice(0, 5) ?? [];

  return (
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
          {rows.map((item, index) => {
            const msg = item?.msg ?? "";
            const messageCell = msg.length > 10 ? `${msg.slice(0, 10)}..` : msg;

            return (
              <tr key={item?._id ?? index}>
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
                  <small>{messageCell}</small>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

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

  const pendingQueries = useMemo(
    () => (queries ?? []).filter((item) => item.status === "pending"),
    [queries]
  );

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
        <DashStatCard
          onClick={() => navigate("/admin-register-users")}
          loading={loading}
          value={formatCompactNumber(orders?.length) || 0}
          label="Total Registration"
          Icon={HowToRegIcon}
        />
        <DashStatCard
          onClick={() => navigate("/admin-products")}
          loading={loading}
          value={products?.length ?? 0}
          label="Total Products"
          Icon={CakeIcon}
        />
        <DashStatCard
          onClick={() => navigate("/admin-courses")}
          loading={loading}
          value={formatCompactNumber(total) || 0}
          label="Total Courses"
          Icon={AutoStoriesIcon}
        />
        <DashStatCard
          onClick={() => navigate("/admin-queries")}
          loading={loading}
          value={pendingQueries.length}
          label="Queries"
          Icon={HelpIcon}
        />
      </div>
      <div className="admin-recent-things">
        <RecentRegistrationsTable
          orders={data}
          onViewUser={(id) => navigate(`/admin-view-registered-user/${id}`)}
        />
        <RecentQueriesTable queries={pendingQueries} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
