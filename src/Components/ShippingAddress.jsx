import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ShippingAddress = ({ onAddressChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    address_line: "",
    city: "",
    state: "",
    postal_code: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const domain = window.API_BASE_URL || "http://127.0.0.1:8000/";

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      try {
        const response = await fetch(`${domain}api/users/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const userData = await response.json();
          const newDetails = {
            name:
              userData.full_name ||
              `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
            phone_number: userData.phone_number || "",
            address_line: "",
            city: "",
            state: "",
            postal_code: "",
          };
          setFormData(newDetails);
          onAddressChange(newDetails);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUserDetails();
  }, [domain, onAddressChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveStatus(null);
  };

  const handleManualSave = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return alert("Please login to save address");

    setIsSaving(true);
    try {
      const res = await fetch(`${domain}api/shipping-address/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSaveStatus("success");
        onAddressChange(data);
      } else {
        setSaveStatus("error");
      }
    } catch (err) {
      setSaveStatus("error", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        name="name"
        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="phone_number"
        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
      <textarea
        name="address_line"
        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Street Address"
        value={formData.address_line}
        onChange={handleChange}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          name="city"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <input
        name="postal_code"
        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Postal Code"
        value={formData.postal_code}
        onChange={handleChange}
        required
      />

      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={handleManualSave}
          disabled={isSaving}
          className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
            isSaving ? "bg-slate-400" : "bg-slate-900 hover:bg-black"
          }`}
        >
          {isSaving ? "Saving..." : "Save Address"}
        </button>
        {saveStatus === "success" && (
          <span className="text-emerald-600 font-medium text-sm">
            ✓ Address Ready
          </span>
        )}
        {saveStatus === "error" && (
          <span className="text-rose-600 font-medium text-sm">
            ✕ Save Failed
          </span>
        )}
      </div>
    </div>
  );
};

ShippingAddress.propTypes = {
  onAddressChange: PropTypes.func.isRequired,
};

export default ShippingAddress;
