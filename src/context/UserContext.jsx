import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Au chargement, on vérifie s'il y a un utilisateur stocké dans le navigateur
        const savedUser = localStorage.getItem('algo_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Fonction pour se connecter
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('algo_user', JSON.stringify(userData));
    };

    // Fonction pour se déconnecter
    const logout = () => {
        setUser(null);
        localStorage.removeItem('algo_user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte facilement
export const useUser = () => useContext(UserContext);