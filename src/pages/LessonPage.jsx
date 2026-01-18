import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import lessonsData from '../data/lessonsData';

export default function LessonPage() {
    const { theme } = useParams();
    const themeData = lessonsData[theme.toLowerCase()];
    const [openLevel, setOpenLevel] = useState(null);

    if (!themeData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl">
                    <p className="text-4xl mb-4">🔍</p>
                    <h2 className="text-2xl font-bold text-slate-800">Thème introuvable</h2>
                    <Link to="/dashboard" className="text-teal-600 font-bold hover:underline mt-4 block">Retour au dashboard</Link>
                </div>
            </div>
        );
    }

    const toggleLevel = (levelName) => {
        setOpenLevel(prev => (prev === levelName ? null : levelName));
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <Link to="/dashboard" className="text-teal-600 font-bold text-sm mb-2 block hover:translate-x-[-4px] transition-transform">
                        ← Retour au Dashboard
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight">
                        Parcours : <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                            {themeData.theme}
                        </span>
                    </h1>
                </div>

                {/* Liste des Niveaux */}
                <div className="space-y-6 relative">
                    {/* Ligne verticale décorative pour l'effet "Path" */}
                    <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-200 hidden md:block"></div>

                    {themeData.levels.map((level, index) => (
                        <div key={level.name} className="relative">
                            {/* Point de passage sur la ligne */}
                            <div className="absolute left-8 top-8 w-4 h-4 bg-teal-500 rounded-full -translate-x-1/2 border-4 border-white hidden md:block z-10"></div>

                            <div className={`transition-all duration-300 rounded-[2rem] overflow-hidden ${
                                openLevel === level.name
                                    ? "bg-white dark:bg-slate-900 shadow-xl ring-1 ring-slate-100"
                                    : "bg-slate-100/50 border border-transparent hover:bg-white dark:bg-slate-900 hover:border-slate-200"
                            }`}>
                                <button
                                    onClick={() => toggleLevel(level.name)}
                                    className="w-full flex items-center justify-between px-8 py-6 text-left group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm transition-colors ${
                                            openLevel === level.name ? "bg-teal-500 text-white" : "bg-white dark:bg-slate-900 text-slate-400 group-hover:text-teal-500"
                                        }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h2 className={`text-xl font-black transition-colors ${
                                                openLevel === level.name ? "text-slate-900" : "text-slate-600"
                                            }`}>
                                                {level.name}
                                            </h2>
                                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                                                {level.courses.length} modules
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-2xl transition-transform duration-300 ${openLevel === level.name ? "rotate-180" : ""}`}>
                                        expand_more
                                    </span>
                                </button>

                                {openLevel === level.name && (
                                    <div className="px-8 pb-8 space-y-3">
                                        {level.courses.map((course) => {
                                            const courseUrl = `/lessons/${theme.toLowerCase()}/course/${course.id}`;
                                            const isGame = course.type === 'jeu';

                                            return (
                                                <Link
                                                    key={course.id}
                                                    to={courseUrl}
                                                    className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all group/item"
                                                >
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 text-xl ${
                                                        isGame ? "bg-amber-100" : "bg-sky-100"
                                                    }`}>
                                                        {isGame ? "🎮" : "📘"}
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-bold text-slate-700 group-hover/item:text-teal-700">
                                                            {course.title}
                                                        </span>
                                                        <p className="text-xs text-slate-400 font-semibold uppercase">
                                                            {isGame ? 'Challenge interactif' : 'Leçon théorique'}
                                                        </p>
                                                    </div>
                                                    <div className="opacity-0 group-hover/item:opacity-100 transition-opacity text-teal-500 font-bold text-sm">
                                                        Démarrer →
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}