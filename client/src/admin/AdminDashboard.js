import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import CakeIcon from "@mui/icons-material/Cake";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Tooltip from "@mui/material/Tooltip";
import "./AdminDashboard.css";
import { isUndefined } from "./utils";

async function fetchAllProducts(setData) {
  try {
    const res = await axios.get("/api/product/get-all-products");
    if (res.data.success) {
      setData(res.data.data.slice().reverse());
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchAllQueries(setLoading, setQueries) {
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
}

async function fetchAllOrders({
  selectedMonth,
  setLoading,
  setData,
  setOrders,
  setTotal,
  setTopUsers,
}) {
  try {
    setLoading(true);
    const res = await axios.get("/api/admin/admin-get-all-orders", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.data.success) {
      const apiData = res.data.data.slice();
      const reversed = apiData.slice().reverse();
      setData(reversed);
      setOrders(reversed);
      setTotal(res.data.total);
      const filteredOrders = selectedMonth
        ? apiData.filter((order) => {
            return (
              new Date(order.createdAt).getMonth() + 1 ===
              Number(selectedMonth)
            );
          })
        : apiData;
      const ordersData = filteredOrders.slice().reverse();
      const userTotalAmounts = {};
      ordersData.forEach((order) => {
        const userEmail = order.customer_email;
        const orderPrice = parseFloat(order.price);
        if (!userTotalAmounts[userEmail]) {
          userTotalAmounts[userEmail] = 0;
        }
        userTotalAmounts[userEmail] += orderPrice;
      });
      const topUsersArray = Object.keys(userTotalAmounts).map((email) => ({
        customer_email: email,
        totalAmount: userTotalAmounts[email],
      }));
      topUsersArray.sort((a, b) => b.totalAmount - a.totalAmount);
      setTopUsers(topUsersArray.slice(0, 10));
      setLoading(false);
    } else {
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}

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

function TableCellSmall({ children }) {
  return (
    <td>
      <small>{children}</small>
    </td>
  );
}

function RecentRegistrationsTable({ orders, onViewUser }) {
  const rows = orders?.slice(0, 5) ?? [];
  const na = (v) => (isUndefined(v) ? "N/A" : v);
  const priceOrZero = (v) => (isUndefined(v) ? 0 : v);
  const formatOrderDate = (iso) =>
    iso
      ? new Date(iso).toLocaleString("default", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  const dataColumns = [
    { key: "orderId", label: "Order Id", format: na },
    { key: "email", label: "Email", format: na },
    { key: "mobile", label: "Mobile", format: na },
    { key: "courseName", label: "Course Name", format: na },
    { key: "coursePrice", label: "Course Price", format: priceOrZero },
    { key: "createdAt", label: "Date", format: formatOrderDate },
  ];

  return (
    <div className="recent-orders">
      <h5>Recent Registrations</h5>
      <hr />
      <table className="table ">
        <thead>
          <tr>
            {dataColumns.map(({ key, label }) => (
              <th key={key}>{label}</th>
            ))}
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={item?._id ?? index}>
              {dataColumns.map(({ key, format }) => (
                <TableCellSmall key={key}>{format(item?.[key])}</TableCellSmall>
              ))}
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
  const asText = (v) => v;
  const truncateMessage = (v) => {
    const s = v ?? "";
    return s.length > 10 ? `${s.slice(0, 10)}..` : s;
  };
  const dataColumns = [
    { key: "name", label: "Name", format: asText },
    { key: "email", label: "Email", format: asText },
    { key: "mobile", label: "Mobile", format: asText },
    { key: "msg", label: "Message", format: truncateMessage },
  ];

  return (
    <div className="recent-queries">
      <h5>Recent Queries</h5>
      <hr />
      <table className="table ">
        <thead>
          <tr>
            {dataColumns.map(({ key, label }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={item?._id ?? index}>
              {dataColumns.map(({ key, format }) => {
                const raw = item?.[key];
                const display = format(raw);
                const fullMsg = raw == null ? "" : String(raw);
                const showMsgTip = key === "msg" && fullMsg.length > 10;
                const content =
                  key === "msg" ? (
                    <Tooltip
                      title={fullMsg}
                      placement="top-start"
                      arrow
                      enterDelay={400}
                      disableHoverListener={!showMsgTip}
                      slotProps={{
                        tooltip: {
                          sx: {
                            maxWidth: 360,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          },
                        },
                      }}
                    >
                      <span>{display}</span>
                    </Tooltip>
                  ) : (
                    display
                  );
                return <TableCellSmall key={key}>{content}</TableCellSmall>;
              })}
            </tr>
          ))}
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

  useEffect(() => {
    fetchAllOrders({
      selectedMonth,
      setLoading,
      setData,
      setOrders,
      setTotal,
      setTopUsers,
    });
    fetchAllQueries(setLoading, setQueries);
    fetchAllProducts(setProducts);
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
