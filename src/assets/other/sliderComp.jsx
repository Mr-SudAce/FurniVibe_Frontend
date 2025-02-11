import Slider from "react-slick";
import slider from "../../../Slider.json"



// const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9];

const SliderComponent = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1200,
        arrows: false
    };

    return (
        <Slider {...settings} className="m-2">
            {slider.map((img, index) => (
                <div key={index} className="bg-gray-300 object-contain">
                        <img className="w-[100%] h-[90vh] m-auto p-2" src={img.image} alt={img.id} />
                </div>
            ))}
        </Slider>
    );
}

export default SliderComponent;