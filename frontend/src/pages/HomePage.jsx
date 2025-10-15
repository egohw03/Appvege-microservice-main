import React, { useEffect } from 'react';
import useProductStore from '../store/productStore.js';
import useCartStore from '../store/cartStore.js';

const HomePage = () => {
    const { products, fetchProducts, isLoading } = useProductStore();
    const { addToCart } = useCartStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (isLoading) {
        return <div className="text-center p-10">Loading products...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product._id} className="card bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            {/* Giả sử có ảnh, nếu không sẽ hiển thị ảnh mặc định */}
                            <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.name} className="rounded-xl h-48 w-full object-cover" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{product.name}</h2>
                            <p>${product.price.toFixed(2)}</p>
                            <div className="card-actions">
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => addToCart(product._id, 1)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;