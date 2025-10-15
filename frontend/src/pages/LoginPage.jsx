import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore.js';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, isLoggingIn } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
        // Sau khi đăng nhập thành công, authUser sẽ được cập nhật
        // App.jsx sẽ tự động chuyển hướng người dùng
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome back to AppVege Store.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" placeholder="email" className="input input-bordered" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" placeholder="password" className="input input-bordered" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={isLoggingIn}>
                                {isLoggingIn ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                        <p className="text-center mt-4">
                            Don't have an account? <Link to="/signup" className="link link-primary">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;