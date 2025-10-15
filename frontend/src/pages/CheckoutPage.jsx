import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../store/orderStore';
import useCartStore from '../store/cartStore';

const CheckoutPage = () => {
    const [shippingAddress, setShippingAddress] = useState('');
    const { checkout, isLoading } = useOrderStore();
    const { fetchCart } = useCartStore(); // Lấy hàm fetchCart để làm mới giỏ hàng
    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!shippingAddress.trim()) {
            alert('Please enter a shipping address.');
            return;
        }

        const newOrder = await checkout(shippingAddress);

        if (newOrder) {
            // Nếu đặt hàng thành công, làm mới giỏ hàng (sẽ thấy giỏ hàng trống)
            await fetchCart();
            // Chuyển hướng đến trang lịch sử đơn hàng (sẽ tạo ở bước sau)
            navigate('/orders'); 
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <form onSubmit={handleCheckout} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Shipping Address</span>
                    </label>
                    <textarea 
                        className="textarea textarea-bordered h-24" 
                        placeholder="Enter your full shipping address"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                    {isLoading ? 'Placing Order...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;