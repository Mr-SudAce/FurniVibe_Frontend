import bgImage from '../assets/images/om.png';
import { FaWhatsapp, FaViber } from "react-icons/fa6";
const Contact = () => {
    return (
        <>
            {/* <h1 className="text-2xl bg-red-600">Contact</h1> */}
            <section className="w-full h-[92vh] opacity-100 overflow-hidden relative">
                <div className="relative bg-grey-950">
                    <div className="rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full bg-white lg:ml-auto md:ml-auto m-auto absolute top-40 right-20 z-9">
                        <img src={bgImage} alt="Background" className="w-40 h-40 opacity-100 mb-4" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
                        <ul className="space-y-4 text-gray-700 text-lg">
                            <li className="flex items-center gap-3">
                                <FaWhatsapp className="text-green-500 text-2xl" />
                                <span>+977 987-643210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaViber className="text-purple-600 text-2xl" />
                                <span>+977 987-643210</span>
                            </li>
                        </ul>
                    </div>
                    <div className='absolute top-0 bg-gray-950 w-full'>
                        <iframe className='h-[100vh]'
                            width="100%"
                            height="100%"
                            title="map"
                            loading="lazy"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861449.4450566736!2d81.48373222852634!3d28.376724721110214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995e8c77d2e68cf%3A0x34a29abcd0cc86de!2sNepal!5e1!3m2!1sen!2snp!4v1738930085931!5m2!1sen!2snp"
                        ></iframe>
                    </div>
                </div>

            </section>

        </>
    );
};

export default Contact;
