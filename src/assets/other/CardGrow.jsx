import { motion } from 'framer-motion';
import blockchain from "../../../assets/blockchain.jpg"
import cisco from "../../../assets/cisco.jpeg"
import CTEVT from "../../../assets/CTEVT.jpg"
import Enterprises from "../../../assets/Enterprises.jpg"
import webdesign from "../../../assets/web-design.jpeg"
import webdevelopment from "../../../assets/web-development.jpeg"

const cardsData = [
    {
        title: 'Card 1',
        details: 'Blockchain',
        description: 'Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system.',
        imageUrl: blockchain,
    },
    {
        title: 'Card 2',
        details: 'CISCO',
        description: 'CISCO is a worldwide leader in IT, networking, and cybersecurity solutions.',
        imageUrl: cisco,
    },
    {
        title: 'Card 3',
        details: 'CTEVT',
        description: 'CTEVT is the most popular technical education board in Nepal. It provides various technical education programs in Nepal.',
        imageUrl: CTEVT,
    },
    {
        title: 'Card 4',
        details: 'Enterprise',
        description: 'Enterprise is a term that encompasses all the various activities that are required to run a business.',
        imageUrl: Enterprises,
    },
    {
        title: 'Card 5',
        details: 'Web Designs',
        description: 'Web Designs is a broad term that includes everything from the production of goods and services to their distribution and sale.',
        imageUrl: webdesign,
    },
    {
        title: 'Card 6',
        details: 'Web Developement',
        description: 'Web Developement refers to the process of creating, building, and maintaining websites and web applications that run on the internet.',
        imageUrl: webdevelopment,
    },
];

const CardGrow = () => {
    return (
        <>
            <motion.div className="py-10">
                {/* Heading */}
                <motion.h1
                    className="text-3xl font-bold uppercase text-center mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    What we Do
                </motion.h1>

                {/* Cards Wrapper */}
                <div className="flex flex-wrap justify-center gap-8">
                    {cardsData.map((card, index) => (
                        <motion.div
                            key={index}
                            className="relative w-48 h-48 md:w-56 lg:w-64"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Card */}
                            <div className="relative overflow-hidden shadow-lg rounded-2xl group">
                                {/* Image Section */}
                                <motion.img
                                    src={card.imageUrl}
                                    alt={card.title}
                                    className="w-full h-52 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Content Section */}
                                <motion.div
                                    className="absolute inset-0 bg-white p-2 m-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl shadow-lg"
                                >
                                    <h2 className="text-xl font-bold">{card.title}</h2>
                                    <p className="text-gray-950 items-center flex justify-center m-0 flex-col p-0"> <span className='font-bold uppercase'>{card.details}</span> <br /> {card.description}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>





        </>

    );
};

export default CardGrow;