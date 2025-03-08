import logo from "../../assets/images/om.png";

const Loader = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center backdrop-blur-sm">
            <div className="relative flex flex-col items-center justify-center">
                {/* Logo */}
                <img src={logo} alt="Logo" className="animate-bounce duration-[200ms] h-20 w-20 z-10" />

                {/* Animated Circles */}
                <div className="absolute w-[80px] h-[80px] rounded-full bg-red-400 animate-ping opacity-50"></div>
                <div className="absolute w-[100px] h-[100px] rounded-full bg-red-500 animate-ping opacity-50 delay-100"></div>
                <div className="absolute w-[120px] h-[120px] rounded-full bg-red-600 animate-ping opacity-40 delay-200"></div>
                <div className="absolute w-[140px] h-[140px] rounded-full bg-red-700 animate-ping opacity-30 delay-300"></div>
                <div className="absolute w-[160px] h-[160px] rounded-full bg-red-800 animate-ping opacity-20 delay-400"></div>
                <div className="absolute w-[180px] h-[180px] rounded-full bg-red-900 animate-ping opacity-10 delay-500"></div>
            </div>
        </div>
    );
}

export default Loader;
