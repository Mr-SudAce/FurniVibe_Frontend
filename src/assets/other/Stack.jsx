const block = Array.from({ length: 29 }, (_, i) => ({
    Heading: `Heading ${i + 1}`,
    Description: `Description ${i + 1}`,
}));

const Stack = () => {
    return (
        <section className="flex flex-col md:flex-row h-screen px-4 gap-6 py-6 bg-gray-900 text-white">
            {/* Left Section */}
            <div className="flex-1 bg-amber-400 rounded-2xl shadow-lg flex flex-col p-5 max-h-[85vh] overflow-y-auto no_scrollbar">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Section 1</h2>
                {block.slice(0, 10).map((item, index) => (
                    <div key={index} className="bg-green-500 w-full p-4 rounded-lg shadow-md mb-3 hover:scale-105 transition transform">
                        <h1 className="text-lg font-bold">{item.Heading}</h1>
                        <p className="text-sm">{item.Description}</p>
                    </div>
                ))}
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-red-500 rounded-2xl shadow-lg flex flex-col p-5 max-h-[85vh] overflow-y-auto no_scrollbar">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4 ">Section 2</h2>
                {block.slice(10, 20).map((item, index) => (
                    <div key={index} className="bg-green-500 w-full p-4 rounded-lg shadow-md mb-3 hover:scale-105 transition transform">
                        <h1 className="text-lg font-bold">{item.Heading}</h1>
                        <p className="text-sm">{item.Description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stack;
