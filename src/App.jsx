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

// Add this import at the top with other imports
import ProtectedRoute from './components/ProtectedRoute';
import Status from './Pages/Status';

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

          <Route path="/generateQR" element={<GenerateQR />} />
          <Route path="/subscriber/:id" element={<SubscriberInfo />} />
          <Route path="/status" element={<Status />} />



          {/* Events Pages */}
          <Route path='/events' element={<Events />} />
          {/* <Route path="/previous" element={<PreviousEventPage />} /> */}
          <Route path="/previous" element={<Previous />} />
          <Route path="/event-details/:id" element={<EventDetails />} />


          {/* EventManager Dashboard */}
          <Route path="/EventMDashbord" element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <EventMDashbord />
            </ProtectedRoute>
          } />
          <Route path='/Eventm' element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <EventM />
            </ProtectedRoute>
          } />
          <Route path='/orders' element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <Orderm />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <Profile />
            </ProtectedRoute>
          } />

          {/* UserDashboard */}
          
          <Route path="/user" element={<UserDashboard />} />
          {/* Paypal */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* ServiceOwnerDashboard */}
          {/* Main routes */}

          <Route path="//serviceDetails/:id" element={<ServiceDetails />} />
          <Route path="/sodashboard" element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <SODashboard />
            </ProtectedRoute>
          } />
          <Route path="/soservices" element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <SOServices />
            </ProtectedRoute>
          } />
          <Route path="/sobookings" element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <SOBookings />
            </ProtectedRoute>
          } />
          <Route path="/soreviews" element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <SOReviews />
            </ProtectedRoute>
          } />
          <Route path="/soearnings" element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <SOEarnings />
            </ProtectedRoute>
          } />
          <Route path="/soprofile" element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <SOProfile />
            </ProtectedRoute>
          } />
          

          {/* Service management routes */}
          <Route path="/services/new" element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <ServiceForm />
            </ProtectedRoute>
          } />
          <Route path="/services/edit/:id" element={
            <ProtectedRoute allowedStatuses={['approved']}>
              <ServiceForm />
            </ProtectedRoute>
          } />



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
