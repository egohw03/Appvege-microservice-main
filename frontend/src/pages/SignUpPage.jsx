import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore.js';

const SignUpPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Full Name</span></label>
                        <input type="text" placeholder="Your Name" className="input input-bordered" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" placeholder="email" className="input input-bordered" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" placeholder="password" className="input input-bordered" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" disabled={isSigningUp}>
                            {isSigningUp ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </div>
                     <p className="text-center mt-4">
                        Already have an account? <Link to="/login" className="link link-primary">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;