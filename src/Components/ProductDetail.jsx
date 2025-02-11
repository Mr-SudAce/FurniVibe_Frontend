import { useParams } from "react-router-dom";
import products from "../../MOCK_DATA.json";
// import { CiHeart } from "react-icons/ci";

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
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto flex flex-col lg:flex-row">
                    <div className="mx-auto flex flex-col gap-4 lg:w-1/2">
                        <img
                            alt="ecommerce"
                            className="lg:w-full w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={product.image}
                        />
                        <div className="flex space-x-5 justify-between">
                            {[product.image1, product.image2, product.image3, product.image4].map(
                                (image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index}`}
                                        className="w-40 h-30 rounded-lg cursor-pointer hover:scale-102 transition-transform duration-300 shadow-md"
                                    />
                                )
                            )}
                        </div>
                    </div>

                    <div className="lg:w-1/2 mx-auto flex flex-col lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>

                        {/* <div className="flex mb-4">
                            <span className="flex items-center">
                                {[...Array(4)].map((_, index) => (
                                    <svg
                                        key={index}
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-4 h-4 text-orange-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                ))}
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-4 h-4 text-orange-500"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span className="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                        </div> */}
                        <p className="leading-relaxed line-clamp-5 h-[140px]">{truncatetext(product.description, 425)}</p>
                        <div className="flex items-center justify-between">
                            <span className="title-font font-medium text-2xl text-gray-900">Rs.{product.price}</span>
                            <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                                Add To Cart
                            </button>
                            {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4">
                                <CiHeart className="hover:text-red-600" size={30}/>
                            </button> */}
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default ProductDetail;
