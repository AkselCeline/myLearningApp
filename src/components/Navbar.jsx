import React from "react";
import {Link, Route, useLocation} from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const linkClass = (path) =>
        `px-4 py-2 rounded-lg ${
            location.pathname === path
                ? "bg-teal-600 text-white"
                : "text-teal-700 hover:bg-teal-100"
        }`;

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-teal-700">My Learning App</h1>
            <div className="space-x-4">
                <Link to="/login" className={linkClass("/login")}>
                    {t("login")}
                </Link>
                <Link to="/signup" className={linkClass("/signup")}>
                    {t("signup")}
                </Link>
                <Link to="/profil" className={linkClass("/profil")}>
                    {t("profile")}
                </Link>
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                    {t("dashboard")}
                </Link>
                <Link to="/" className={linkClass("/")}>
                    {t("home")}
                </Link>
                <Link to="/parametres" className={linkClass("/parametres")}>
                    {t("settings")}
                </Link>
            </div>
        </nav>
    );
}