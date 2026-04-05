import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const Domain = window.API_BASE_URL;
  const registerUrl = `${Domain}api/auth/register/`;
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.non_field_errors?.[0] || "Registration failed. Please check your details.");
      }
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/login");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-10 shadow-xl rounded-2xl border border-gray-100">
          
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Create an Account</h2>
            <p className="mt-2 text-sm text-gray-600">Join us and start your journey today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-200 flex items-center animate-pulse">
                <span className="mr-2">⚠️</span> {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                <input
                  name="first_name"
                  type="text"
                  required
                  placeholder="John"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  required
                  placeholder="Doe"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="abc@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* Phone Number */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  name="phone_number"
                  type="tel"
                  placeholder="9000000000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform active:scale-95 ${
                loading 
                ? "bg-amber-200 cursor-not-allowed" 
                : "bg-amber-500 hover:bg-amber-600 shadow-lg hover:shadow-amber-200"
              }`}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account? <a href="/login" className="text-amber-600 font-bold hover:underline">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;