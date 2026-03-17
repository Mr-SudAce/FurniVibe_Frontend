import './App.css'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as Index from "./index.jsx";

function App() {
return (
    <BrowserRouter>
      <div className='w-full bg-gray-850'>
        <Index.Navbar/>
        <div className='mt-20'>
          <Routes>
            <Route path='/' element={<Index.Heropage />} />
            <Route path="/shop" element={<Index.Shop />} />
            <Route path="/about" element={<Index.AboutUs />} />
            <Route path="/contact" element={<Index.Contact />} />
            <Route path="/category/:category" element={<Index.CatgProdDetail />} />
            <Route path="/product/:id/:product_name/" element={<Index.ProductDetail />} />
            <Route path='/checkout' element={<Index.CheckoutList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
