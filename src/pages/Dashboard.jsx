import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useUser } from '../context/UserContext';

export default function Dashboard() {
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [demoScore, setDemoScore] = useState(0);
    const [showDemo, setShowDemo] = useState(false);
    const [demoStep, setDemoStep] = useState(0);

    // --- CONFIGURATION RÉELLE DU CATALOGUE ---
    const themes = [
        { id: "algo", name: "Algorithme", icon: "🧩", color: "from-blue-400 to-indigo-500", totalLessons: 10 },
        { id: "git", name: "Git", icon: "🌿", color: "from-teal-400 to-emerald-500", totalLessons: 8 },
        { id: "http", name: "HTTP", icon: "🌐", color: "from-orange-400 to-red-500", totalLessons: 6 },
        { id: "java", name: "Java", icon: "☕", color: "from-red-500 to-rose-600", totalLessons: 12 },
        { id: "spring", name: "Spring", icon: "🍃", color: "from-green-400 to-teal-600", totalLessons: 15 },
        { id: "security", name: "Sécurité", icon: "🛡️", color: "from-slate-500 to-slate-700", totalLessons: 5 },
        { id: "HTML", name: "HTML", icon: "🏗️", color: "from-orange-500 to-red-600", totalLessons: 5 }    ];

    const badges = [
        { id: "b1", name: "Algorithme", icon: "🧩" },
        { id: "b2", name: "Débutant Git", icon: "🌿" },
        { id: "b3", name: "HTTP Explorer", icon: "🌐" },
        { id: "b4", name: "Ninja Java", icon: "☕" },
        { id: "b5", name: "HTML", icon: "🏗️" },
    ];

    const demoQuestions = [
        { q: "En algorithmie, que signifie 'LIFO' ?", a: "Last In, First Out", options: ["Long In, Fast Out", "Last In, First Out", "Loop In, Flow Out"] },
        { q: "Quel symbole utilise-t-on pour un commentaire en Java ?", a: "//", options: ["#", "--", "//"] }
    ];

    // --- LOGIQUE DE CALCUL DE PROGRESSION RÉELLE ---
    const getRealProgress = (courseId, total) => {
        if (!user || !user.completedLessons) return 0;
        // On compte les leçons qui commencent par l'ID du cours (ex: "algo_1")
        const completed = user.completedLessons.filter(l => l.startsWith(courseId)).length;
        return Math.round((completed / total) * 100);
    };

    const points = user?.points || 0;
    const level = user?.level || 0;
    const nextLevelProgress = points % 100;

    const filteredThemes = themes.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAnswer = (choice) => {
        if (choice === demoQuestions[demoStep].a) {
            const newScore = demoScore + 50;
            setDemoScore(newScore);
            localStorage.setItem('temp_demo_score', newScore);
            confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: ['#6366f1', '#a855f7'] });
        }
        setDemoStep(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                            {user ? <>Salut, <span className="text-teal-500">{user.username} !</span> 👋</> : <>Prêt à <span className="text-indigo-500">apprendre ?</span> 🚀</>}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
                            {user ? "Ton aventure continue là où tu l'as laissée." : "Connecte-toi pour transformer ton score en récompenses réelles."}
                        </p>
                    </motion.div>

                    {user && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-6 min-w-[320px]">
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-teal-500/20">{level}</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Niveau {level}</span>
                                    <span className="text-sm font-black text-teal-500">{nextLevelProgress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${nextLevelProgress}%` }}
                                        className="bg-teal-500 h-full rounded-full"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </header>

                {/* --- SECTION MODE DÉMO --- */}
                {!user && (
                    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                {!showDemo ? (
                                    <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="text-center md:text-left">
                                            <h2 className="text-3xl font-black mb-2">Petit Quiz Express ? 🧠</h2>
                                            <p className="text-indigo-100 font-medium">Gagne tes premiers points de démo en 30 secondes.</p>
                                        </div>
                                        <button onClick={() => setShowDemo(true)} className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl active:scale-95">Lancer la démo</button>
                                    </motion.div>
                                ) : demoStep < demoQuestions.length ? (
                                    <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-2xl font-bold">{demoQuestions[demoStep].q}</h3>
                                            <span className="text-amber-400 font-black">Score: {demoScore}</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {demoQuestions[demoStep].options.map(opt => (
                                                <button key={opt} onClick={() => handleAnswer(opt)} className="bg-white/10 hover:bg-white/20 border border-white/20 p-5 rounded-2xl font-bold transition-all text-center">
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
                                        <h3 className="text-4xl font-black italic">Excellent ! 🎉</h3>
                                        <p className="text-xl">Tu as {demoScore} XP prêts à être ajoutés à ton futur compte.</p>
                                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                                            <Link to="/signup" className="bg-amber-400 text-slate-900 px-10 py-4 rounded-2xl font-black hover:bg-amber-300 transition-all">Sauvegarder et S'inscrire</Link>
                                            <button onClick={() => {setShowDemo(false); setDemoStep(0); setDemoScore(0)}} className="text-white/60 font-bold hover:text-white">Réessayer</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-white/20 transition-all duration-700" />
                    </motion.div>
                )}

                {/* --- BARRE DE RECHERCHE --- */}
                <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl group-focus-within:scale-110 transition-transform">🔍</div>
                    <input
                        type="text"
                        placeholder="Rechercher un module (Java, Git, Algorithme...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-16 pr-6 py-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 outline-none focus:ring-4 focus:ring-teal-500/10 dark:text-white font-bold transition-all text-lg placeholder:text-slate-400"
                    />
                </div>

                {/* --- GRILLE DES THÈMES ET BADGES --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6 ml-2">Tes Parcours</h2>
                        <motion.div layout className="grid gap-6 sm:grid-cols-2">
                            <AnimatePresence>
                                {filteredThemes.map((theme) => {
                                    const progress = getRealProgress(theme.id, theme.totalLessons);
                                    return (
                                        <motion.div key={theme.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <Link to={`/lessons/${theme.id}`} className="group block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                                <div className="flex justify-between items-start mb-6">
                                                    <span className="text-5xl group-hover:scale-110 transition-transform block">{theme.icon}</span>
                                                    <span className="bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                                        {theme.totalLessons} Leçons
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4">{theme.name}</h3>

                                                {user ? (
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between text-xs font-bold text-slate-400">
                                                            <span>Progression</span>
                                                            <span className="text-teal-500">{progress}%</span>
                                                        </div>
                                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${progress}%` }}
                                                                className={`h-full bg-gradient-to-r ${theme.color} rounded-full`}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-slate-400 text-sm font-medium italic">Connecte-toi pour voir ta progression</p>
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* --- SIDEBAR BADGES --- */}
                    <aside className="space-y-6">
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6 ml-2">Succès</h2>
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
                            <div className="grid grid-cols-2 gap-4">
                                {badges.map((badge) => {
                                    // Simulation d'un badge débloqué si le cours lié est à 100%
                                    const isUnlocked = user && user.completedBadges?.includes(badge.id);
                                    return (
                                        <div key={badge.id} className={`p-5 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all ${isUnlocked ? "bg-teal-50/50 dark:bg-teal-500/5 border-teal-100 dark:border-teal-900/50" : "opacity-20 grayscale border-slate-50 dark:border-slate-800"}`}>
                                            <span className="text-4xl">{isUnlocked ? badge.icon : "🔒"}</span>
                                            <span className="text-[10px] font-black text-center uppercase leading-tight dark:text-slate-300">{badge.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            {!user && (
                                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Connecte-toi pour débloquer</p>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

            </div>
        </div>
    );
}