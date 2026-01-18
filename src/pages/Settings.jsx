import React, { useState } from "react";
import { useTranslation } from "react-i18next";
export default function Settings() {
    const { i18n } = useTranslation();
    const [settings, setSettings] = useState({
        darkMode: false,
        emailNotif: true,
        language: i18n.language || "fr",
    });

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-black text-slate-900 mb-10">Paramètres</h1>

                <div className="bg-white shadow-xl shadow-slate-200/50 rounded-[2.5rem] border border-slate-100 overflow-hidden">

                    {/* Section Langue */}
                    <div className="p-8 border-b border-slate-50">
                        <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-4">Préférences de langue</label>
                        <div className="relative">
                            <select
                                name="language"
                                value={settings.language}
                                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-slate-700 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                            >
                                <option value="fr">🇫🇷 Français</option>
                                <option value="en">🇬🇧 English</option>
                                <option value="ar">🇸🇦 Arabic</option>
                            </select>
                        </div>
                    </div>

                    {/* Section Toggles */}
                    <div className="p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-slate-900 text-lg">Notifications e-mail</p>
                                <p className="text-slate-500 text-sm">Recevoir un récapitulatif de tes progrès.</p>
                            </div>
                            <input
                                type="checkbox"
                                className="w-12 h-6 rounded-full bg-slate-200 appearance-none checked:bg-teal-500 relative cursor-pointer transition-all before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:translate-x-6 before:transition-transform"
                                checked={settings.emailNotif}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-slate-900 text-lg">Mode Sombre</p>
                                <p className="text-slate-500 text-sm">Repos pour tes yeux de développeur.</p>
                            </div>
                            <input
                                type="checkbox"
                                className="w-12 h-6 rounded-full bg-slate-200 appearance-none checked:bg-slate-900 relative cursor-pointer transition-all before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:translate-x-6 before:transition-transform"
                                checked={settings.darkMode}
                            />
                        </div>
                    </div>

                    {/* Footer d'information */}
                    <div className="bg-slate-50 p-6 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Sync automatique activé
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button className="bg-teal-500 text-white font-black py-4 px-12 rounded-2xl shadow-lg shadow-teal-200 hover:bg-teal-600 transition-all hover:-translate-y-1">
                        Sauvegarder les réglages
                    </button>
                </div>
            </div>
        </div>
    );
}
