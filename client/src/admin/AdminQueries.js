import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import "./AdminQueries.css";
import axios from "axios";
import { message } from "antd";

const AdminQueries = () => {
  const [queries, setQueries] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState(0);

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
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSeen = async (id) => {
    try {
      const res = await axios.post(
        "/api/admin/query-seen",
        { id: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAllQueries();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQueries();
  }, []);

  return (
    <AdminLayout>
      <div className="page-title">
        <h3 className="m-0">Queries</h3>
        <h6>Total Queries - {queries?.length || 0}</h6>
      </div>
      <hr />
      <div className="admin-queries">
        <div className="admin-offer-btn-tabs">
          <button
            onClick={() => setTabs(0)}
            className={`${tabs === 0 && "active"}`}
          >
            Pending
          </button>
          <button
            onClick={() => setTabs(1)}
            className={`${tabs === 1 && "active"}`}
          >
            Seen
          </button>
        </div>
        <table className="table query-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          {loading ? (
            <div className="loader-container text-center">
              <span class="loader"></span>
            </div>
          ) : tabs === 0 ? (
            <tbody>
              {queries &&
                queries
                  ?.filter((item) => {
                    return item.status === "pending";
                  })
                  .map((item, index) => {
                    return (
                      <tr>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.mobile}</td>
                        <td>{item?.msg}</td>
                        <td>
                          <button
                            onClick={() => handleSeen(item?._id)}
                            className="add-to-cart-btn w-100"
                          >
                            Seen
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          ) : (
            <tbody>
              {queries &&
                queries
                  ?.filter((item) => {
                    return item.status === "seen";
                  })
                  .map((item, index) => {
                    return (
                      <tr>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.mobile}</td>
                        <td>{item?.msg}</td>
                        <td>Seen</td>
                      </tr>
                    );
                  })}
            </tbody>
          )}
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminQueries;
