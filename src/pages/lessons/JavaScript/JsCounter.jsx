import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function JsCounter() {
    const [count, setCount] = useState(0);

    // Fonction pour augmenter avec un petit effet de rebond
    const increment = () => setCount(count + 1);

    // Fonction pour diminuer (en évitant d'aller sous 0 pour la logique)
    const decrement = () => {
        if (count > 0) setCount(count - 1);
    };

    const reset = () => setCount(0);

    return (
        <LessonLayout
            theme="JavaScript"
            title="Projet : Le Compteur Intelligent"
            lessonId="js_14"
        >
            <div className="space-y-12 py-4">
                {/* 1. RÉSUMÉ DU PROJET */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-yellow-400 to-orange-500 text-slate-900 shadow-xl">
                    <h2 className="text-2xl font-black mb-2 uppercase italic">Mission : Gérer la donnée 📊</h2>
                    <p className="font-medium opacity-90">
                        Dans ce projet, on utilise JavaScript pour stocker un nombre dans une <strong>variable</strong> et le mettre à jour dès qu'on clique sur un bouton. C'est la base de tous les paniers d'achat sur le web !
                    </p>
                </section>

                {/* 2. L'INTERFACE DU COMPTEUR */}
                <section className="flex justify-center">
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border-b-[12px] border-slate-200 dark:border-slate-800 w-full max-w-md text-center">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Score Actuel</h3>

                        {/* Affichage du chiffre avec animation */}
                        <div className="relative mb-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={count}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className={`text-9xl font-black ${count > 0 ? 'text-orange-500' : 'text-slate-300 dark:text-slate-700'}`}
                                >
                                    {count}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Boutons de contrôle */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={decrement}
                                className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-3xl font-black hover:bg-rose-100 hover:text-rose-500 transition-all active:scale-90"
                            >
                                -
                            </button>

                            <button
                                onClick={reset}
                                className="flex-1 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                            >
                                Reset
                            </button>

                            <button
                                onClick={increment}
                                className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center text-4xl font-black shadow-lg shadow-yellow-400/30 hover:bg-yellow-500 transition-all active:scale-90"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </section>

                {/* 3. L'EXPLICATION DU CODE */}
                <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <h4 className="text-yellow-400 font-mono text-sm mb-4">// La logique en arrière-plan :</h4>
                        <div className="space-y-3 font-mono text-sm">
                            <p className="text-slate-400"><span className="text-pink-500">let</span> compteur = <span className="text-orange-400">{count}</span>;</p>
                            <p className="text-blue-400">function <span className="text-yellow-400">ajouter</span>() {"{"}</p>
                            <p className="ml-6 border-l-2 border-slate-700 pl-4">compteur = compteur + 1;</p>
                            <p className="ml-6 border-l-2 border-slate-700 pl-4">ecran.innerText = compteur;</p>
                            <p className="text-blue-400">{"}"}</p>
                        </div>
                    </div>
                    {/* Déco */}
                    <div className="absolute top-0 right-0 p-8 text-6xl opacity-10 select-none">⚙️</div>
                </section>
            </div>
        </LessonLayout>
    );
}