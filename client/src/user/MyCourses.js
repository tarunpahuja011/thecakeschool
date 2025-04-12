import React, { useEffect, useState } from "react";
import DashboardLayout from "./components/DashboardLayout";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./MyCourses.css";

const MyCourses = () => {
  const { user } = useSelector((state) => state.user);
  const [courses, setCourses] = useState(null);
  const [tab, setTab] = useState(0);
  const [singleCourse, setSingleCourse] = useState(null);

  function handleChange(e) {
    setSingleCourse({ ...singleCourse, [e.target.name]: e.target.value });
  }

  async function updateLink() {
    try {
      const res = await axios.post(
        "/api/order/user-update-link",
        singleCourse,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getUserCourses();
        setTab(0);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserCourses() {
    try {
      const res = await axios.post("/api/course/get-user-courses", {
        serialNo: user?.serialNo,
      });
      if (res.data.success) {
        setCourses(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user !== null) {
      getUserCourses();
    }
  }, [user]);

  return (
    <Layout>
      <DashboardLayout>
        {tab === 0 && (
          <div className="container">
            <div className="row">
              {courses &&
                courses?.map((item, index) => {
                  return (
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                      <div key={index} className="my-courses">
                        <h5>{item?.courseName}</h5>
                        <hr />
                        <ul>
                          <li>Name - {item?.name}</li>
                          <li>Course Price - {item?.coursePrice}/-</li>

                          {item?.advancePayment === item?.coursePrice && (
                            <li>Paid - {item?.coursePrice}/-</li>
                          )}
                          {item?.advancePayment !== item?.coursePrice && (
                            <>
                              <li>Advance - {item?.advancePayment}/-</li>
                              <li>Balance - {item?.balancePayment}/-</li>
                            </>
                          )}
                          <li>
                            Start Date -{" "}
                            {new Date(item?.startDate).toLocaleString(
                              "default",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </li>
                          <li>
                            End Date -{" "}
                            {new Date(item?.endDate).toLocaleString("default", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </li>
                        </ul>
                        {item?.status === "success" ? (
                          <button
                            onClick={() => {
                              setTab(1);
                              setSingleCourse(item);
                            }}
                            className="c-btn pay-btn"
                          >
                            Submit Links
                          </button>
                        ) : (
                          <button className="c-btn pay-btn">
                            In Verification
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* COURSE INFO  */}
        {tab === 1 && (
          <>
            <div className="my-course-details">
              <span onClick={() => setTab(0)}>
                <ArrowBackIcon className="icon me-2" />
                GO Back
              </span>
            </div>
            <h5 className="mt-5">Read this:</h5>
            <p>
              We're thrilled to see your creativity and dedication in showcasing
              your work from our courses! To streamline the process and ensure
              easy access for both you and our team, please follow these
              instructions when uploading your photos and videos:
            </p>
            <ul>
              <li>
                1. Creating Folders: • Before sharing your work, please create
                separate folders for photos and videos on your preferred
                platform (e.g., Google Drive). • Name the folders appropriately
                for easy identification (e.g., "Course Name - Your Name -
                Photos" and "Course Name - Your Name - Videos").
              </li>
              <li>
                2. Sharing URLs: • Share the URL of the folder containing your
                photos as the first link. • Share the URL of the folder
                containing your videos as the second link. • If you've uploaded
                your work on any social media platform, share the respective
                URLs too.
              </li>
              <li>
                3. Feedback Video: • We highly encourage you to share your
                feedback on your course experience through a video. • In the
                feedback video, express how joining this course has impacted you
                and how it has helped you grow. • Share the URL of your feedback
                video as the third link.
              </li>
              <li>
                4. Optional Additions: • You may include an optional fourth URL
                if you wish to share any additional content related to your
                course experience or work.
              </li>
            </ul>
            <table className="mt-5 table table-bordered">
              <thead>
                <tr>
                  <td>Serial No</td>
                  <td>{singleCourse?.serialNo}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{singleCourse?.name}</td>
                </tr>
                <tr>
                  <td>Father Name</td>
                  <td>{singleCourse?.fatherName}</td>
                </tr>
                <tr>
                  <td>Mother Name</td>
                  <td>{singleCourse?.motherName}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{singleCourse?.dob}</td>
                </tr>
                <tr>
                  <td>Aadhar No</td>
                  <td>{singleCourse?.aadharNo}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{singleCourse?.address}</td>
                </tr>
                <tr>
                  <td>Course</td>
                  <td>{singleCourse?.courseName}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{singleCourse?.coursePrice}</td>
                </tr>
                <tr>
                  <td>First Link (Photos)</td>
                  <td>
                    <div className="form-fields">
                      <input
                        onChange={handleChange}
                        name="linkOne"
                        value={singleCourse?.linkOne}
                        type="text"
                        className="form-control"
                        placeholder="Enter drive link (Photos only)"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Second Link (Videos)</td>
                  <td>
                    <div className="form-fields">
                      <input
                        onChange={handleChange}
                        name="linkTwo"
                        value={singleCourse?.linkTwo}
                        type="text"
                        className="form-control"
                        placeholder="Enter drive link (Videos Only)"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Third Link (Feedback)</td>
                  <td>
                    <div className="form-fields">
                      <input
                        onChange={handleChange}
                        name="linkThree"
                        value={singleCourse?.linkThree}
                        type="text"
                        className="form-control"
                        placeholder="Enter drive link (Feedback Only)"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Fourth Link (Additional)</td>
                  <td>
                    <div className="form-fields">
                      <input
                        onChange={handleChange}
                        name="linkFour"
                        value={singleCourse?.linkFour}
                        type="text"
                        className="form-control"
                        placeholder="Enter drive link (Other Link you want to Add of your choice)"
                      />
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
            <button onClick={updateLink} className="c-btn pay-btn">
              Submit
            </button>
          </>
        )}
      </DashboardLayout>
    </Layout>
  );
};

export default MyCourses;
