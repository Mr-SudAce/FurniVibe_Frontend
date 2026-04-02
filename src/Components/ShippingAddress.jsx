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
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null);

  const domain = window.API_BASE_URL || "http://127.0.0.1:8000/";

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsLoading(false);
        return;
      }
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
            name: userData.full_name || `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
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
      } finally {
        setTimeout(() => setIsLoading(false), 400); // Slight delay for smooth transition
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

  // Reusable Input Component for cleaner UI
  const InputField = ({ name, placeholder, value, type = "text", isTextArea = false }) => {
    const Component = isTextArea ? "textarea" : "input";
    return (
      <div className="relative group">
        <Component
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl outline-none transition-all duration-300 
            placeholder:text-slate-400 text-slate-800 font-medium
            focus:bg-white focus:border-[var(--primary-color)] focus:ring-4 focus:ring-orange-500/10 
            ${isTextArea ? "min-h-[120px] resize-none" : ""}`}
          required
        />
      </div>
    );
  };

  InputField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    isTextArea: PropTypes.bool,
  };

  if (isLoading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-14 bg-slate-100 rounded-xl w-full"></div>
        <div className="h-14 bg-slate-100 rounded-xl w-full"></div>
        <div className="h-28 bg-slate-100 rounded-xl w-full"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-14 bg-slate-100 rounded-xl"></div>
          <div className="h-14 bg-slate-100 rounded-xl"></div>
        </div>
        <div className="h-14 bg-slate-200 rounded-xl w-40"></div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField name="name" placeholder="Full Name" value={formData.name} />
        <InputField name="phone_number" placeholder="Phone Number" value={formData.phone_number} />
      </div>

      <InputField name="address_line" placeholder="Street Address / Landmark" value={formData.address_line} isTextArea />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <InputField name="city" placeholder="City" value={formData.city} />
        <InputField name="state" placeholder="State" value={formData.state} />
        <div className="col-span-2 md:col-span-1">
          <InputField name="postal_code" placeholder="Zip Code" value={formData.postal_code} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
        <button
          type="button"
          onClick={handleManualSave}
          disabled={isSaving}
          className={`relative overflow-hidden w-full sm:w-auto px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest text-white transition-all duration-300 active:scale-95 
            ${isSaving ? "bg-slate-400 cursor-not-allowed" : "bg-[var(--primary-color)] hover:brightness-110 hover:-translate-y-0.5"}`}
        >
          <span className="flex items-center justify-center gap-2">
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving Data
              </>
            ) : (
              "Securely Save Address"
            )}
          </span>
        </button>

        {saveStatus === "success" && (
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-tighter animate-in fade-in zoom-in">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              ✓
            </span>
            Verified & Saved
          </div>
        )}

        {saveStatus === "error" && (
          <span className="text-rose-500 font-bold text-xs uppercase tracking-tighter" >
            ✕ Connection Error
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