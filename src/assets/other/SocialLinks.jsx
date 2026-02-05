import { FaInstagram, FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa';

const SocialLinks = () => {
    return (
        <>
            <section className='absolute z-9'>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <button className="w-[90px] h-[90px] bg-white rounded-[90px_5px_5px_5px] shadow-md transition duration-200 ease-in-out hover:scale-110 hover:bg-[#cc39a4]">
                            <FaInstagram size={30} className="mt-6 ml-5 text-[#cc39a4] hover:text-white" />
                        </button>
                        <button className="w-[90px] h-[90px] bg-white rounded-[5px_90px_5px_5px] shadow-md transition duration-200 ease-in-out hover:scale-110 hover:bg-[#03A9F4]">
                            <FaTwitter size={30} className="mt-6 ml-3 text-[#03A9F4] hover:text-white" />
                        </button>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button className="w-[90px] h-[90px] bg-white rounded-[5px_5px_5px_90px] shadow-md transition duration-200 ease-in-out hover:scale-110 hover:bg-black">
                            <FaGithub size={30} className="mt-4 ml-5 text-black hover:text-white" />
                        </button>
                        <button className="w-[90px] h-[90px] bg-white rounded-[5px_5px_90px_5px] shadow-md transition duration-200 ease-in-out hover:scale-110 hover:bg-[#8c9eff]">
                            <FaDiscord size={30} className="mt-3 ml-3 text-[#8c9eff] hover:text-white" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SocialLinks;