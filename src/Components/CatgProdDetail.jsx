import { useParams } from "react-router-dom";

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

const CatgProdDetail = () => {
    const { category } = useParams();  // Get category from URL

    const filteredProducts = products.filter(
        (product) => product.category === category
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-6">{category} Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="border rounded-lg shadow-md p-4">
                            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
                            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                            <p className="text-gray-600">{product.price}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3">No products found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default CatgProdDetail;
