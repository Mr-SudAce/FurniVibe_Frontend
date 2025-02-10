import Slider from "react-slick";
import Img1 from "../images/eat.jpeg";
import Img2 from "../images/kiwi.jpeg";
import Img3 from "../images/swim.jpeg";
import Img4 from "../images/walk.jpeg";
import Img5 from "../images/write.jpeg";
import Img6 from "../images/puzzle.jpeg";
import Img7 from "../images/umbrella.jpeg";
import Img8 from "../images/van.jpeg";
import Img9 from "../images/log.jpeg";

const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9];

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
            {images.map((img, index) => (
                <div key={index} className="bg-gray-300">
                    <h3>
                        <img className="w-[100%] h-[90vh] m-auto p-2" src={img} alt={`slide-${index + 1}`} />
                    </h3>
                </div>
            ))}
        </Slider>
    );
}

export default SliderComponent;