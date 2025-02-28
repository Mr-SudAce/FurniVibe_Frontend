import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import SlotCounter from 'react-slot-counter';
// import { FaArrowRight } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
const Heropage = () => {
    return (
        <>
            <div className="flex items-center justify-center p-6 absolute w-full top-0 h-screen" style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url("https://static2.narpon.es/assets/images/parquets/2.jpg")`
            }}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                            Modernized and <br /> Minimalized Furniture Designs
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Get your living room decorated with the best modern designed furniture and also in affordable prices!
                        </p>
                        <Link to="/shop">
                            <button className='flex items-center gap-2 bg-orange-500 rounded-md shadow-md text-white hover:bg-orange-600 px-6 py-3'>
                                Shop
                                <CiShoppingCart className='text-3xl font-extrabold' />
                            </button>
                        </Link>
                        <div className="flex space-x-8 text-gray-700 font-semibold mt-2">
                            <div className='text-center'>
                                <span className="text-xl font-bold"><SlotCounter value="15" />+</span>
                                <p>Unique styles</p>
                            </div>
                            <div className='text-center'>
                                <span className="text-xl font-bold"><SlotCounter value="20" />+</span>
                                <p>Variety of models</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 flex space-x-4 rounded-xl p-1">
                    <Link to="https://x.com/" target='_blank'><FaTwitter className="w-6 h-6 text-blue-400 cursor-pointer" /></Link>
                    <Link to='https://facebook.com/' target='_blank'><FaFacebook className="w-6 h-6 text-blue-600 cursor-pointer" /></Link>
                    <Link to='https://instagram.com/' target='_blank'><FaInstagram className="w-6 h-6 text-red-400 cursor-pointer" />
                    </Link>
                </div>
            </div>


        </>
    )
}

export default Heropage