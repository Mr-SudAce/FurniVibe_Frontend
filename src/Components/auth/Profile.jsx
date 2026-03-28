import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaRegCalendarAlt } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { HiOutlineLogout } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const domain = window.API_BASE_URL || "http://localhost:8000/";
  const userDetail = `${domain}api/users/me/`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(userDetail, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Unauthorized");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userDetail]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
    window.location.reload();
  };

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        style={{ backgroundColor: "var(--bg-body)" }}
      >
        <div className="relative flex items-center justify-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2"
            style={{ borderColor: "var(--primary-color)" }}
          ></div>
          <div
            className="absolute h-6 w-6 rounded-full opacity-20 animate-pulse"
            style={{ backgroundColor: "var(--primary-color)" }}
          ></div>
        </div>
        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
          Synchronizing
        </p>
      </div>
    );
  }

  const initials =
    `${userData?.first_name?.[0] || ""}${userData?.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div
      className="p-6 lg:p-12 transition-all duration-500"
      style={{ backgroundColor: "var(--bg-body)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar: Profile Card */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div
              className="bg-white rounded-[32px] p-10 flex flex-col items-center shadow-sm relative overflow-hidden group"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div
                className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-[0.03]"
                style={{ backgroundColor: "var(--primary-color)" }}
              ></div>

              <div className="relative mb-8">
                <div
                  className="h-28 w-28 rounded-[40px] flex items-center justify-center text-4xl font-black shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--bg-body)",
                  }}
                >
                  {initials || "NA"}
                </div>
                <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-emerald-500 border-[5px] border-white rounded-full"></div>
              </div>

              <div className="text-center space-y-1">
                <h2
                  className="text-2xl font-black tracking-tight"
                  style={{ color: "var(--text-main)" }}
                >
                  {userData.first_name} {userData.last_name}
                </h2>
                <p className="text-sm font-bold opacity-40 italic">
                  @{userData.username}
                </p>
              </div>

              <div
                className="mt-8 pt-8 w-full border-t flex items-center justify-around"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase opacity-30 mb-1">
                    Status
                  </p>
                  <p
                    className="text-xs font-bold uppercase tracking-tighter"
                    style={{ color: "var(--primary-color)" }}
                  >
                    {userData.status}
                  </p>
                </div>
                <div
                  className="h-8 w-[1px]"
                  style={{ backgroundColor: "var(--border-color)" }}
                ></div>
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase opacity-30 mb-1">
                    User ID
                  </p>
                  <p
                    className="text-xs font-bold"
                    style={{ color: "var(--primary-color)" }}
                  >
                    #{userData.id}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border-2 transition-all hover:bg-white hover:shadow-md active:scale-95 flex items-center justify-center gap-3 group"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-main)",
              }}
            >
              <HiOutlineLogout className="text-lg group-hover:rotate-12 transition-transform" />
              <span>Logout Account</span>
            </button>
          </div>

          {/* Main Content: Identity Details */}
          <div className="flex-1 space-y-8">
            <div
              className="bg-white rounded-[32px] p-10 relative"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div
                className="flex items-center justify-between mb-10 pb-4 border-b"
                style={{ borderColor: "var(--border-color)" }}
              >
                <h3
                  className="text-sm font-black uppercase tracking-[0.15em] opacity-80"
                  style={{ color: "var(--text-main)" }}
                >
                  Identity & Contact
                </h3>
                <div
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--primary-color)" }}
                ></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <DetailItem
                  label="Official Email"
                  value={userData.email}
                  icon={<FaEnvelope />}
                />
                <DetailItem
                  label="Mobile Connection"
                  value={userData.phone_number || "Unlinked"}
                  icon={<FaWhatsapp className="text-emerald-500" />}
                />
                <DetailItem
                  label="Account Authority"
                  value={
                    userData.is_active
                      ? "Verified Member"
                      : "Awaiting Verification"
                  }
                  color={
                    userData.is_active ? "text-emerald-600" : "text-rose-500"
                  }
                  icon={
                    <GoShieldCheck
                      className={
                        userData.is_active
                          ? "text-emerald-600"
                          : "text-rose-500"
                      }
                    />
                  }
                />
                <DetailItem
                  label="Member Since"
                  value={new Date(userData.created_at).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                  icon={<FaRegCalendarAlt />}
                />
              </div>
            </div>

            {/* Actions Card */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <Link
                to="/my-orders"
                className="group relative overflow-hidden flex items-center justify-between p-7 rounded-3xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1 border"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--bg-body)",
                }}
              >
                <div className="relative z-10 flex flex-col">
                  <span className="opacity-60 text-[10px] mb-1">
                    Order History
                  </span>
                  <span className="text-lg">My Orders</span>
                </div>
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all group-hover:rotate-12">
                  <FiArrowRight className="text-xl" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, color, icon }) => (
  <div className="group relative flex items-center gap-5">
    <div
      className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl transition-all duration-300 group-hover:bg-white group-hover:shadow-md group-hover:scale-110"
      style={{ color: "var(--primary-color)" }}
    >
      {icon}
    </div>
    <div className="space-y-0.5 min-w-0 flex-1">
      <p className="text-[10px] font-black uppercase tracking-widest opacity-30 group-hover:opacity-60 transition-opacity">
        {label}
      </p>
      <p
        className={`text-sm font-bold truncate ${color || ""}`}
        style={{ color: color ? "" : "var(--text-main)" }}
      >
        {value}
      </p>
    </div>
  </div>
);

export default Profile;
