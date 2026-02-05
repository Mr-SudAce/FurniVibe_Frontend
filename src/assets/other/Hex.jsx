import React from 'react';
import { HexGrid, Layout, Hexagon, Pattern } from 'react-hexgrid';

const Hex = () => {
    const hexData = [
        { position: [-2, -1, 3], image: '../../../src/assets/pictures/img1.jpg' },
        { position: [-2, 0, 2], image: '../../../src/assets/pictures/img2.jpg' },
        { position: [-2, 1, 1], image: '../../../src/assets/pictures/img3.jpg' },
        { position: [-2, 2, 0], image: '../../../src/assets/pictures/img4.jpg' },
        { position: [-1, -2, 3], image: '../../../src/assets/pictures/img5.jpg' },
        { position: [-1, -1, -1], image: '../../../src/assets/pictures/img6.jpg' },
        { position: [-1, -1, 2], image: '../../../src/assets/pictures/img7.jpg' },
        { position: [-1, 0, 1], image: '../../../src/assets/pictures/img8.jpg' },
        { position: [-1, 1, 0], image: '../../../src/assets/pictures/img9.jpg' },
        { position: [0, -2, 2], image: '../../../src/assets/pictures/img10.jpg' },
        { position: [0, -1, 1], image: '../../../src/assets/pictures/img11.jpg' },
        { position: [0, 0, 0], image: '../../../src/assets/pictures/img12.jpg' },
        { position: [0, 1, -1], image: '../../../src/assets/pictures/img13.jpg' },
        { position: [0, 2, -2], image: '../../../src/assets/pictures/img14.jpg' },
        { position: [2, -3, 1], image: '../../../src/assets/pictures/img15.jpg' },
        { position: [3, -4, 1], image: '../../../src/assets/pictures/img16.jpg' },
        { position: [1, -3, 2], image: '../../../src/assets/pictures/img17.jpg' },
        { position: [1, -2, 1], image: '../../../src/assets/pictures/img18.jpg' },
        { position: [1, -1, 0], image: '../../../src/assets/pictures/img19.jpg' },
        { position: [1, 0, -1], image: '../../../src/assets/pictures/img20.jpg' },
        { position: [1, 1, -2], image: '../../../src/assets/pictures/img21.jpg' }
    ];

    return (
        <HexGrid className="max-w-full h-auto" viewBox='-40 -45 100 100'>
            <Layout size={{ x: 10, y: 10 }} flat spacing={1.02} origin={{ x: 0, y: 0 }}>
                {hexData.map((data, index) => (
                    <React.Fragment key={index}>
                        <Hexagon
                            q={data.position[0]}
                            s={data.position[1]}
                            r={data.position[2]}
                            fill={`pat-${index + 1}`}
                            className="hover:scale-110 transition-transform duration-300 cursor-pointer" />
                        <Pattern id={`pat-${index + 1}`} link={data.image}>
                            <img src={data.image} alt={`Hex ${index + 1}`} loading="lazy" className="rounded-md shadow-lg" />
                        </Pattern>
                    </React.Fragment>
                ))}
            </Layout>
        </HexGrid>
    );
};

export default Hex;
