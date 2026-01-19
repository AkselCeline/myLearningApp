import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('algo_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('algo_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('algo_user');
    };

    // La fonction addXP doit être DANS le composant et AVANT le return
    const addXP = (amount) => {
        if (!user) return false;

        const currentPoints = user.points || 0;
        const currentLevel = user.level || 0;
        const newPoints = currentPoints + amount;
        const newLevel = Math.floor(newPoints / 100);

        const updatedUser = {
            ...user,
            points: newPoints,
            level: newLevel > currentLevel ? newLevel : currentLevel
        };

        setUser(updatedUser);
        localStorage.setItem('algo_user', JSON.stringify(updatedUser));

        return newLevel > currentLevel; // Flash de niveau supérieur
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, addXP }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);