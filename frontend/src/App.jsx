import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Homenav from './layout/Homenav';

import Carlistening from './pages/Carlistening';
import FaQs from './pages/FaQs';
import Contactus from './pages/Contactus';

import Profile from './pages/Profile';
import Updatepassword from './pages/Updatepassword';
import Sidebar from './layout/Sidebar';

import Booking from './pages/Booking';
import Testimonial from './pages/Testimonial';
import Admin from './pages/Admin';

import Adminnav from './layout/Adminnav';
import ProtectedRoute from './component/ProtectedRoute';

import AdminDash from './pages/AdminDash';
import View from './pages/View';
import Managecontact from './pages/Managecontact';
import Registerdata from './pages/registerdata';
import Contactinfo from './pages/Contactinfo';
import Subscribedata from './pages/Subscribedata';
import AddVehicle from './pages/AddVehicle';
import Vehicledata from './pages/vehicledata';
import CreateBrand from './pages/Createbrand';
import Managebrand from './pages/Managebrand';
import Managebooking from './pages/Managebooking';
import Testimonialdata from './pages/testimonialdata';
import Edit from './pages/Edit';
import Brandedit from './pages/Brandedit';

function App() {
  return (
    <div>
      <Routes>
        {/* navbar */}

        <Route path='/' element={<Homenav />} >
          <Route path='/' element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/carlistening" element={<Carlistening></Carlistening>} />
          <Route path="/faQs" element={<FaQs></FaQs>} />
          <Route path="/contactus" element={<Contactus></Contactus>} />
          {/* sidebar */}
          <Route path='/' element={<Sidebar></Sidebar>}>

            <Route path="/profile" element={<Profile></Profile>} />
            <Route path="/updatepassword" element={<Updatepassword></Updatepassword>} />
            <Route path="/booking" element={<Booking></Booking>} />
            <Route path="/testimonial" element={<Testimonial></Testimonial>} />

          </Route>
          <Route path="/view/:id" element={<View></View>}></Route>

        </Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
        {/* protected route */}
        <Route element={
          <ProtectedRoute role={"admin"} />}>


          <Route path="/" element={<Adminnav></Adminnav>}>
            <Route path="/dashboard" element={<AdminDash />} />
            <Route path="/users" element={<Registerdata></Registerdata>} />
            <Route path="/contact" element={<Managecontact></Managecontact>} />
            <Route path="/info" element={<Contactinfo></Contactinfo>} />
            <Route path="/subscribe" element={<Subscribedata></Subscribedata>} />
            <Route path="/addvevechele" element={<AddVehicle></AddVehicle>} />
            <Route path="/cardata" element={<Vehicledata></Vehicledata>} />
            <Route path="/createbrands" element={<CreateBrand></CreateBrand>} />
            <Route path="/managebrand" element={<Managebrand></Managebrand>} />
            <Route path="/managebooking" element={<Managebooking></Managebooking>} />
            <Route path="/testimonaldata" element={<Testimonialdata></Testimonialdata>} />
            <Route path="/edit/:id" element={<Edit></Edit>} />
            <Route path="/brandedit/:id" element={<Brandedit></Brandedit>} />


          </Route>







        </Route>

      </Routes>
    </div>
  );
}

export default App;