import { useState, useEffect } from "react";

const ShippingAddress = ({ onAddressChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    address_line: "",
    city: "",
    state: "",
    postal_code: "",
  });
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
            ...formData,
            name:
              userData.full_name ||
              `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
            phone_number: userData.phone_number || "",
            // Add other fields if they exist in your user object
          };
          setFormData(newDetails);
          onAddressChange(newDetails); // Sync initial data
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUserDetails();
  }, [domain]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onAddressChange(updatedData); // Pass data to parent on every keystroke
  };

  return (
    <div className="space-y-4">
      <input
        name="name"
        className="w-full p-3 border rounded-lg"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="phone_number"
        className="w-full p-3 border rounded-lg"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
      <textarea
        name="address_line"
        className="w-full p-3 border rounded-lg"
        placeholder="Street Address"
        value={formData.address_line}
        onChange={handleChange}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          name="city"
          className="w-full p-3 border rounded-lg"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          className="w-full p-3 border rounded-lg"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <input
        name="postal_code"
        className="w-full p-3 border rounded-lg"
        placeholder="Postal Code"
        value={formData.postal_code}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default ShippingAddress;
