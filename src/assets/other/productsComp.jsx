import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import products from "../../../MOCK_DATA.json";



const ProductsComp = () => {

    const categories = [...new Set(products.map(product => product.category))].slice(0, 3);
    const initialVisible = 4;
    const [visible, setVisible] = useState(
        categories.reduce((acc, cat) => ({ ...acc, [cat]: initialVisible }), {})
    );

    const loadMore = (category, total) => { setVisible(prev => ({ ...prev, [category]: Math.min(prev[category] + 4, total) })); };

    const loadLess = (category) => { setVisible(prev => ({ ...prev, [category]: initialVisible })); };



    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
                {categories.map(category => {
                    const categoryProducts = products.filter(p => p.category === category);
                    const total = 8;

                    return (
                        <div key={category} className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex justify-between bg-gray-300 p-3 rounded-r-3xl">
                                <p>
                                    {category}
                                </p>
                                <p className='bg-gray-700 w-7 rounded-full py-1 px-1 hover:scale-105 delay-900'>
                                    <Link to={`/category/${category}`} className=" text-gray-100 mx-auto">
                                        <FaArrowRight className='text-center' />
                                    </Link>
                                </p>
                            </h2>

                            <div className="flex flex-wrap -m-4">
                                {categoryProducts.slice(0, visible[category]).map(product => (
                                    <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                        <Link to={`/product/${product.id}`}>
                                        <img alt={product.title} className="h-48 w-full object-cover rounded" src={product.image} />
                                        <h3 className="text-gray-500 text-xs mt-2">{product.category}</h3>
                                        <h2 className="text-gray-900 text-lg font-medium">{product.title}</h2>
                                        <p>{product.price}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {total > initialVisible && (
                                <button
                                    className="mt-4 w-full justify-center flex px-4 py-2"
                                    onClick={() =>
                                        visible[category] < total
                                            ? loadMore(category, total)
                                            : loadLess(category)
                                    }
                                >
                                    {visible[category] < total ? <IoIosArrowDropdownCircle size={30} className='hover:scale-105' /> : <IoIosArrowDropupCircle size={30} className='hover:scale-105' />}
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

