import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion } from 'framer-motion';

export default function GitPush() {
    const [isPushing, setIsPushing] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const startPush = () => {
        setIsPushing(true);
        setTimeout(() => {
            setIsPushing(false);
            setIsDone(true);
        }, 2000);
    };

    return (
        <LessonLayout theme="Git" title="GitHub : Envoyer son code" lessonId="git_03">
            <div className="space-y-10 py-4">
                {/* 1. ANALOGIE : LE CLOUD */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">GitHub : Ton Coffre-Fort ☁️</h2>
                        <p className="text-slate-400 text-lg leading-relaxed font-medium">
                            Si ton ordinateur brûle, ton code est perdu... sauf si tu l'as <strong>"Pushé"</strong> sur GitHub. GitHub est un site web qui héberge tes dépôts Git sur internet.
                        </p>
                    </div>
                    <div className="absolute -right-10 -top-10 text-9xl opacity-10">☁️</div>
                </section>

                {/* 2. ANIMATION DU PUSH */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[2.5rem] text-center">
                    <div className="flex flex-col md:flex-row items-center justify-around gap-8 mb-10">
                        {/* TON PC */}
                        <div className="flex flex-col items-center">
                            <div className="text-5xl mb-2">💻</div>
                            <span className="text-xs font-black uppercase text-slate-400 italic">Ton Ordinateur</span>
                        </div>

                        {/* LE CHEMIN / L'ANIMATION */}
                        <div className="flex-1 w-full max-w-xs h-2 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
                            {isPushing && (
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="absolute inset-0 bg-orange-500 w-1/2 rounded-full"
                                />
                            )}
                        </div>

                        {/* GITHUB */}
                        <div className="flex flex-col items-center">
                            <div className={`text-5xl mb-2 transition-transform duration-500 ${isDone ? 'scale-125' : 'opacity-30 grayscale'}`}>
                                {isDone ? '✅' : '☁️'}
                            </div>
                            <span className="text-xs font-black uppercase text-slate-400 italic">GitHub</span>
                        </div>
                    </div>

                    {!isDone ? (
                        <button
                            onClick={startPush}
                            disabled={isPushing}
                            className={`px-10 py-5 rounded-2xl font-black text-white shadow-lg transition-all ${isPushing ? 'bg-slate-400' : 'bg-orange-600 hover:bg-orange-700 active:scale-95'}`}
                        >
                            {isPushing ? "TRANSMISSION EN COURS..." : "GIT PUSH ORIGIN MAIN"}
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-emerald-500 font-black italic uppercase">🚀 Mission Réussie ! Ton code est en ligne.</p>
                            <button onClick={() => setIsDone(false)} className="text-xs text-slate-400 underline">Réinitialiser le serveur</button>
                        </div>
                    )}
                </section>

                {/* 3. LES 3 COMMANDES ULTIMES */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700">
                        <code className="text-orange-600 font-black block mb-2">git add .</code>
                        <p className="text-xs text-slate-500 italic font-medium">Je prépare TOUS mes changements.</p>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700">
                        <code className="text-orange-600 font-black block mb-2">git commit -m "..."</code>
                        <p className="text-xs text-slate-500 italic font-medium">Je crée ma sauvegarde locale.</p>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700">
                        <code className="text-orange-600 font-black block mb-2">git push</code>
                        <p className="text-xs text-slate-500 italic font-medium">J'envoie tout sur GitHub !</p>
                    </div>
                </section>
            </div>
        </LessonLayout>
    );
}