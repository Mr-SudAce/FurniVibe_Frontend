import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import furnitureData from "../../furnitureData.json"; // Assuming this contains all products



const ProductDetail = () => {
    const { name } = useParams(); // Get product ID from URL
    const furniproduct = furnitureData.find(item => item.name === (name));
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedColor, setSelectedColor] = useState(furniproduct.colors?.[0] || "Natural");
    const [selectedSize, setSelectedSize] = useState(furniproduct.sizes?.[0] || "Large");
    useEffect(() => {
        if (furniproduct) {
            setSelectedImage(0);
            setSelectedColor(furniproduct.colors?.[0] || "Natural");
            setSelectedSize(furniproduct.sizes?.[0] || "Large");

            // Ensure images is always an array
            if (!Array.isArray(furniproduct.images)) {
                furniproduct.images = [];
            }
        }
    }, [furniproduct]);

    if (!furniproduct) {
        return <div className="text-center py-8">Product not found</div>;
    }



    const images = [
        furniproduct.images,
        furniproduct.image1,
        furniproduct.image2,
        furniproduct.image3,
        furniproduct.image4,
        furniproduct.image5,
        furniproduct.image6
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm mb-8">
                <ol className="flex items-center space-x-2">
                    <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
                    <li className="text-gray-500">/</li>
                    <li><Link to={`/category/${furniproduct.category}`} className="text-gray-500 hover:text-gray-700">{furniproduct.category}</Link></li>
                    <li className="text-gray-500">/</li>
                    <li className="text-gray-900">{furniproduct.name}</li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <motion.div className="space-y-4">
                    <motion.div
                        className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.img
                            src={images[selectedImage]}
                            alt={furniproduct.name}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.div>

                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <motion.button
                                key={index}
                                className={`aspect-square rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedImage(index)}
                            >
                                <img src={img} alt={`${furniproduct.name} view ${index + 1}`} className="w-full h-full object-cover" title={`${furniproduct.name}`} />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Product Details */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{furniproduct.name}</h1>
                            <div className="flex items-center mt-2 space-x-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={index < Math.floor(furniproduct.rating) ? "text-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600">{furniproduct.reviews} reviews</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            {isFavorite ? <FaHeart className="w-6 h-6 text-red-500" /> : <FaRegHeart className="w-6 h-6 text-gray-400" />}
                        </button>
                    </div>

                    <p className="text-gray-600">{furniproduct.description}</p>

                    {/* Price */}
                    <div className="flex items-baseline space-x-3">
                        <span className="text-3xl font-bold text-gray-900">${furniproduct.discountedPrice}</span>
                        <span className="text-xl text-gray-500 line-through">${furniproduct.price}</span>
                        <span className="text-green-500 font-semibold">Save ${(furniproduct.price - furniproduct.discountedPrice).toFixed(2)}</span>
                    </div>

                    {/* Color Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                        <div className="flex space-x-3">
                            {furniproduct.colors?.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 rounded-md ${selectedColor === color ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                        <div className="flex space-x-3">
                            {furniproduct.sizes?.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-md ${selectedSize === size ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-8 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
                    >
                        <FaShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                    </motion.button>

                    {/* Specifications */}
                    <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {Object.entries(furniproduct.specifications || {}).map(([key, value]) => (
                                <div key={key} className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
