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
        throw new Error(data.non_field_errors?.[0] || "Invalid credentials.");
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
    <>
      <section className="max-w-7xl mx-auto bg-amber-300 ">
        <div>Register</div>
        <form onSubmit={handleRegister}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
              ⚠️ {error}
            </div>
          )}
          <div className="grid grid-cols-2">
            <label className="">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
            />
            <label className="">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
            />
            <label className="">Email</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label className="">Phone Number</label>
            <input
              type="number"
              placeholder="9000000000"
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
            />
            <label className="">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <label className="">Confirm Password</label>
            <input type="password" placeholder="Enter Confirm Password" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-info border-1 cursor rounded-3 bg-amber-400 text-white p-5 align-end"
          >
            Signup
          </button>
        </form>
      </section>
    </>
  );
};

export default Register;
