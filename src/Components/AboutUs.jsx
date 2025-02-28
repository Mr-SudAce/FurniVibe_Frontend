import aboutus1 from "../assets/images/aboutus.jpg"
import { FiUsers, FiAward } from "react-icons/fi";
import SlotCounter from 'react-slot-counter';


const AboutUs = () => {
    const stats = [
        {
            icon: <FiUsers className="w-6 h-6" />,
            value: <SlotCounter value={10} />,
            label: "Happy Clients"
        },
        {
            icon: <FiAward className="w-6 h-6" />,
            value: <SlotCounter value={15} />,
            label: "Years Experience"
        },
    ];

    return (
        <div className="w-full ">
            <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-24 uppercase">About Us</h1>
                </div>

                <h2 className="text-4xl font-semibold text-black mb-4">What We Do</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed text-md text-justify">
                            At OSF, we take pride in offering high-quality, durable furniture that blends style, functionality, and affordability. Our collection includes a wide range of pieces designed to enhance homes, offices, and other spaces, ensuring comfort and elegance. We focus on craftsmanship and attention to detail, using quality materials to create furniture that not only looks great but also stands the test of time. Whether you’re looking for a classic design or something modern and trendy, our diverse selection ensures you’ll find the perfect fit for your needs. We understand that furniture is a long-term investment, which is why we prioritize durability and affordability. Our goal is to provide customers with stylish yet sturdy furniture at competitive prices, making it easy to find something that matches both your budget and personal taste. With many styles and designs to choose from, we make the shopping experience convenient and enjoyable. At OSF, we are committed to helping you create a beautiful and functional space with furniture that delivers lasting value.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="text-blue-600 mb-2">{stat.icon}</div>
                                    <div className="text-2xl font-bold text-black">{stat.value}+</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        {/* <button className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Learn More
                        </button> */}
                    </div>

                    <div className="relative">
                        <img
                            src={aboutus1}
                            alt="images"
                            className="rounded-lg shadow-md w-full h-[500px] object-cover transform hover:scale-[1.02] transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;