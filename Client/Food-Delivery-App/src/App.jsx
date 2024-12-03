import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  { Toaster } from "react-hot-toast";
import Register from './Pages/Auth/RegisterPage/register';
import Login from './Pages/Auth/LoginPage/login';
import Home from './Pages/Home/home';
import Product from './Pages/Product/product';
import Checkout from './Pages/Proceed/checkout';
import Payment from './Pages/Payment/payment';
import Order from './Pages/Order/order';
import Profile from './Pages/Profile/profile';
import Address from './Pages/Address/address';
import { AppProvider } from './Context/AppContext';

export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/product/:restaurantId" element={<Product />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/address" element={<Address />} />
                </Routes>

                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    gutter={8}
                    toastOptions={{
                        duration: 2000,
                        style: {
                            background: "#fff",
                            color: "#000",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                        },
                    }}
                />
            </BrowserRouter>
        </AppProvider>
    );
}
