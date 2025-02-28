import { motion } from 'framer-motion';
import { FaReact, FaPython, FaNode, FaWordpress, FaJava, FaJs, FaPhp, FaDatabase } from 'react-icons/fa';
import { SiArduino, SiCisco, SiCodeigniter, SiLaravel } from 'react-icons/si';
import PC from "./PC";

const icons = [
    { component: FaReact, color: '#61DBFB' },
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
    { component: SiArduino, color: '#00979c' },
];

const RotateObj = () => {
    const baseRadius = 6 * 37.8;
    const radius = Math.min(window.innerWidth * 0.3, baseRadius);
    return (
        <>
            <div className="relative m-auto md:h-[50vh] lg:h-[20vh] " 
            // style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                <motion.div className="absolute " style={{ width: '100%', height: '100%' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                    {icons.map((icon, index) => {
                        const IconComponent = icon.component;
                        const angle = (index / icons.length) * 2 * Math.PI;
                        const x = radius * Math.cos(angle);
                        const y = radius * Math.sin(angle);

                        return (
                            <motion.div key={index} className="absolute" style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                            }}>
                                <IconComponent size={90} color={icon.color} />
                            </motion.div>
                        );
                    })}
                </motion.div>
                <motion.div className="absolute text-3xl sm:text-4xl md:text-5xl text-white" style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <PC />
                </motion.div>
            </div>
        </>
    );
};

export default RotateObj;
