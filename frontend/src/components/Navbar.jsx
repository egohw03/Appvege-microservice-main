import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore.js';

const Navbar = () => {
    const { authUser, logout } = useAuthStore();

    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">AppVege</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {authUser ? (
                        // Nếu người dùng đã đăng nhập
                        <>
                            <li>
                                <details>
                                    <summary>
                                        Hello, {authUser.name}
                                    </summary>
                                    <ul className="p-2 bg-base-100 rounded-t-none">
                                        <li><a>Profile</a></li> {/* Sẽ làm sau */}
                                        <li><Link to="/orders">My Orders</Link></li>
                                        <li><button onClick={logout}>Logout</button></li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <Link to="/cart">Cart</Link> {/* Sẽ làm sau */}
                            </li>
                        </>
                    ) : (
                        // Nếu chưa đăng nhập
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;