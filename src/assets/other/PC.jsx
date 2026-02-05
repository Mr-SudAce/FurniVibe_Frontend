import teacher from "../../../assets/teacher.png"
const PC = () => {
    return (
        <>
            <section className="h-screen flex flex-col justify-center items-center relative p-4">
                {/* Monitor */}
                <div className="border-[2vh] border-gray-800 bg-gray-500 w-[80vw] max-w-[50vh] h-[45vw] max-h-[35vh] md:h-[20vh] md:w-[30vh] rounded-lg relative shadow-xl overflow-hidden">
                    {/* Close, Minimize, Maximize Buttons */}
                    <div className="absolute top-3 right-3 flex gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                    </div>
                    {/* Screen Image */}
                    <img src={teacher} alt="Monitor Display" className="w-full h-full object-cover" />
                </div>

                {/* Stand */}
                <div className="w-[6vw] max-w-[5vh] h-[8vw] max-h-[6vh] bg-gray-700"></div>

                {/* Base */}
                <div className="w-[25vw] max-w-[20vh] h-[2vw] max-h-[2vh] bg-gray-800 rounded-b-md"></div>
            </section>


        </>
    )
}

export default PC;