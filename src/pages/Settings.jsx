import React, { useState } from "react";
import { useTranslation } from "react-i18next";
export default function Settings() {
    const { i18n } = useTranslation();
    const [settings, setSettings] = useState({
        darkMode: false,
        emailNotif: true,
        language: i18n.language || "fr",
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setSettings((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        // Si la langue change, informe i18n aussi
        if (name === "language") {
            i18n.changeLanguage(newValue);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-teal-800 mb-6">Paramètres</h1>

            <div className="bg-white shadow rounded-2xl p-6 space-y-6 max-w-xl">
                {/* Langue */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                    <select
                        name="language"
                        value={settings.language}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                    </select>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Recevoir les notifications par e-mail</span>
                    <input
                        type="checkbox"
                        name="emailNotif"
                        checked={settings.emailNotif}
                        onChange={handleChange}
                        className="h-5 w-5 text-teal-600"
                    />
                </div>

                {/* Thème sombre */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Activer le mode sombre</span>
                    <input
                        type="checkbox"
                        name="darkMode"
                        checked={settings.darkMode}
                        onChange={handleChange}
                        className="h-5 w-5 text-teal-600"
                    />
                </div>

                <div className="pt-4 text-sm text-gray-500">
                    (Les modifications ne sont pas encore sauvegardées dans une base de données)
                </div>
            </div>
        </div>
    );
}
