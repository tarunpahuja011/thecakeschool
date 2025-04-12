import React, { useEffect, useState } from "react";
import AdminLayout from "./components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminViewOrder.css";
import axios from "axios";
import { message } from "antd";
import EditIcon from "@mui/icons-material/Edit";

const AdminViewOrder = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [singleOrder, setSingleOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("pdfFile", pdfFile);
      for (const key in form) {
        formData.append(key, form[key]);
      }
      const res = await axios.post("/api/admin/update-order", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/admin-orders");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderById = async () => {
    try {
      const res = await axios.post(
        "/api/order/get-order-by-id",
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

  function handleFileChange(e) {
    setPdfFile(e.target.files[0]);
  }

  useEffect(() => {
    getOrderById();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-users-container">
        <div className="page-title">
          <h3 className="m-0">Order Details</h3>
          <br />
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
                    <td>Order ID</td>
                    <td>{form?.orderId}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.name}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Father Name</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="fatherName"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.fatherName}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Mother Name</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="motherName"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.motherName}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Spouse Name</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="spouseName"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.spouseName}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.email}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="mobile"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.mobile}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Aadhar Number</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="aadharNo"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.aadharNo}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="date"
                          name="dob"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.dob}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Course Name</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="courseName"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.courseName}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Course Price</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="coursePrice"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.coursePrice}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Advance Payment</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="advancePayment"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.advancePayment}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Balance Payment</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="text"
                          name="balancePayment"
                          className="form-control"
                          onChange={handleChange}
                          value={form?.balancePayment}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Start Date</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="date"
                          name="startDate"
                          className="form-control"
                          onChange={handleChange}
                          value={
                            form?.startDate
                              ? new Date(form.startDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>End Date</td>
                    <td>
                      <div className="form-fields">
                        <input
                          type="date"
                          name="endDate"
                          className="form-control"
                          onChange={handleChange}
                          value={
                            form?.endDate
                              ? new Date(form.endDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Transaction ID</td>
                    <td>{form?.txnId}</td>
                  </tr>
                  <tr>
                    <td>Photos Link</td>
                    <td>{form?.linkOne || "Not Added"}</td>
                  </tr>
                  <tr>
                    <td>Videos Link</td>
                    <td>{form?.linkTwo || "Not Added"}</td>
                  </tr>
                  <tr>
                    <td>Feedback Link</td>
                    <td>{form?.linkThree || "Not Added"}</td>
                  </tr>
                  <tr>
                    <td>Other Link</td>
                    <td>{form?.linkFour || "Not Added"}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>
                      {form?.createdAt
                        ? new Date(form?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            }
                          )
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{form?.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* ====================== ACTION ===================== */}
          <div className="admin-order-actions">
            <div className="form-fields mb-3">
              <select
                onChange={handleChange}
                value={form?.status}
                name="status"
                className="form-select"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="success">Success</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="form-fields mb-3">
              <label htmlFor="">Cerficate Download Option</label>
              <select
                onChange={handleChange}
                value={form?.certificate}
                name="certificate"
                className="form-select"
              >
                <option value="">Select</option>
                <option value="yes">Approve</option>
                <option value="no">Reject</option>
              </select>
            </div>
            <div className="form-fields">
              <label htmlFor="">Upload Cerficate</label>
              <input
                name="pdfFile"
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button
              className="a-btn w-100 mt-2 text-dark"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminViewOrder;
