import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
const Heropage = () => {
    return (
        <>
            <div className="h-[718px] flex items-center justify-center p-6 relative">

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                            Modernized and <br /> Minimalized Furniture Designs
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Get your living room decorated with the best modern designed furniture and also in affordable prices!
                        </p>
                        <button className="bg-orange-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-orange-600">
                            Shop Now
                        </button>
                        <div className="flex space-x-8 text-gray-700 font-semibold">
                            <div>
                                <span className="text-xl font-bold">100+</span>
                                <p>Unique styles</p>
                            </div>
                            <div>
                                <span className="text-xl font-bold">1000+</span>
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