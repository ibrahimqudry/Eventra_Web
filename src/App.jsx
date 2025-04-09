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
import Notifications from "./Pages/Notifications";
import SavedEvents from "./Pages/SavedEvents";
import Footer from "./componats/Footer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/Nav" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Create" element={<Createevent />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/saved-events" element={<SavedEvents />} />
          <Route path="/Servses" element={<Servses />} />
          <Route path="/Footer" element={<Footer />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
