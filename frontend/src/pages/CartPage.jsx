import React, { useEffect } from 'react';
import useCartStore from '../store/cartStore.js';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, fetchCart, isLoading, removeFromCart, updateQuantity } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    if (isLoading) return <p>Loading cart...</p>;
    if (!cart || cart.items.length === 0) return <p className="text-center p-10">Your cart is empty.</p>;

    const total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map(item => (
                            <tr key={item.productId}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <input 
                                        type="number" 
                                        className="input input-bordered w-20" 
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                                        min="1"
                                    />
                                </td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                <th>
                                    <button 
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => removeFromCart(item.productId)}
                                    >
                                        Remove
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-end">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Cart Total</h2>
                        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                        <div className="card-actions justify-end">
                            <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;