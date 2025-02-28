import { motion } from 'framer-motion';
import { FaReact, FaAngular, FaVuejs, FaPython, FaNode, FaWordpress, FaJava, FaJs, FaPhp, FaDatabase, } from 'react-icons/fa';
import { SiCisco, SiCodeigniter, SiLaravel } from "react-icons/si";
import PC from './PC';
const icons = [
    { component: FaReact, color: '#61DBFB' },
    { component: FaAngular, color: '#DD0031' },
    { component: FaVuejs, color: '#42b883' },
    { component: FaPython, color: '#306998' },
    { component: FaNode, color: '#68A063' },
    { component: FaWordpress, color: '#21759b' },
    { component: FaJava, color: '#007396' },
    { component: FaJs, color: '#f7df1e' },
    { component: FaPhp, color: '#8892be' },
    { component: SiCisco, color: '#61DBFB' },
    { component: SiCodeigniter, color: '#ff5226' },
    { component: SiLaravel, color: '#ff5226' },

    { component: FaDatabase, color: '#4DB33D' },
];

const CourseCard = () => {
    return (
        <>
            <div className="relative w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
                {/* Center Monitor Image */}
                <div className="relative ">
                    <div className="rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        <div className='w-full h-full'>
                        <PC/>

                        </div>
                    </div>
                </div>

                {/* Floating Icons */}
                {icons.map((icon, index) => {
                    const IconComponent = icon.component;
                    const angle = (index / icons.length) * 2 * Math.PI;
                    const x = 350 * Math.cos(angle);
                    const y = 350 * Math.sin(angle);
                    const duration = Math.random() * 3 + 3; // Random duration between 2s and 6s

                    return (
                        <motion.div
                            key={index}
                            className="absolute"
                            style={{
                                top: '50%',
                                left: '50%',
                                translate: '-50% -50%',
                            }}
                            initial={{ x: x, y: y, opacity: 1 }}
                            animate={{
                                x: [x, x + 20, x],
                                y: [y, y + 20, y],
                                opacity: 0.9,
                            }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <IconComponent size={90} color={icon.color} transition={10} />
                        </motion.div>
                    );
                })}
            </div>

        </>
    )
}

export default CourseCard



