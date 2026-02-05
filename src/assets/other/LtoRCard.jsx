import { motion } from "framer-motion";
// import img from "../../../assets/think.png";
import RotateObj from "./RotateObj";

const LtoRCard = () => {
    return (
        <>
            <section className="md:h-[70vh] lg:h-[80vh] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 justify-center items-center p-6 mx-auto md:mt-40 lg:m-10">
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0.1 }}
                    transition={{ duration: 0.8 }}
                    className="h-full flex flex-col justify-center items-start p-4">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                        Few Things about our Dream
                    </h1>
                    <p className="text-white text-base sm:text-lg text-justify mt-4">
                        We are a web development company that specializes in creating custom websites for businesses of all sizes. We have a team of experienced developers who are passionate about helping businesses grow online. We offer a wide range of services, from website design and development to eCommerce and digital marketing. Contact us today to learn more about how we can help you take your business to the next level.
                    </p>
                </motion.div>


                <motion.div
                    // initial={{ opacity: 1, y: 0 }}
                    // animate={{ y: [0, 10, 0] }} // Floating effect
                    // transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="h-full flex overflow-hidden"
                >
                <RotateObj />
                    {/* <img src={img} alt="Dream Image" loading="lazy" className="w-full max-w-[350px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]" /> */}
                </motion.div>
            </section>
        </>
    );
};

export default LtoRCard;
