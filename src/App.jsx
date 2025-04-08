
// Importing React and other necessary libraries
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Navbar from './components/Nav'
import Createevent from './pages/Createevent'
import Events from './pages/Events'
import Services from './Pages/services'
import Footer from './components/Footer'
import GenerateQR from './Pages/GenerateQR'
import SubscriberInfo from './Pages/SubscriberInfo'

// Event Manager Dashboard
import EventMDashbord from './Pages/EventManagerDashboard';
import EventM from './pages/EventM';
import Orderm from './pages/Ordersm';
import Profile from './pages/Profile';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/Nav" element={<Navbar />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/Create' element={<Createevent />} />
        <Route path='/events' element={<Events />} />
        <Route path='/services' element={<Services />} />
        <Route path='/Footer' element={<Footer />} />
        <Route path="/generateQR" element={<GenerateQR />} />
        <Route path="/subscriber/:id" element={<SubscriberInfo />} />

        {/* EventManager Dashboard /> */}
        <Route path="/EventMDashbord" element={<EventMDashbord />} />
        <Route path='/Eventm' element={<EventM />} />
        <Route path='/orders' element={<Orderm />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
