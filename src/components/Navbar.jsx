import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext";

export default function Navbar() {
    const { t } = useTranslation();
    const location = useLocation();
    const { user, logout } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Style dynamique pour les liens
    const linkClass = (path) =>
        `relative px-3 py-2 transition-all duration-200 text-sm font-bold tracking-wide ${
            location.pathname === path
                ? "text-teal-500 underline decoration-2 underline-offset-8"
                : "text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-3 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* 1. LOGO */}
                <Link to="/" className="text-xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-teal-500/20">A</div>
                    ALGO<span className="text-teal-500">LAB</span>
                </Link>

                {/* 2. LIENS CENTRAUX (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className={linkClass("/")}>{t("home")}</Link>
                    <Link to="/dashboard" className={linkClass("/dashboard")}>{t("dashboard")}</Link>
                    <Link to="/parametres" className={linkClass("/parametres")}>{t("settings")}</Link>
                </div>

                {/* 3. ESPACE UTILISATEUR / ACTIONS */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        /* État Connecté */
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <div className="hidden sm:block text-right leading-none">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("welcome")}</p>
                                <p className="text-sm font-bold dark:text-white">{user.username}</p>
                            </div>
                            <Link to="/profil" className="group relative">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                                    className="w-10 h-10 rounded-xl border-2 border-teal-500 bg-slate-100 dark:bg-slate-800 transition-transform group-hover:scale-110"
                                    alt="Avatar"
                                />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                            </Link>
                            <button
                                onClick={logout}
                                className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                                title="Déconnexion"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        /* État Déconnecté */
                        <div className="flex items-center space-x-2">
                            <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-500 px-3 py-2 transition-colors">
                                {t("login")}
                            </Link>
                            <Link to="/signup" className="bg-slate-900 dark:bg-teal-500 hover:bg-slate-800 dark:hover:bg-teal-600 text-white text-sm font-black py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-teal-500/10 active:scale-95">
                                {t("signup")}
                            </Link>
                        </div>
                    )}

                    {/* Menu Mobile Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-slate-600 dark:text-slate-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 4. MOBILE MENU ACCORDION */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 pb-4 space-y-2 animate-question">
                    <Link to="/" className="block px-4 py-2 font-bold dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">{t("home")}</Link>
                    <Link to="/dashboard" className="block px-4 py-2 font-bold dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">{t("dashboard")}</Link>
                    <Link to="/parametres" className="block px-4 py-2 font-bold dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">{t("settings")}</Link>
                </div>
            )}
        </nav>
    );
}