import { motion } from "framer-motion";
import img from "../../../assets/coffee.jpeg";
const RtoLCard = () => {
    return (
        <>
            <section className="max-h-screen grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-around items-center p-10 mx-15 gap-10 overflow-hidden ">
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ y: [0, -10, 0] }} // Floating effect
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="h-full grid justify-center items-center z-9">
                    <img src={img} alt="" loading="lazy" />
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0.1 }}
                    transition={{ duration: 0.8 }}
                    className="h-full grid justify-center items-center">
                    <h1 className="text-white text-3xl font-bold ">Few Things about our Dream</h1>
                    <p className="text-white text-lg text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae placerat neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae placerat neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae placerat neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae placerat neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae placerat neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae placerat neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae placerat neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae placerat neque.</p>
                </motion.div>
            </section>
        </>
    )

}

export default RtoLCard;