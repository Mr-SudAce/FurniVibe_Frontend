import Slider from "react-slick";
import img1 from "../assets/images/eat.jpeg"
import img2 from "../assets/images/kiwi.jpeg"
import img3 from "../assets/images/swim.jpeg"
import img4 from "../assets/images/walk.jpeg"
import img5 from "../assets/images/write.jpeg"
import img6 from "../assets/images/puzzle.jpeg"
import img7 from "../assets/images/umbrella.jpeg"
import img8 from "../assets/images/van.jpeg"
import img9 from "../assets/images/log.jpeg"

const slider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,          // Enable auto-scrolling
        autoplaySpeed: 2000,     // Time between scrolls (in ms)
        arrows: false
    };
    return (
        <Slider {...settings} className="m-2">
            <div>
                <h3><img className="w-auto h-[85vh] m-auto" src={img1} alt="images" /></h3>
            </div>
            <div>
                <h3><img className="w-auto h-[85vh] m-auto" src={img2} alt="images" /></h3>
            </div>
            <div>
                <h3><img className="w-auto h-[85vh] m-auto" src={img3} alt="images" /></h3>
            </div>
            <div>
                <h3><img className="w-auto h-[85vh] m-auto" src={img4} alt="images" /></h3>
            </div>
            <div>
                <h3><img className="w-auto h-[85vh] m-auto" src={img5} alt="images" /></h3>
            </div>
            <div>
                <h3><img className="w-auto h-[85vh] m-auto" src={img6} alt="images" /></h3>
            </div>
            <div>
                <h3><img className="w-auto h-[85vh] m-auto" src={img7} alt="images" /></h3>
            </div>
            <div>
                <h3><img className="w-auto h-[85vh] m-auto" src={img8} alt="images" /></h3>
            </div>
            <div>
                <h3><img className="w-auto h-[85vh] m-auto" src={img9} alt="images" /></h3>
            </div>
        </Slider>
    );
}

export default slider;