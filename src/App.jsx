import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import SideNav from './coponats/SideNav';
import TopNav from './coponats/TopNav';
import Dashbord from './pages/Dashbord';
import EventM from './pages/EventM';
import Orderm from './pages/Ordersm';
import Profile from './pages/Profile';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/topnav" element={<TopNav />} />
          <Route path="/" element={<SideNav />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path='/Eventm' element={<EventM />} />
          <Route path='/orders' element={<Orderm />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
