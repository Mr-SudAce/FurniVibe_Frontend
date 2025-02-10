import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";


const products = [
    { id: 1, category: "CATEGORY1", title: "The Catalyzer", price: "$16.00", image: "https://picsum.photos/id/250/300/200" },
    { id: 2, category: "CATEGORY1", title: "Neptune", price: "$12.00", image: "https://picsum.photos/id/249/300/200" },
    { id: 3, category: "CATEGORY1", title: "Nova Blast", price: "$19.50", image: "https://picsum.photos/id/248/300/200" },
    { id: 4, category: "CATEGORY1", title: "Quantum Leap", price: "$14.75", image: "https://picsum.photos/id/247/300/200" },
    { id: 5, category: "CATEGORY1", title: "Dark Matter", price: "$22.10", image: "https://picsum.photos/id/244/300/200" },
    { id: 6, category: "CATEGORY1", title: "Shooting Stars", price: "$21.15", image: "https://picsum.photos/id/243/300/200" },
    { id: 7, category: "CATEGORY1", title: "The 400 Blows", price: "$18.40", image: "https://picsum.photos/id/242/300/200" },
    { id: 8, category: "CATEGORY1", title: "Cosmic Drift", price: "$25.99", image: "https://picsum.photos/id/241/300/200" },
    { id: 9, category: "CATEGORY2", title: "Galactic Pulse", price: "$32.00", image: "https://picsum.photos/id/240/300/200" },
    { id: 10, category: "CATEGORY2", title: "Neptune", price: "$12.00", image: "https://picsum.photos/id/239/300/200" },
    { id: 11, category: "CATEGORY2", title: "Lunar Light", price: "$27.75", image: "https://picsum.photos/id/238/300/200" },
    { id: 12, category: "CATEGORY2", title: "Venus Halo", price: "$18.50", image: "https://picsum.photos/id/237/300/200" },
    { id: 13, category: "CATEGORY2", title: "Mars Mirage", price: "$29.00", image: "https://picsum.photos/id/236/300/200" },
    { id: 14, category: "CATEGORY3", title: "Gravity Shift", price: "$29.99", image: "https://picsum.photos/id/235/300/200" },
    { id: 15, category: "CATEGORY3", title: "Crimson Dusk", price: "$22.45", image: "https://picsum.photos/id/234/300/200" },
    { id: 16, category: "CATEGORY3", title: "Aurora Waves", price: "$17.80", image: "https://picsum.photos/id/233/300/200" },
    { id: 17, category: "CATEGORY3", title: "Eclipse Edge", price: "$20.00", image: "https://picsum.photos/id/232/300/200" },
    { id: 18, category: "CATEGORY3", title: "Photon Pulse", price: "$15.99", image: "https://picsum.photos/id/231/300/200" }
];


const ProductsComp = () => {
    const categories = [...new Set(products.map(product => product.category))];
    const initialVisible = 4;
    const [visible, setVisible] = useState(
        categories.reduce((acc, cat) => ({ ...acc, [cat]: initialVisible }), {})
    );

    const loadMore = (category, total) => {
        setVisible(prev => ({ ...prev, [category]: Math.min(prev[category] + 4, total) }));
    };

    const loadLess = (category) => {
        setVisible(prev => ({ ...prev, [category]: initialVisible }));
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
                {categories.map(category => {
                    const categoryProducts = products.filter(p => p.category === category);
                    const total = categoryProducts.length;

                    return (
                        <div key={category} className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex justify-between">
                                <p>
                                    {category}
                                </p>
                                <p className='bg-gray-700 w-7 rounded-full py-1 px-1'>
                                    <Link to={`/category/${category}`} className=" text-gray-100 mx-auto">
                                        <FaArrowRight className='text-center'/>
                                    </Link>
                                </p>
                            </h2>

                            <div className="flex flex-wrap -m-4">
                                {categoryProducts.slice(0, visible[category]).map(product => (
                                    <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                        <img alt={product.title} className="h-48 w-full object-cover rounded" src={product.image} />
                                        <h3 className="text-gray-500 text-xs mt-2">{product.category}</h3>
                                        <h2 className="text-gray-900 text-lg font-medium">{product.title}</h2>
                                        <p>{product.price}</p>
                                    </div>
                                ))}
                            </div>

                            {total > initialVisible && (
                                <button
                                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600"
                                    onClick={() =>
                                        visible[category] < total
                                            ? loadMore(category, total)
                                            : loadLess(category)
                                    }
                                >
                                    {visible[category] < total ? "Load More" : "Load Less"}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProductsComp;

