import { useEffect, useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { Link } from 'react-router-dom';

const ProductsComp = () => {
    const domain = window.API_BASE_URL;
    console.log('Domain', domain);

    const [shop, setShop] = useState([]);
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState({});

    const API_URL = `${domain}api/product/all/`;

    console.log("This is the data API URL:", API_URL);

    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch products");

                const data = await response.json();
                console.log("Response data:", data);
                setShop(data);

                // Extract unique category names from product_cat
                const uniqueCategories = [...new Set(data.map(product => product.product_cat.category_name))];
                setCategories(uniqueCategories);

                // Initialize visibility state
                const initialVisible = 4;
                const initialVisibility = uniqueCategories.reduce((acc, cat) => ({
                    ...acc,
                    [cat]: initialVisible
                }), {});
                setVisible(initialVisibility);
            } catch (error) {
                console.error('Error fetching Shop Data:', error);
            }
        };
        FetchData();
    }, [API_URL]);

    const loadMore = (category, total) => {
        setVisible(prev => ({ ...prev, [category]: Math.min(prev[category] + 4, total) }));
    };

    const loadLess = (category) => {
        setVisible(prev => ({ ...prev, [category]: 4 }));
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
                {categories.map(category => {
                    const categoryProducts = shop.filter(p => p.product_cat.category_name === category);
                    const total = categoryProducts.length;

                    return (
                        <div key={category} className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex justify-between bg-gray-300 p-3 rounded-r-3xl">
                                <p>{category}</p>
                                <p className="bg-gray-700 w-7 rounded-full py-1 px-1 hover:scale-105 delay-900">
                                    <Link to={`/category/${category}`} className="text-gray-100 mx-auto">
                                        <FaArrowRight className="text-center" />
                                    </Link>
                                </p>
                            </h2>

                            <div className="flex flex-wrap -m-4">
                                {categoryProducts.slice(0, visible[category]).map(product => (
                                    <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                        <Link to={`/product/${product.id}/ + ${product.product_name}`}>
                                            <img alt={product.product_name} className="h-48 w-full object-cover rounded" src={domain + product.product_image} />
                                            <h3 className="text-gray-500 text-xs mt-2">{product.product_cat.category_name}</h3>
                                            <h2 className="text-gray-900 text-lg font-medium">{product.product_name}</h2>
                                            <p className="text-gray-600">Rs.{product.product_price}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <div className="w-full mt-4 justify-center flex px-4 py-2">
                                {total > 4 && (
                                    <button onClick={() =>
                                        visible[category] < total
                                            ? loadMore(category, total)
                                            : loadLess(category)
                                    }>
                                        {visible[category] < total ? (
                                            <IoIosArrowDropdownCircle size={30} className="hover:scale-105" />
                                        ) : (
                                            <IoIosArrowDropupCircle size={30} className="hover:scale-105" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProductsComp;
