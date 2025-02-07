import './App.css'
import './index.css'
import Navbar from './Components/Navbar.jsx'
import Heropage from './Components/Heropage.jsx'

function App() {
  return (
    <>
      <div className='w-full' style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("https://static2.narpon.es/assets/images/parquets/2.jpg")`
      }}>

        <Navbar />
        <Heropage />
      </div>
    </>
  )
}

export default App
