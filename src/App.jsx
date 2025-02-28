import './App.css'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from './Components/Navbar.jsx'
import Heropage from './Components/Heropage.jsx'
import Shop from './Components/Shop.jsx'
import Contact from './Components/Contact.jsx'
import AboutUs from './Components/AboutUs.jsx'
import CatgProdDetail from './Components/CatgProdDetail.jsx'
import ProductDetail from './Components/ProductDetail.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className='w-full bg-gray-850'>
        <Navbar />
          <div className='mt-20'>
        <Routes>

            <Route path='/' element={<Heropage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:category" element={<CatgProdDetail />} />
            <Route path="/product/:id" element={<ProductDetail />}></Route>
        </Routes>
          </div>
      </div>
    </BrowserRouter>
  )
}

export default App
