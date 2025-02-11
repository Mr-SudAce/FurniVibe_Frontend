import aboutus1 from "../assets/images/aboutus.jpg"
const AboutUs = () => {
    return (
        <>
            <section className="bg-cover bg-center">
                <div className="bg-opacity-60 h-72 flex items-center justify-center">
                    <h2 className="text-8xl font-extrabold text-gray-950 absolute ">About Us</h2>
                </div>
            </section>

            <section className="p-5 bg-gray-300">
                <div className="grid md:grid-cols-2 gap-10 items-center relative">
                    <div>
                        <p className="text-gray-950 leading-relaxed text-justify mx-20">
                            <h3 className="text-4xl font-bold">What we do</h3>
                            At OSF, we take pride in offering high-quality, durable furniture that blends style, functionality, and affordability. Our collection includes a wide range of pieces designed to enhance homes, offices, and other spaces, ensuring comfort and elegance. We focus on craftsmanship and attention to detail, using quality materials to create furniture that not only looks great but also stands the test of time. Whether you’re looking for a classic design or something modern and trendy, our diverse selection ensures you’ll find the perfect fit for your needs.

                            We understand that furniture is a long-term investment, which is why we prioritize durability and affordability. Our goal is to provide customers with stylish yet sturdy furniture at competitive prices, making it easy to find something that matches both your budget and personal taste. With many styles and designs to choose from, we make the shopping experience convenient and enjoyable. At OSF, we are committed to helping you create a beautiful and functional space with furniture that delivers lasting value.
                        </p>
                    </div>
                    <div>
                        <img src={aboutus1} alt="Team Image" className="rounded-xl shadow-lg" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUs;