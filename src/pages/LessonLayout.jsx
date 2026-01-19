import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useUser } from '../context/UserContext';

export default function LessonLayout({ children, lessonId, title, theme, pointsReward = 20 }) {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [isFinished, setIsFinished] = useState(false);

    // Barre de progression de lecture en haut de page
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Vérifier si déjà complétée au chargement
    useEffect(() => {
        if (user?.completedLessons?.includes(lessonId)) {
            setIsFinished(true);
        }
        window.scrollTo(0, 0);
    }, [user, lessonId]);

    const handleComplete = () => {
        if (!user) {
            alert("Connecte-toi pour sauvegarder tes progrès !");
            return;
        }

        if (!isFinished) {
            const updatedUser = {
                ...user,
                points: (user.points || 0) + pointsReward,
                completedLessons: [...(user.completedLessons || []), lessonId]
            };

            setUser(updatedUser);
            localStorage.setItem('algo_user', JSON.stringify(updatedUser));
            setIsFinished(true);

            // Explosion de succès
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#2dd4bf', '#3b82f6', '#f59e0b']
            });
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
            {/* Barre de progression de lecture */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-teal-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Header de la leçon */}
            <nav className="sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 z-40">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to={`/lessons/${theme.toLowerCase()}`} className="flex items-center gap-2 text-slate-500 hover:text-teal-500 transition-colors font-bold text-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                        Retour
                    </Link>
                    <div className="text-center hidden md:block">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{theme}</span>
                        <h2 className="text-sm font-black dark:text-white truncate max-w-[200px]">{title}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-full">+{pointsReward} XP</span>
                    </div>
                </div>
            </nav>

            {/* Contenu de la leçon */}
            <main className="max-w-3xl mx-auto px-6 py-12 pb-32">
                <article className="prose prose-slate dark:prose-invert max-w-none
                    prose-headings:font-black prose-headings:tracking-tight
                    prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:text-lg prose-p:leading-relaxed
                    prose-strong:text-slate-900 dark:prose-strong:text-white
                    prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:p-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                    {children}
                </article>

                {/* Zone de validation */}
                <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
                    <h3 className="text-2xl font-black dark:text-white mb-6">Prêt à valider ?</h3>
                    <button
                        onClick={handleComplete}
                        disabled={isFinished}
                        className={`group relative inline-flex items-center gap-3 px-12 py-5 rounded-[2rem] font-black text-lg transition-all shadow-2xl ${
                            isFinished
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default"
                                : "bg-teal-500 text-white hover:bg-teal-600 hover:scale-105 active:scale-95 shadow-teal-500/25"
                        }`}
                    >
                        {isFinished ? (
                            <>Leçon terminée <span className="text-xl">✓</span></>
                        ) : (
                            <>Marquer comme terminé <span className="group-hover:translate-x-1 transition-transform">→</span></>
                        )}
                    </button>
                    {isFinished && (
                        <p className="mt-4 text-slate-400 font-medium animate-bounce">
                            Bravo ! Tu as gagné {pointsReward} XP.
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}