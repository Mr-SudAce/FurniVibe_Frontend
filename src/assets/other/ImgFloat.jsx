import { motion } from "framer-motion";
import lighthouse from "../../../assets/pic1.jpg";
import springgrass from "../../../assets/pic2.jpg";
import coffee from "../../../assets/pic3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Slideimg = [coffee, springgrass, lighthouse];

const ImgFloat = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        speed: 500
    };

    return (
        <>
            {/* Floating Images for Larger Screens */}
            <motion.div className="hidden md:block lg:block relative h-screen">
                <motion.img
                    src={springgrass}
                    alt="Floating Decor 1"
                    className="absolute w-[40vh] h-[40vh] top-[10vh] left-[15vh] sm:w-[30vh] sm:h-[30vh] md:w-[30vh] md:h-[30vh] lg:w-[50vh] lg:h-[50vh] lg:top-[10vh] lg:left-[25vh]"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                    src={lighthouse}
                    alt="Floating Decor 2"
                    className="absolute w-[40vh] h-[40vh] top-[30vh] left-[25vh] sm:w-[30vh] sm:h-[30vh] md:w-[30vh] md:h-[30vh] lg:w-[50vh] lg:h-[50vh] lg:top-[30vh] lg:left-[50vh]"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                    src={coffee}
                    alt="Floating Decor 3"
                    className="absolute w-[40vh] h-[40vh] top-[45vh] left-[5vh] sm:w-[30vh] sm:h-[30vh] md:w-[30vh] md:h-[30vh] lg:w-[50vh] lg:h-[50vh] lg:top-[45vh] lg:left-[10vh]"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Slider for Smaller Screens */}
            <motion.div className="lg:hidden md:hidden block w-full">
                <Slider {...settings}>
                    {Slideimg.map((slide, index) => (
                        <div key={index} className="flex justify-center">
                            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-[50vh] object-cover mx-auto" />
                        </div>
                    ))}
                </Slider>
            </motion.div>
        </>
    );
};

export default ImgFloat;
