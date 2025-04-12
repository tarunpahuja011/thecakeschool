import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
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
        setAllOrders(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      getAllUserOrders();
    }
  }, [user]);

  const getUserData = async () => {
    axios
      .post(
        "/api/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (params.token) {
      localStorage.setItem("token", params.token);
    }
    getUserData();
  }, []);

  return (
    <Layout>
      <DashboardLayout>
        <span>
          Hello! <b>{user?.name}</b>
        </span>
        <br />
        <span>
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses, and edit your password and
          account details.
        </span>
      </DashboardLayout>
    </Layout>
  );
};

export default Dashboard;
