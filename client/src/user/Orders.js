import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DashboardLayout from "./components/DashboardLayout";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [allOrders, setAllOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllUserOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/order/get-user-orders",
        { email: user?.email },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setAllOrders(res.data.data.reverse());
        setLoading(false);
      } else {
        setLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getUSerOrderStatus = async () => {
    try {
      const res = await axios.post("/api/order/user-check-order-status", {
        email: user?.email,
      });
      if (res.data.success) {
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      getAllUserOrders();
      getUSerOrderStatus();
    }
  }, [user]);

  return (
    <Layout>
      <DashboardLayout>
        <div className="user-order-container">
          {loading ? (
            <div className="loader-container text-center">
              <span class="loader"></span>
            </div>
          ) : allOrders && allOrders?.length === 0 ? (
            <div className="no-order-found">
              <b>No Order Found</b>
              <button
                className="btn text-decoration-underline"
                onClick={() => navigate("/phone-skins")}
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allOrders?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.client_txn_id}</td>
                      <td>
                        {item?.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )
                          : ""}
                      </td>
                      <td>{item?.status}</td>
                      <td>{item?.price}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/view-order/${item?._id}`)}
                          className="view-btn"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export default Orders;
