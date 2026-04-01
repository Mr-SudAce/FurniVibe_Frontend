import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const domain = window.API_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${domain}auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.non_field_errors?.[0] || data.detail || "Invalid credentials.");
      }

      if (data.access) {
        localStorage.setItem("access_token", data.access);
      }
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center px-4 py-12">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-green-50/50 -z-10" />

      <div className="w-full max-w-md">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
              FurniVibe
            </h2>
            <p className="text-gray-500 font-medium">
              Welcome! Please enter your details.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 flex items-center gap-2">
              <span className="text-lg">×</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email or Username
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <User size={18} />
                </span>
                <input
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-50 focus:border-green-600 outline-none transition-all duration-200 bg-gray-50/30 focus:bg-white"
                  onChange={handleChange}
                  required
                />
              </div>
                <small className="text-[11px] text-gray-200">Add &quot;-&quot; in between your first and last name with all small letter</small>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                {/* <button type="button" className="text-xs font-bold text-green-700 hover:text-green-800 transition-colors">
                  Forgot Password?
                </button> */}
              </div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-50 focus:border-green-600 outline-none transition-all duration-200 bg-gray-50/30 focus:bg-white"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800 shadow-lg shadow-green-200"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="text-green-700 font-bold hover:underline"
              onClick={() => navigate("/register")}
            >
              Create one now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;