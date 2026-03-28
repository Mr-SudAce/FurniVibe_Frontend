
// Cart item remove handler
// cartUtils.js or useCartHandler.js
const domain = window.API_BASE_URL;

/**
 * @param {Object} params
 * @param {Function} params.setItems
 */
export const handleRemoveItem = async (itemId, productId, setItems) => {
  const token = localStorage.getItem("access_token");

  const syncLocalState = () => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = localCart.filter((item) => item.product_id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (setItems) {
      setItems(updatedCart.map(item => ({ ...item, price: Number(item.price) })));
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (token && itemId) {
    try {
      const response = await fetch(`${domain}api/cart/remove/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item_id: String(itemId) }),
      });

      if (response.ok) {
        syncLocalState();
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
      }
    } catch (error) {
      console.error("Network error removing item:", error);
    }
  } else {
    syncLocalState();
  }
};