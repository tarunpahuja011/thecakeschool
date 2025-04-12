import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./user/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import EditUser from "./admin/EditUser";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import AdminLogin from "./admin/AdminLogin";
import AdminProduct from "./admin/AdminProduct";
import AdminAddProduct from "./admin/AdminAddProduct";
import AdminEditProduct from "./admin/AdminEditProduct";
import AdminOrder from "./admin/AdminOrder";
import AdminDemoBookings from "./admin/AdminDemoBookings";
import CourseInfo from "./pages/CourseInfo";
import Checkout from "./pages/Checkout";
import StudentVerification from "./pages/StudentVerification";
import Certificate from "./pages/Certificate";
import Gallery from "./pages/Gallery";
import BookDemo from "./pages/BookDemo";
import MyCourses from "./user/MyCourses";
import Account from "./user/Account";
import AdminViewOrder from "./admin/AdminViewOrder";
import AdminQueries from "./admin/AdminQueries";
import CoursePage from "./pages/CoursePage";
import ProductPage from "./pages/ProductPage";
import AdminAddCourse from "./admin/AdminAddCourse";
import AdminCourses from "./admin/AdminCourses";
import AdminEditCourse from "./admin/AdminEditCourse";
import AdminAddUser from "./admin/AdminAddUser";
import AdminRegisteredUsers from "./admin/AdminRegisteredUsers";
import AdminViewDemoBooking from "./admin/AdminViewDemoBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pages */}
        <Route path="/:token?" element={<Home />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/course/:name?" element={<CourseInfo />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/checkout/:name/:price?" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student-verification" element={<StudentVerification />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/book-a-demo" element={<BookDemo />} />
        {/* <Route path="/checking-status" element={<CheckStatus />} /> */}
        {/* <Route path="/faq" element={<FrequentlyAskedQuestions />} /> */}

        {/* USER PAGES  */}
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/service" element={<Service />} /> */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        {/* ======================== USER PAGES =============================== */}
        {/* ========== EMAIL VERIFY */}
        <Route
          path="/user-dashboard/:token?"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* ======================== USER PAGES =============================== */}
        {/* ======================== ADMIN PAGES =============================== */}
        <Route
          path="/admin-login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedRoute>
              <AdminOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-view-registered-user/:id?"
          element={
            <ProtectedRoute>
              <AdminViewOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedRoute>
              <AdminProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-add-product"
          element={
            <ProtectedRoute>
              <AdminAddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-edit-product/:id?"
          element={
            <ProtectedRoute>
              <AdminEditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-courses"
          element={
            <ProtectedRoute>
              <AdminCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-add-course"
          element={
            <ProtectedRoute>
              <AdminAddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-edit-course/:id?"
          element={
            <ProtectedRoute>
              <AdminEditCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-add-user"
          element={
            <ProtectedRoute>
              <AdminAddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-edit-user/:id?"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-queries"
          element={
            <ProtectedRoute>
              <AdminQueries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-register-users"
          element={
            <ProtectedRoute>
              <AdminRegisteredUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-demo-booking"
          element={
            <ProtectedRoute>
              <AdminDemoBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-view-demo/:id?"
          element={
            <ProtectedRoute>
              <AdminViewDemoBooking />
            </ProtectedRoute>
          }
        />
        {/* ======================== ADMIN PAGES =============================== */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
