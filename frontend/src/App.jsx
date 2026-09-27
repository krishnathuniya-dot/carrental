
import "./App.css";
import { Routes, Route } from "react-router-dom";

// =========================================================
// USER / PUBLIC PAGES
// =========================================================
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Carlistening from "./pages/Carlistening";
import FaQs from "./pages/FaQs";
import Contactus from "./pages/Contactus";
import Profile from "./pages/Profile";
import Updatepassword from "./pages/Updatepassword";
import Booking from "./pages/Booking";
import Testimonial from "./pages/Testimonial";
import View from "./pages/View";

// =========================================================
// USER LAYOUT
// =========================================================
import Homenav from "./layout/Homenav";
import Sidebar from "./layout/Sidebar";

// =========================================================
// ADMIN
// =========================================================
import Admin from "./pages/Admin";
import AdminDash from "./pages/AdminDash";
import Adminnav from "./layout/Adminnav";
import ProtectedRoute from "./component/ProtectedRoute";

// =========================================================
// ADMIN PAGES
// =========================================================
import Registerdata from "./pages/registerdata";
import Managecontact from "./pages/Managecontact";
import Contactinfo from "./pages/Contactinfo";
import Subscribedata from "./pages/Subscribedata";
import AddVehicle from "./pages/AddVehicle";
import Vehicledata from "./pages/vehicledata";
import CreateBrand from "./pages/Createbrand";
import Managebrand from "./pages/Managebrand";
import Managebooking from "./pages/Managebooking";
import Testimonialdata from "./pages/testimonialdata";
import Edit from "./pages/Edit";
import Brandedit from "./pages/Brandedit";

function App() {
  return (
    <div>
      <Routes>

        {/* =====================================================
            PUBLIC / USER ROUTES
        ====================================================== */}

        <Route path="/" element={<Homenav />}>
          
          <Route index element={<Home />} />

          <Route path="/aboutus" element={<Aboutus />} />

          <Route
            path="/carlistening"
            element={<Carlistening />}
          />

          <Route
            path="/faQs"
            element={<FaQs />}
          />

          <Route
            path="/contactus"
            element={<Contactus />}
          />

          {/* =================================================
              USER SIDEBAR ROUTES
          ================================================== */}

          <Route element={<Sidebar />}>

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/updatepassword"
              element={<Updatepassword />}
            />

            <Route
              path="/booking"
              element={<Booking />}
            />

            <Route
              path="/testimonial"
              element={<Testimonial />}
            />

          </Route>

          {/* Vehicle Details */}
          <Route
            path="/view/:id"
            element={<View />}
          />

        </Route>


        {/* =====================================================
            ADMIN LOGIN
        ====================================================== */}

        <Route
          path="/admin"
          element={<Admin />}
        />


        {/* =====================================================
            PROTECTED ADMIN ROUTES
        ====================================================== */}

        <Route element={<ProtectedRoute role="admin" />}>

          <Route path="/" element={<Adminnav />}>

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={<AdminDash />}
            />

            {/* Users */}
            <Route
              path="/users"
              element={<Registerdata />}
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={<Managecontact />}
            />

            {/* Contact Information */}
            <Route
              path="/info"
              element={<Contactinfo />}
            />

            {/* Subscribers */}
            <Route
              path="/subscribe"
              element={<Subscribedata />}
            />

            {/* Add Vehicle */}
            <Route
              path="/addvevechele"
              element={<AddVehicle />}
            />

            {/* Vehicle Data */}
            <Route
              path="/cardata"
              element={<Vehicledata />}
            />

            {/* Create Brand */}
            <Route
              path="/createbrands"
              element={<CreateBrand />}
            />

            {/* Manage Brand */}
            <Route
              path="/managebrand"
              element={<Managebrand />}
            />

            {/* Manage Booking */}
            <Route
              path="/managebooking"
              element={<Managebooking />}
            />

            {/* Testimonial Data */}
            <Route
              path="/testimonaldata"
              element={<Testimonialdata />}
            />

            {/* Edit Vehicle */}
            <Route
              path="/edit/:id"
              element={<Edit />}
            />

            {/* Edit Brand */}
            <Route
              path="/brandedit/:id"
              element={<Brandedit />}
            />

          </Route>

        </Route>

      </Routes>
    </div>
  );
}

export default App;


