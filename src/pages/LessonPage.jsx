import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import lessonsData from '../data/lessonsData';
import { useUser } from '../context/UserContext';

export default function LessonPage() {
    const { theme } = useParams();
    const { user } = useUser();

    // Mapping pour l'URL -> Clé du JSON
    const themeMap = {
        "algo": "algorithme",
        "java": "java",
        "git": "git",
        "HTML": "html"
    };

    const dataKey = themeMap[theme.toLowerCase()] || theme.toLowerCase();
    const themeData = lessonsData[dataKey];
    const [openLevel, setOpenLevel] = useState(null);

    if (!themeData) return <div className="p-20 text-center font-black dark:text-white">Parcours en cours de création... 🛠️</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10">
                    <Link to="/dashboard" className="text-teal-600 dark:text-teal-400 font-bold text-sm mb-2 block hover:-translate-x-1 transition-transform">
                        ← Retour au Dashboard
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tighter">
                        {themeData.theme}
                    </h1>
                </header>

                <div className="space-y-6 relative">
                    <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

                    {themeData.levels.map((level, index) => (
                        <div key={level.name} className="relative">
                            <div className="absolute left-8 top-8 w-4 h-4 bg-teal-500 rounded-full -translate-x-1/2 border-4 border-white dark:border-slate-950 hidden md:block z-10"></div>

                            <div className={`transition-all duration-500 rounded-[2.5rem] overflow-hidden ${
                                openLevel === level.name ? "bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-100 dark:ring-slate-800" : "bg-white/40 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800"
                            }`}>
                                <button onClick={() => setOpenLevel(openLevel === level.name ? null : level.name)} className="w-full flex items-center justify-between px-8 py-7 text-left group">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-all ${openLevel === level.name ? "bg-teal-500 text-white scale-110" : "bg-white dark:bg-slate-800 text-slate-400"}`}>{index + 1}</div>
                                        <div>
                                            <h2 className={`text-xl font-black ${openLevel === level.name ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>{level.name}</h2>
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{level.courses.length} modules</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform ${openLevel === level.name ? "rotate-180 text-teal-500" : "text-slate-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                                </button>

                                <AnimatePresence>
                                    {openLevel === level.name && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 space-y-3">
                                            {level.courses.map((course) => {
                                                // ID UNIQUE : algorithme_1
                                                const uniqueId = `${dataKey}_${course.id}`;
                                                const isCompleted = user?.completedLessons?.includes(uniqueId);

                                                return (
                                                    <Link key={course.id} to={`/lessons/${theme.toLowerCase()}/course/${course.id}`} className={`flex items-center p-4 rounded-2xl border transition-all ${isCompleted ? "bg-teal-50/30 dark:bg-teal-500/5 border-teal-200 dark:border-teal-900/50" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-teal-500"}`}>
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 text-2xl ${isCompleted ? "bg-teal-500 text-white" : "bg-white dark:bg-slate-800 shadow-sm"}`}>
                                                            {isCompleted ? "✓" : (course.type === 'jeu' ? "🎮" : "📘")}
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className={`font-bold block ${isCompleted ? "text-teal-700 dark:text-teal-400" : "text-slate-700 dark:text-slate-200"}`}>{course.title}</span>
                                                            <span className="text-[10px] font-black uppercase opacity-50 dark:text-white">{isCompleted ? "Terminé" : (course.type === 'jeu' ? "Défi" : "Leçon")}</span>
                                                        </div>
                                                        <div className="text-teal-500 font-black text-xs uppercase">{isCompleted ? "Revoir" : "Démarrer →"}</div>
                                                    </Link>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}