import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import arushilogo from "../../../assets/arushi-logo.png";
import balbikaslogo from "../../../assets/balbikas.webp";
import educatorslogo from "../../../assets/educators-logo.jpg";
import forbeslogo from "../../../assets/forbes-college-logo.webp";
import gurukullogo from "../../../assets/gurukul-logo.png";
import khabartarangalogo from "../../../assets/khabar-taranga-logo.jpg";
import kumultimedialogo from "../../../assets/ku-multimedia-logo.jpg";
import sahidsmirtilogo from "../../../assets/sahid-smriti-multiple-campus-logo.jpg";
import simpanilogo from "../../../assets/simpani-logo.png";

const FlipCards = () => {
    const cards = [
        { front: arushilogo, back: arushilogo, link: "https://aarushikhabar.com/" },
        { front: balbikaslogo, back: balbikaslogo, link: "https://balbikas.edu.np/" },
        { front: forbeslogo, back: forbeslogo, link: "https://www.forbescollege.edu.np/" },
        { front: gurukullogo, back: gurukullogo, link: "#" },
        { front: khabartarangalogo, back: khabartarangalogo, link: "#" },
        { front: kumultimedialogo, back: kumultimedialogo, link: "#" },
        { front: simpanilogo, back: simpanilogo, link: "#" },
        { front: sahidsmirtilogo, back: sahidsmirtilogo, link: "https://ssmcchitwan.edu.np/" },
        { front: educatorslogo, back: educatorslogo, link: "#" },
    ];

    return (
        <>
            <section className="flex flex-col items-center justify-center p-8 gap-10 relative">
                {/* Title Section (Centered) */}
                <div className="w-full text-center">
                    <motion.h1 className="text-4xl uppercase text-white font-bold underline">
                        Works
                    </motion.h1>
                </div>

                {/* Card Grid (Centered) */}
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="relative h-[30vh] w-[30vh] perspective-1000"
                        >
                            <motion.div
                                className="relative w-full h-full"
                                style={{ transformStyle: "preserve-3d" }}
                                whileHover={{ rotateY: 180 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {/* Front Side */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center bg-white rounded-lg shadow-lg"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <img src={card.front} alt="Front" className="w-full object-contain p-2" />
                                </motion.div>

                                {/* Back Side */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center bg-white rounded-lg shadow-lg"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                    }}
                                >
                                    <Link to={card.link} className="w-full h-full flex items-center justify-center">
                                        <img src={card.back} alt="Back" className="w-full object-contain p-2" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default FlipCards;
