import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
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
import Footer from "./componats/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Nav" element={<Navbar />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Create" element={<Createevent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/Servses" element={<Servses />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
