import { useParams } from "react-router-dom";
import products from "../../MOCK_DATA.json";


const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <h2 className="text-center text-red-500">Product not found!</h2>;
    }


    const truncatetext = (word, wordlimit) => {
        const words = word.split("");
        if (words.length > wordlimit) {
            return `${words.slice(0, wordlimit).join("")}...`;
        }
        return word;
    }
    return (
        <>
            <div className="mx-auto p-6 rounded-3xl bg-gradient-to-r from-gray-100 to-gray-300 shadow-2xl w-[140vh] h-[90vh]">
                <div className="flex gap-6">
                    <div className="w-1/2">
                        <img
                            src={product.image}
                            alt="Product"
                            className="rounded-2xl shadow-xl w-full object-cover h-72"
                        />
                        <div className="flex space-x-3 mt-4 justify-center">
                            {[1, 2, 3, 4].map((item, index) => (
                                <img
                                    key={index}
                                    src={product.image}
                                    alt={`Thumbnail ${index}`}
                                    className="w-24 h-20 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="w-1/2 pl-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">{product.title}</h2>
                            <p className="text-lg text-gray-600 mb-4">{product.category}</p>
                            <p className="text-gray-600 text-sm max-w-[25rem] mt-2 line-clamp-2">
                                {truncatetext(product.description, 60)}
                            </p>
                        </div>

                        <div className="mt-6">
                            <span className="text-2xl font-bold text-green-600">{product.price}</span>
                            <span className="line-through text-gray-500 ml-3">{product.discountPrice}</span>
                        </div>

                        <div className="flex space-x-4 mt-4">
                            <button className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors duration-300 shadow-lg">Buy Now</button>
                            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors duration-300 shadow-lg">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;