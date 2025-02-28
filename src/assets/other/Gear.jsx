import gear from '../gear.png';
import { motion } from "framer-motion";
const Gear = () => {
    return (
        <>
            <div className='absolute right-[10%] top-[38%] w-[50vh]'>
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 10,
                        ease: "linear",
                    }}
                >
                    <img src={gear} alt="" className='object-cover' />
                </motion.div>
            </div>


            <div className='absolute right-[9.5%] top-[6%] w-[35vh]'>
                <motion.div
                    animate={{
                        rotate: -360,
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 10,
                        ease: "linear",
                    }}
                >
                    <img src={gear} alt="" className='object-cover' />
                </motion.div>
            </div>


            <div className='absolute right-[33%] top-[60%] w-[30vh]'>
                <motion.div
                    animate={{
                        rotate: -360,
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 10,
                        ease: "linear",
                    }}
                >
                    <img src={gear} alt="" className='object-cover' />
                </motion.div>
            </div>



            <div className='absolute right-[46%] top-[75%] w-[20vh]'>
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 10,
                        ease: "linear",
                    }}
                >
                    <img src={gear} alt="" className='object-cover' />
                </motion.div>
            </div>

            <div className='absolute right-[6%] -top-[26%] w-[35vh]'>
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 10,
                        ease: "linear",
                    }}
                >
                    <img src={gear} alt="" className='object-cover' />
                </motion.div>
            </div>


            {/* <div className='absolute right-[2%] bottom-[10%] w-[25vh] bg-'>
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 10,
                        ease: "linear",
                    }}
                >
                    <img src={gear} alt="" className='object-cover bg-red-500 overflow-hidden' />
                </motion.div>
            </div> */}









        </>
    )
}

export default Gear