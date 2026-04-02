import { useEffect, useState } from "react";
import { FaWhatsapp, FaViber, FaArrowRight } from "react-icons/fa";
import * as Index from "../index";

const Contact = () => {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const domain = window.API_BASE_URL;
  const detailAPI = `${domain}api/other-details/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(detailAPI, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setDetailData(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [detailAPI]);

  const size = 30;
  return (
    <section className="w-full mx-auto min-h-screen text-slate-900 font-sans antialiased">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[var(--primary-color)]"></span>
              <span className="text-xs font-bold tracking-[0.3em] text-[var(--primary-color)] uppercase">
                Available for Projects
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-slate-900">
              Let&apos;s{" "}
              <span className="font-serif text-[var(--primary-color)]">
                Talk.
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-md leading-relaxed">
              Whether you&apos;re looking for custom furniture or a complete
              interior overhaul, our team in Nepal is ready to assist.
            </p>
          </header>

          <div className="hidden lg:block pt-10">
            <div className="text-xs uppercase tracking-widest text-slate-400 mb-4">
              Follow Our Journey
            </div>
            <div className="flex gap-4 items-center">
              <Index.SocialBar />
            </div>
          </div>
        </div>
        <div className="w-full">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-24 bg-slate-100 rounded-3xl" />
              <div className="h-24 bg-slate-100 rounded-3xl" />
            </div>
          ) : (
            <div className="grid gap-4">
              <a
                href={`tel:+977${detailData?.contact || ""}`}
                className="group relative overflow-hidden bg-slate-900 p-8 rounded-[2rem] text-white transition-all duration-500 hover:border-[var(--primary-color)] border-2"
              >
                <div className="relative z-10 flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-slate-400 text-sm font-medium">
                      Customer Support
                    </p>
                    <p className="text-2xl md:text-3xl font-light tracking-tight">
                      +977 {detailData?.contact}
                    </p>
                  </div>
                  <div className="bg-[var(--primary-color)] p-4 rounded-full group-hover:rotate-[-45deg] transition-transform duration-500">
                    <FaArrowRight className="text-white" />
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[var(--primary-color)]/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
              </a>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/977${detailData?.whatsapp || ""}`}
                  className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <FaWhatsapp size={size} />
                    </div>
                    <span className="font-semibold text-slate-700">
                      WhatsApp
                    </span>
                  </div>
                  <FaArrowRight className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </a>

                <a
                  href={`viber://chat?number=977${detailData?.viber || ""}`}
                  className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <FaViber size={size} />
                    </div>
                    <span className="font-semibold text-slate-700">Viber</span>
                  </div>
                  <FaArrowRight className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </a>
              </div>
              <div className="mt-4 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group hover:border-[var(--primary-color)]">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10" />
                <div
                  className="w-full h-80  transition-all duration-1000 group-hover:scale-100"
                  dangerouslySetInnerHTML={{ __html: detailData?.location }}
                />
              </div>

              <footer className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[var(--text-color)]">
                <p className="text-xs uppercase tracking-widest">
                  ©{" "}
                  <span className="text-[var(--primary-color)]">
                    {new Date().getFullYear()}
                  </span>{" "}
                  {detailData?.site_name}
                </p>
                <p className="text-xs uppercase tracking-widest border-b border-[var(--primary-color)] pb-1">
                  Crafting Excellence Since{" "}
                  <span className="text-[var(--primary-color)]">2000</span>
                </p>
              </footer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
