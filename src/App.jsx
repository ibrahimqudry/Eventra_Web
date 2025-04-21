// React and Routing
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Toast Notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles
import './App.css';

// Core Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Createevent from './Pages/Createevent';
import Events from './Pages/Events';
import EventDetails from './Pages/EventDetails';

import PreviousEventPage from "./Pages/PreviousEventPage";
import UserDashboard from './Pages/UserDashboard';
import CheckoutPage from './Pages/CheckoutPage';
// import GenerateQR from './Pages/GenerateQR';
// import SubscriberInfo from './Pages/SubscriberInfo';
import Registration from './Pages/Registration';

// Event Manager Pages
import EventMDashbord from './Pages/EventManagerDashboard';
import EventM from './Pages/EventM';
import Orderm from './Pages/Ordersm';
import Profile from './Pages/Profile';
import AdminDashboard from './Pages/AdminDashboard';

// Service Owner Dashboard Components
import SODashboard from './SODashboard/pages/Dashboard';
import SOBookings from './SODashboard/pages/Bookings';
import SOReviews from './SODashboard/pages/Reviews';
import SOEarnings from './SODashboard/pages/Earnings';
import SOProfile from './SODashboard/pages/Profile';
import SOServices from './SODashboard/pages/Services';
import ServiceForm from './SODashboard/pages/ServiceForm';
import { Link } from 'react-router-dom';


// Shared Components
import Navbar from './components/Nav';
import Footer from './components/Footer';
import Services from './Pages/services';
// Change this line
import ServiceDetails from './Pages/ServiceDetails';
import Previous from './Pages/Previous';


function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          {/* Main Routes */}
          <Route path="/Nav" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/Create' element={<Createevent />} />
          <Route path='/services' element={<Services />} />
          <Route path='/Footer' element={<Footer />} />
        

          {/* Events Pages */}
          <Route path='/events' element={<Events />} />
          {/* <Route path="/previous" element={<PreviousEventPage />} /> */}
          <Route path="/previous" element={<Previous />} />
          <Route path="/event-details/:id" element={<EventDetails />} />


          {/* EventManager Dashboard */}
          <Route path="/EventMDashbord" element={<EventMDashbord />} />
          <Route path='/Eventm' element={<EventM />} />
          <Route path='/orders' element={<Orderm />} />
          <Route path='/profile' element={<Profile />} />

          {/* UserDashboard */}
          
          <Route path="/user" element={<UserDashboard />} />

          {/* Paypal */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* ServiceOwnerDashboard */}
          {/* Main routes */}
          <Route path="/sodashboard" element={<SODashboard />} />
          <Route path="/soservices" element={<SOServices />} />
          <Route path="/sobookings" element={<SOBookings />} />
          <Route path="/soreviews" element={<SOReviews />} />
          <Route path="/soearnings" element={<SOEarnings />} />
          <Route path="/soprofile" element={<SOProfile />} />
          <Route path="/serviceDetails/:id" element={<ServiceDetails />} />

          {/* Service management routes */}
          <Route path="/services/new" element={<ServiceForm />} />
          <Route path="/services/edit/:id" element={<ServiceForm />} />



          {/* 404 route */}
          <Route
            path="*"
            element={
              <div className="not-found">
                <h1>404 - Page Not Found</h1>
                <Link to="/dashboard">Return to Dashboard</Link>
              </div>
            }
          />

          {/* AdminDashboard route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>


        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Provider>
  )
}

export default App
