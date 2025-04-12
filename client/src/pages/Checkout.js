import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { setUser } from "../redux/features/userSlice";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import IMAGES from "../img/image";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(false);
  const [mode, setMode] = useState("cod");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [advance, setAdvance] = useState("");
  const [txnId, setTxnId] = useState("");

  const generateOrderId = () => {
    const numbers = "01234567"; // 10 numbers
    const randomNumbers = Array.from({ length: 7 }, () =>
      numbers.charAt(Math.floor(Math.random() * numbers.length))
    );
    const orderId = randomNumbers.join("");
    setOrderId(orderId);
  };

  useEffect(() => {
    generateOrderId();
  }, []);

  async function handleBooking() {
    setLoading(true);
    try {
      const orderObject = {
        orderId: orderId,
        serialNo: user?.serialNo,
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
        aadharNo: user?.aadharNo,
        fatherName: user?.fatherName,
        motherName: user?.motherName,
        dob: user?.dob,
        address: user?.address,
        courseName: params?.name,
        coursePrice: params?.price,
        advancePayment: mode === "cod" ? 0 : advance,
        balancePayment:
          mode === "cod"
            ? params?.price
            : parseInt(params?.price) - parseInt(advance),
        txnId: mode === "cod" ? "Cash On Delivery" : txnId,
      };
      const res = await axios.post("/api/order/place-order", orderObject);
      if (res.data.success) {
        setOrderSuccess(true);
        setPaymentPopup(false);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        setLoading(false);
        message.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <Layout>
      {paymentPopup && (
        <div className="payment-popup">
          <div className="barcode-container">
            <img src={IMAGES.barcode} alt="" />
            <div className="form-fields w-100 mt-3">
              <p className="text-danger mt-0">
                <small>
                  Note: You can pay full amount <b>{params?.price}</b> OR the
                  other option is pay 50% amount which is{" "}
                  <b>Rs.{params?.price / 2}</b>
                </small>
              </p>
              <input
                value={advance}
                onChange={(e) => setAdvance(e.target.value)}
                placeholder="Enter amount you paid"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-fields w-100 mt-3">
              <input
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                placeholder="Enter Transaction Id"
                type="text"
                className="form-control"
              />
            </div>
            <p className="text-danger">
              <small>
                Note: After Successfull Payment click on Verify Button
              </small>
            </p>
            <div className="d-flex gap-2">
              <button
                onClick={handleBooking}
                className="c-btn pay-btn m-0 w-50"
              >
                Verify Payment
              </button>
              <button
                onClick={() => setPaymentPopup(!paymentPopup)}
                className="c-btn pay-btn m-0 bg-danger w-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {orderSuccess ? (
        <div className="order-success-container">
          <CheckIcon className="icon" />
          <span className="text-muted">Hey! {user?.name}</span>
          <h4 className="my-1">Thank you for ordering!</h4>
          <span className="text-muted text-center">
            We have received your order, Our team will contact you shortly
          </span>
          <div className="mt-4 gap-2 d-flex justify-content-center align-items-center">
            <button
              onClick={() => {
                navigate("/my-courses");
                setOrderSuccess(false);
              }}
              className="c-btn"
            >
              Check Order Status
            </button>
            <button
              onClick={() => {
                navigate("/");
                setOrderSuccess(false);
              }}
              className="c-btn"
            >
              Go To Home
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="order-placing-loader">
          <div class="me-2 spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <br />
          Do not refresh the page
          <br />
          Order Processing!
        </div>
      ) : (
        <div className="container checkout-container">
          <div className="customer-form">
            {!user && (
              <h5>
                Already a customer? <Link to="/login">Login</Link>
              </h5>
            )}
            {user && (
              <div>
                <h5>Account Details</h5>
                <div className="row">
                  <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
                    <label className="form-label" htmlFor="">
                      Name :
                    </label>
                    <h5>{user && user?.name}</h5>
                  </div>
                  <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
                    <label className="form-label" htmlFor="">
                      Email :
                    </label>
                    <h5>{user && user?.email}</h5>
                  </div>
                  <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
                    <label className="form-label" htmlFor="">
                      Mobile :
                    </label>
                    <h5>{user && user?.mobile}</h5>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CART  */}
          <div className="checkout-product-details">
            <div className="checkout-item-container">
              <div className="d-flex justify-content-between">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              <hr />
              <div className="checkout-item">
                <span>{params?.name}</span>
                <span>{params?.price}/-</span>
              </div>
              <hr />
              {/* TOTAL  */}
              <div className="checkout-item">
                <h6>Total </h6>
                <h4 className="m-0">
                  <b>Rs. {params?.price}</b>
                </h4>
              </div>
              <div className="checkout-item">
                <span>
                  <b>Payment Mode</b>
                </span>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMode"
                      id="walletRadio"
                      value="wallet"
                      checked={mode === "cod"}
                      onChange={() => setMode("cod")}
                    />
                    <label className="form-check-label" htmlFor="walletRadio">
                      Cash
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMode"
                      id="walletRadio2"
                      value="upi"
                      onChange={() => setMode("upi")}
                    />
                    <label className="form-check-label" htmlFor="walletRadio2">
                      UPI
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="w-100 pay-btn c-btn"
              >
                Login to Continue
              </button>
            ) : mode === "cod" ? (
              <button onClick={handleBooking} className="w-100 pay-btn c-btn">
                Book Now & Pay Cash
              </button>
            ) : mode === "upi" ? (
              <button
                onClick={() => setPaymentPopup(!paymentPopup)}
                className="w-100 pay-btn c-btn"
              >
                Book Online
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Checkout;
