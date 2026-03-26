import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const domain = window.API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Send the POST request with the credentials in the body
      const response = await fetch(`${domain}api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Critical: sending the data!
      });

      const data = await response.json();

      if (!response.ok) {
        // Handling Django-style error messages
        throw new Error(data.non_field_errors?.[0] || data.detail || "Invalid credentials.");
      }

      // 2. Save the token and user info AFTER a successful response
      // Assuming your Django API returns { access: "...", user: {...} }
      if (data.access) {
        localStorage.setItem("access_token", data.access);
      }
      
      localStorage.setItem("userInfo", JSON.stringify(data));

      // 3. Redirect
      navigate("/");
      window.location.reload(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <form
        onSubmit={handleLogin}
        className="p-8 border border-gray-200 rounded-xl shadow-lg w-full max-w-md bg-white"
      >
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Sign in to your FurniVibe account
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              placeholder="e.g. abc12@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <span
            className="text-green-600 font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
