import "./App.css";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import * as Index from "./index.jsx";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const loginTime = decodedToken.iat;
    const expiryTime = loginTime + 3600;

    if (currentTime > expiryTime) {
      localStorage.removeItem("access_token");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    console.log(error);
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const token = localStorage.getItem("access_token");
  return (
    <BrowserRouter>
      <div className="w-full bg-gray-850">
        {token && <Index.Navbar />}
        <div className="mt-20">
          <Routes>
            <Route path="/login" element={<Index.Login />} />
            <Route path="/register" element={<Index.Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index.Heropage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <Index.CatgProdDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <Index.AboutUs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Index.Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/category/:category"
              element={
                <ProtectedRoute>
                  <Index.CatgProdDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id/:product_name/"
              element={
                <ProtectedRoute>
                  <Index.ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Index.CheckoutList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <Index.OrderSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-address"
              element={
                <ProtectedRoute>
                  <Index.ShippingAddress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <Index.MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-detail/:orderId"
              element={
                <ProtectedRoute>
                  <Index.OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <Index.OrderSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Index.Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        {token && <Index.Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
