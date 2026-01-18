import React from "react";
import {Link, Route, useLocation} from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const { t } = useTranslation();
    const location = useLocation();

    const linkClass = (path) =>
        `relative px-3 py-2 transition-all duration-200 text-sm font-medium ${
            location.pathname === path
                ? "text-teal-600"
                : "text-slate-600 hover:text-teal-600"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-3 flex justify-between items-center">
            {/* LOGO */}
            <Link to="/" className="text-xl font-black tracking-tight text-slate-800">
                MY<span className="text-teal-500">LEARNING</span>
            </Link>

            {/* LIENS CENTRAUX */}
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className={linkClass("/")}>{t("home")}</Link>
                <Link to="/dashboard" className={linkClass("/dashboard")}>{t("dashboard")}</Link>
                <Link to="/profil" className={linkClass("/profil")}>{t("profile")}</Link>
                <Link to="/parametres" className={linkClass("/parametres")}>{t("settings")}</Link>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-teal-600 px-4">
                    {t("login")}
                </Link>
                <Link to="/signup" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2 px-5 rounded-full transition-all shadow-md active:scale-95">
                    {t("signup")}
                </Link>
            </div>
        </nav>
    );
}