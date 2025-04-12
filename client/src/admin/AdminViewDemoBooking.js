import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "./AdminViewDemoBooking.css";

const AdminViewDemoBooking = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  async function handleVerify(id, status) {
    try {
      let res;
      if (status === "success") {
        res = await axios.post("/api/demo/approve-demo", {
          id: id,
          status,
          demoDate: form?.demoDate,
          demoTime: form?.demoTime,
        });
      } else {
        res = await axios.post("/api/demo/reject-demo", {
          id: id,
          status,
        });
      }
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/admin-demo-booking");
        getBookingById();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getBookingById = async () => {
    try {
      const res = await axios.post(
        "/api/demo/get-demo-by-id",
        {
          id: params?.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setForm(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    getBookingById();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <h3 className="m-0">Demo Booking Details</h3>
        </div>
        <div className="admin-view-order-container">
          <div className="admin-order-details-container">
            <h5 className="m-0">Order ID #{form?.orderId}</h5>
            <div className="admin-order-item-details">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{form?.fullName}</td>
                  </tr>
                  <tr>
                    <td>Father Name</td>
                    <td>{form?.fatherName}</td>
                  </tr>
                  <tr>
                    <td>Mother Name</td>
                    <td>{form?.motherName}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{form?.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>{form?.phone}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    <td>{form?.dob}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{form?.address}</td>
                  </tr>
                  <tr>
                    <td>Transaction ID</td>
                    <td>{form?.txnId}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{form?.status}</td>
                  </tr>
                  <tr>
                    <td>Booking Date</td>
                    <td>
                      {form?.created
                        ? new Date(form?.created).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* ====================== ACTION ===================== */}
          <div className="admin-order-actions">
            <div className="form-fields mb-3">
              <input
                className="form-control"
                onChange={handleChange}
                value={form?.demoDate}
                type="date"
                name="demoDate"
                id=""
              />
            </div>
            <div className="form-fields mb-3">
              <input
                className="form-control"
                onChange={handleChange}
                value={form?.demoTime}
                type="time"
                name="demoTime"
                id=""
              />
            </div>
            <button
              className="a-btn w-100 bg-success mt-2 text-white"
              onClick={() => handleVerify(form?._id, "success")}
            >
              Approve
            </button>
            <button
              className="a-btn bg-danger w-100 mt-2 text-white"
              onClick={() => handleVerify(form?._id, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminViewDemoBooking;
