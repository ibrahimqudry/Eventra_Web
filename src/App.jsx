import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Navbar from "./componats/Nav";
import Signin from "./Pages/Signin";
import Createevent from "./pages/Createevent";
import Events from "./Pages/Events";
import Servses from "./Pages/Servses";
import UserDashboard from "./Pages/UserDashboard";
import EventDetails from "./Pages/EventDetails";
import Footer from "./componats/Footer";
import CustomerReviews from "./Pages/PreviousEvents";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SavedEvents from "./Pages/SavedEvents";
import Nav from "./componats/Nav";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Create" element={<Createevent />} />
          <Route path="/events" element={<Events />} />
          <Route path="/Servses" element={<Servses />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="/SavedEvents" element={<SavedEvents />} />
          <Route path="/previous" element={<CustomerReviews />} />
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

  );
}

export default App;
