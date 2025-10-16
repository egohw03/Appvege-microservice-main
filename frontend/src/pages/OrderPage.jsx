import React, { useEffect } from 'react';
import useOrderStore from '../store/orderStore.js';

const OrdersPage = () => {
    const { orders, fetchOrders, isLoading } = useOrderStore();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    if (isLoading) return <p className="text-center p-10">Loading your orders...</p>;
    if (orders.length === 0) return <p className="text-center p-10">You have no orders yet.</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Your Order History</h1>
            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order._id} className="card bg-base-200 shadow-md">
                        <div className="card-body">
                            <div className="flex justify-between items-center">
                                <h2 className="card-title">Order #{order._id.slice(-6)}</h2>
                                <div className={`badge ${order.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>{order.status}</div>
                            </div>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Total: ${order.totalAmount.toFixed(2)}</p>
                            <div className="divider my-2"></div>
                            <h3 className="font-semibold">Items:</h3>
                            <ul className="list-disc list-inside">
                                {order.items.map(item => (
                                    <li key={item.productId}>{item.name} (x{item.quantity})</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;