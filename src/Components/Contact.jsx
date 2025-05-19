import { useEffect, useState } from 'react';
import bgImage from '../assets/images/om.png';
import { FaWhatsapp, FaViber } from "react-icons/fa6";
import { FaPhone } from 'react-icons/fa';

const Contact = () => {
    const [detailData, setDetailData] = useState(null);

    const domain = window.API_BASE_URL;
    const detailAPI = `${domain}api/detail/all/`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(detailAPI);
                const data = await response.json();
                console.log("Fetched Detail Data:", data);
                setDetailData(Array.isArray(data) ? data[0] : data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [detailAPI]);0

    return (
        <>
            <section className="w-full h-[92vh] opacity-100 overflow-hidden absolute top-17">
                <div className="relative bg-grey-950">
                    <div className="rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full bg-white lg:ml-auto md:ml-auto m-auto absolute top-40 right-20 z-3">
                        <img src={bgImage} alt="Background" className="w-40 h-40 opacity-100 mb-4" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
                        {detailData ? (
                            <ul className="space-y-4 text-gray-700 text-lg">
                                <li className="flex items-center gap-3">
                                    <FaPhone className="text-gray-900 text-2xl" />
                                    <span>+977 {detailData.contact}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaWhatsapp className="text-green-500 text-2xl" />
                                    <span>+977 {detailData.whatsapp}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaViber className="text-purple-600 text-2xl" />
                                    <span>+977 {detailData.viber}</span>
                                </li>
                            </ul>
                        ) : (
                            <p>Loading contact details...</p>
                        )}
                    </div>

                    <div className="absolute bg-gray-950 w-full h-screen">
                        {detailData?.location ? (
                            <iframe
                                width="100%"
                                height="100%"
                                title="map"
                                loading="lazy"
                                src={detailData.location}
                            ></iframe>
                        ) : (
                            <p className="text-white text-center mt-10">Loading map...</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
