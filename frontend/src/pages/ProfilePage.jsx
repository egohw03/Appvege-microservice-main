import React from 'react';
import useAuthStore from '../store/authStore.js';

const ProfilePage = () => {
    // Lấy thông tin người dùng đã đăng nhập từ authStore
    const { authUser } = useAuthStore();

    // Định dạng lại ngày tham gia cho dễ đọc
    const memberSince = authUser ? new Date(authUser.createdAt).toLocaleDateString() : '';

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold">Full Name</label>
                            <p className="text-lg">{authUser?.name}</p>
                        </div>
                        <div className="divider my-0"></div>
                        <div>
                            <label className="text-sm font-semibold">Email Address</label>
                            <p className="text-lg">{authUser?.email}</p>
                        </div>
                        <div className="divider my-0"></div>
                        <div>
                            <label className="text-sm font-semibold">Member Since</label>
                            <p className="text-lg">{memberSince}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;