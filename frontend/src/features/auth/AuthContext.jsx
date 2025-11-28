import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user từ localStorage khi app khởi động
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (err) {
                console.error("Lỗi khi parse user từ localStorage:", err);
                localStorage.removeItem("user");
            }
        }
    }, []);

    // Đăng nhập: lưu user và token vào state + localStorage
    const login = (user, token) => {
        const userWithToken = { ...user, token };  // gán token vào user object
        setUser(userWithToken);
        localStorage.setItem("user", JSON.stringify(userWithToken));
        localStorage.setItem("token", token);
    };


    // Đăng xuất: xoá user khỏi state và localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook tiện dùng
export const useAuth = () => useContext(AuthContext);
