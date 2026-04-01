import { Link } from "react-router-dom";
import SlotCounter from "react-slot-counter";
import { CiShoppingCart } from "react-icons/ci";
import * as Index from "../index.jsx";

const HeroSkeleton = () => (
  <div className="flex items-center justify-center relative w-full min-h-screen bg-gray-100 px-4 md:px-8 lg:px-16 animate-pulse">
    <div className="container mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="h-16 bg-gray-300 rounded-lg w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-14 bg-gray-400 rounded-full w-40"></div>
      </div>
    </div>
  </div>
);

const Heropage = () => {
  const domain = window.API_BASE_URL;
  if (!domain) return <HeroSkeleton />;

  return (
    <>
      <section className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{
            backgroundImage: `url("https://static2.narpon.es/assets/images/parquets/2.jpg")`,
          }}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10" />

        <div className="relative z-20 container mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="space-y-8 text-center md:text-left">
            {/* Main Headline */}
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-orange-500/90 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-sm mb-4">
                Premium Collection 2026
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight">
                Modernized <br />
                <span className="font-serif italic text-orange-200">
                  Furniture
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-gray-100 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              Elevate your sanctuary with pieces that blend{" "}
              <strong>minimalist aesthetics</strong> with maximum comfort.
            </p>

            {/* Call to Action - Animated without Hover */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link
                to="/shop"
                className="group relative flex items-center gap-3 bg-white text-gray-900 font-bold px-10 py-5 rounded-full shadow-2xl"
              >
                EXPLORE SHOP
                <CiShoppingCart className="text-2xl" />
              </Link>

              <div className="hidden lg:block h-12 w-[1px] bg-white/40"></div>

              {/* Counters */}
              <div className="flex space-x-10">
                <div className="text-white">
                  <div className="text-3xl font-light flex items-center gap-1">
                    <SlotCounter value={15} />
                    <span>+</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-300">
                    Concepts
                  </p>
                </div>
                <div className="text-white">
                  <div className="text-3xl font-light flex items-center gap-1">
                    <SlotCounter value={24} />
                    <span>/</span>
                    <span className="text-sm self-end pb-1 text-orange-300">
                      7
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-300">
                    Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-25 right-15 z-30 flex gap-4 backdrop-blur-lg bg-white/10 rounded-[15px] p-3 text-white">
          <Index.SocialBar />
        </div>
      </section>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>

      <Index.Shop />
    </>
  );
};

export default Heropage;
