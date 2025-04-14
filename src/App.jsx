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
import SavedEvents from './Pages/SavedEvents';
import UserDashboard from './Pages/UserDashboard';
import Notifications from './Pages/Notifications';
import CheckoutPage from './Pages/CheckoutPage';
import GenerateQR from './Pages/GenerateQR';
import SubscriberInfo from './Pages/SubscriberInfo';
import Registration from './Pages/Registration';

// Event Manager Pages
import EventMDashbord from './Pages/EventManagerDashboard';
import EventM from './Pages/EventM';
import Orderm from './Pages/Ordersm';
import Profile from './Pages/Profile';

// Service Owner Dashboard Components
import SOBookings from './components/Bookings';
import SOServices from './components/Services';
import SOProfile from './components/Profile';
import SODashboard from './components/Dashboard';

// Shared Components
import Navbar from './components/Nav';
import Footer from './components/Footer';
import Services from './Pages/services';


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
          <Route path='/events' element={<Events />} />
          <Route path='/services' element={<Services />} />
          <Route path='/Footer' element={<Footer />} />
          <Route path="/generateQR" element={<GenerateQR />} />
          <Route path="/subscriber/:id" element={<SubscriberInfo />} />

          {/* EventManager Dashboard */}
          <Route path="/EventMDashbord" element={<EventMDashbord />} />
          <Route path='/Eventm' element={<EventM />} />
          <Route path='/orders' element={<Orderm />} />
          <Route path='/profile' element={<Profile />} />

          {/* UserDashboard */}
          <Route path='/event-details/:eventId' element={<EventDetails />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/savedEvents' element={<SavedEvents />} />
          <Route path="/user" element={<UserDashboard />} />

          {/* Paypal */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* ServiceOwnerDashboard */}
          <Route path="/serviceOwnerDashboard">
            <Route index element={<SODashboard />} />
            <Route path="services" element={<SOServices />} />
            <Route path="profile" element={<SOProfile />} />
            <Route path="bookings" element={<SOBookings />} />
          </Route>
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
