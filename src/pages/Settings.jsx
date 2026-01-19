import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext"; // Import du contexte

export default function Settings() {
    const { i18n } = useTranslation();
    const { user, setUser } = useUser(); // Récupération de l'utilisateur

    const [settings, setSettings] = useState({
        darkMode: document.documentElement.classList.contains("dark"),
        emailNotif: true,
        language: i18n.language || "fr",
        username: user?.username || "" // État pour le nom
    });

    // --- TA LOGIQUE MAGIQUE ---
    useEffect(() => {
        if (settings.darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [settings.darkMode]);

    // Sauvegarde du profil
    const saveProfile = () => {
        if (!user) return;
        const updatedUser = { ...user, username: settings.username };
        setUser(updatedUser);
        localStorage.setItem('algo_user', JSON.stringify(updatedUser));
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-500">
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">Paramètres</h1>

                {/* --- SECTION PROFIL (Conditionnelle) --- */}
                {user && (
                    <div className="bg-white dark:bg-slate-900 shadow-xl rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 space-y-6">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Mon Profil</label>
                        <div className="flex items-center gap-6">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${settings.username}`}
                                className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-teal-500"
                                alt="Avatar"
                            />
                            <input
                                type="text"
                                value={settings.username}
                                onChange={(e) => setSettings({...settings, username: e.target.value})}
                                className="flex-1 p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold text-slate-700 dark:text-white outline-none focus:ring-4 focus:ring-teal-500/10"
                            />
                        </div>
                        <button
                            onClick={saveProfile}
                            className="w-full bg-teal-500 text-white font-black py-4 rounded-2xl hover:bg-teal-600 transition-all active:scale-95"
                        >
                            Enregistrer les modifications
                        </button>
                    </div>
                )}

                {/* --- SECTION SYSTÈME (Toujours accessible) --- */}
                <div className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">

                    {/* Section Langue */}
                    <div className="p-8 border-b border-slate-50 dark:border-slate-800">
                        <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-4">Préférences de langue</label>
                        <select
                            name="language"
                            value={settings.language}
                            onChange={(e) => {
                                setSettings({...settings, language: e.target.value});
                                i18n.changeLanguage(e.target.value);
                            }}
                            className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 font-semibold text-slate-700 dark:text-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                        >
                            <option value="fr">🇫🇷 Français</option>
                            <option value="en">🇬🇧 English</option>
                            <option value="ar">🇸🇦 Arabic</option>
                        </select>
                    </div>

                    {/* Section Toggles - ALIGNEMENT CORRIGÉ ICI */}
                    <div className="p-8 space-y-6">

                        {/* Notification e-mail - Maintenant identique au Mode Sombre */}
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent dark:border-slate-800 transition-all">
                            <div className="flex-1">
                                <p className="font-bold text-slate-900 dark:text-white text-lg leading-tight">Notifications e-mail</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Récapitulatif de tes progrès.</p>
                            </div>
                            <div className="ml-4">
                                <input
                                    type="checkbox"
                                    className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none checked:bg-teal-500 relative cursor-pointer transition-all before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white dark:before:bg-slate-900 before:rounded-full before:top-1 before:left-1 checked:before:translate-x-6 before:transition-transform"
                                    checked={settings.emailNotif}
                                    onChange={(e) => setSettings({ ...settings, emailNotif: e.target.checked })}
                                />
                            </div>
                        </div>

                        {/* Mode Sombre */}
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent dark:border-slate-800 transition-all">
                            <div className="flex-1">
                                <p className="font-bold text-slate-900 dark:text-white text-lg leading-tight">Mode Sombre</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Repos pour tes yeux.</p>
                            </div>
                            <div className="ml-4">
                                <input
                                    type="checkbox"
                                    className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none checked:bg-indigo-600 relative cursor-pointer transition-all before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white dark:before:bg-slate-900 before:rounded-full before:top-1 before:left-1 checked:before:translate-x-6 before:transition-transform"
                                    checked={settings.darkMode}
                                    onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 text-center border-t dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Sync automatique activé
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}