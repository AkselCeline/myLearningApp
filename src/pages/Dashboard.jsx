import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const themes = [
        { name: "Algorithme", progress: 60, icon: "🧩" },
        { name: "Git", progress: 60, icon: "🌿" },
        { name: "HTTP", progress: 40, icon: "🌐" },
        { name: "Java", progress: 20, icon: "☕" },
        { name: "Spring", progress: 10, icon: "🍃" },
        { name: "Sécurité", progress: 0, icon: "🛡️" },
    ];

    const badges = [
        { name: "Algorithme", unlocked: false },
        { name: "Débutant Git", unlocked: true },
        { name: "HTTP Explorer", unlocked: true },
        { name: "Ninja Java", unlocked: false },
        { name: "Spring Starter", unlocked: false },
        { name: "Cyber Sécurité", unlocked: false },
    ];

    const totalXP = themes.reduce((sum, t) => sum + t.progress, 0);
    const level = Math.floor(totalXP / 100);
    const nextLevelProgress = totalXP % 100;

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header & Profil */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900">Salut, Apprenant ! 👋</h1>
                        <p className="text-slate-500 mt-2 text-lg">Prêt à relever de nouveaux défis aujourd'hui ?</p>
                    </div>

                    {/* Carte Niveau Global */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 min-w-[320px]">
                        <div className="relative flex-shrink-0">
                            {/* Cercle de niveau */}
                            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-teal-200">
                                {level}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-bold text-slate-700">Progression Niveau</span>
                                <span className="text-sm font-bold text-teal-600">{nextLevelProgress}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-teal-400 to-teal-600 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${nextLevelProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Colonne Gauche : Cours (Themes) */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="bg-teal-100 p-2 rounded-lg">📚</span> Tes Parcours
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {themes.map((theme) => (
                                <Link
                                    key={theme.name}
                                    to={`/lessons/${theme.name.toLowerCase()}`}
                                    className="group bg-white border border-slate-100 rounded-3xl p-5 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-4xl">{theme.icon}</div>
                                        <span className="text-xs font-bold text-slate-400 group-hover:text-teal-500 transition-colors">VOIR LE COURS →</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-3">{theme.name}</h3>
                                    <div className="w-full bg-slate-50 rounded-full h-2 mb-2">
                                        <div
                                            className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${theme.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        {theme.progress}% complété
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Colonne Droite : Badges */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <span className="bg-amber-100 p-2 rounded-lg">🏆</span> Succès
                        </h2>
                        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 grid grid-cols-2 gap-4">
                            {badges.map((badge) => (
                                <div
                                    key={badge.name}
                                    className={`relative group p-4 rounded-2xl border transition-all ${
                                        badge.unlocked
                                            ? "bg-teal-50 border-teal-100 shadow-sm"
                                            : "bg-slate-50 border-transparent opacity-60 grayscale"
                                    }`}
                                >
                                    <div className="text-3xl mb-2 text-center">
                                        {badge.unlocked ? "🥇" : "🔒"}
                                    </div>
                                    <p className={`text-[11px] font-black text-center uppercase tracking-tighter ${
                                        badge.unlocked ? "text-teal-700" : "text-slate-400"
                                    }`}>
                                        {badge.name}
                                    </p>
                                    {!badge.unlocked && (
                                        <div className="absolute inset-0 bg-slate-900/5 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="bg-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">Bloqué</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}