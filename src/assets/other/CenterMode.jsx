import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import spss from '../../../assets/SPSS.png';
import redhat from '../../../assets/redhat.png';
import arcgis from '../../../assets/arc_gis.jpeg';
import aurduino from '../../../assets/aurduino.png';
import autocad_civil from '../../../assets/autocad_civil.png';
import autocad_elec from '../../../assets/autocad_elec.png';
import awscloud from '../../../assets/awscloud.png';
import awssolution from '../../../assets/awssolutionarchitect.png';
import basiccomp from '../../../assets/basiccompcourse.png';
import basichardwaresoftware from '../../../assets/basic_hardwaresoftware.png';
import deeplearning from '../../../assets/deeplearning.jpeg';
import django from '../../../assets/django.png';
import hcj from '../../../assets/HCJ.jpg';
import seomarketing from '../../../assets/seomarketing.png';
import windowsserver from '../../../assets/windows_server.png';
import php from '../../../assets/PHP.jpg';

function CenterMode() {
    const [activeIndex, setActiveIndex] = useState(0);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        speed: 500,
        beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
    };

    const images = [
        { img: spss },
        { img: redhat },
        { img: arcgis },
        { img: aurduino },
        { img: autocad_civil },
        { img: awssolution },
        { img: basiccomp },
        { img: basichardwaresoftware },
        { img: awscloud },
        { img: deeplearning },
        { img: django },
        { img: hcj },
        { img: autocad_elec },
        { img: seomarketing },
        { img: windowsserver },
        { img: php },
    ];

    return (
        <div className=" w-full h-96 px-20">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`w-full  lg:h-96 md:h-full flex justify-center items-center transition-transform duration-500 ${index === activeIndex ? "h-96 scale-100 opacity-100 " : "h-40 scale-90 opacity-20"}`}
                    >
                        <img
                            src={image.img}
                            alt={`Slide ${index}`}
                            className={`w-full h-80 object-contain rounded-lg transition-transform duration-500 ${index === activeIndex ? "scale-110 opacity-100" : "scale-90 opacity-50"
                                }`}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CenterMode;
