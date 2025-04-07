
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Navbar from './componats/Nav'
import Createevent from './pages/Createevent'
import Events from './pages/Events'
import Servses from './Pages/Servses'
import Footer from './componats/Footer'
import GenerateQR from './Pages/GenerateQR'
import SubscriberInfo from './Pages/SubscriberInfo'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Nav" element={<Navbar />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/Create' element={<Createevent />} />
        <Route path='/events' element={<Events />} />
        <Route path='/Servses' element={<Servses />} />
        <Route path='/Footer' element={<Footer />} />
        <Route path="/generateQR" element={<GenerateQR />} />
        <Route path="/subscriber/:id" element={<SubscriberInfo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
