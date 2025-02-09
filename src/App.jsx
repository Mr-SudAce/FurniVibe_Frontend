import './App.css'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from './Components/Navbar.jsx'
import Heropage from './Components/Heropage.jsx'
import Product from './Components/Product.jsx'
import Contact from './Components/Contact.jsx'
import AboutUs from './Components/AboutUs.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className='w-full bg-gray-850'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Heropage />}></Route>
          <Route path="/Product" element={<Product />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
