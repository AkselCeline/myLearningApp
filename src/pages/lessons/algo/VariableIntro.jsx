import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { CodeBlock } from '../../CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

export default function VariableIntro() {
    // États pour nos variables
    const [heroName, setHeroName] = useState("Lien");
    const [hp, setHp] = useState(100);
    const [weapon, setWeapon] = useState("Épée de bois");

    // États pour le Quiz et les animations
    const [quizFeedback, setQuizFeedback] = useState(null);
    const [shake, setShake] = useState(false);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const handleQuizClick = (choice) => {
        if (choice === 'camelCase') {
            setQuizFeedback('success');
        } else {
            setQuizFeedback('error');
            triggerShake();
        }
    };

    return (
        <LessonLayout
            theme="Algorithme"
            title="Les Variables : Le stockage de données"
            lessonId="algorithme_4"
        >
            <motion.div
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                className="space-y-12 py-4"
            >
                {/* 1. SECTION VISUELLE : L'INVENTAIRE */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
                    <h3 className="text-xl font-black mb-8 text-center dark:text-white uppercase tracking-widest">
                        💾 Ton Inventaire en Temps Réel
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Carte d'affichage (Le résultat) */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-[2.5rem] border-2 border-blue-500/20 shadow-xl">
                            <div className="text-center space-y-4">
                                <div className="text-7xl mb-4">🛡️</div>
                                <h4 className="text-3xl font-black text-blue-600 uppercase tracking-tighter">{heroName}</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-black text-slate-400">
                                        <span>POINTS DE VIE (HP)</span>
                                        <span className={hp < 20 ? "text-rose-500 animate-pulse" : ""}>{hp}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-300 dark:border-slate-600">
                                        <motion.div
                                            animate={{ width: `${hp}%` }}
                                            className={`h-full ${hp > 50 ? 'bg-emerald-500' : hp > 20 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <p className="text-sm font-black text-slate-400 uppercase">Arme Actuelle</p>
                                    <p className="text-xl font-bold text-slate-800 dark:text-white">{weapon}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contrôles (Modification des variables) */}
                        <div className="space-y-6">
                            <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                                <label className="block text-xs font-black text-blue-500 uppercase mb-2">Modifier le nom (String)</label>
                                <input
                                    type="text" value={heroName} onChange={(e) => setHeroName(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500 transition-all font-bold"
                                />
                            </div>
                            <div className="p-4 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                                <label className="block text-xs font-black text-rose-500 uppercase mb-2">Modifier les PV (Number)</label>
                                <input
                                    type="range" min="0" max="100" value={hp} onChange={(e) => setHp(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. EXPLICATION CODE */}
                <section>
                    <CodeBlock language="javascript" code={`let nomHeros = "${heroName}"; // Type: String\nlet pointsDeVie = ${hp}; // Type: Number\nlet estVivant = ${hp > 0}; // Type: Boolean`} />
                </section>

                {/* 3. QUIZ FLASH SANS CONSOLE */}
                <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl border-4 border-slate-800">
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <span className="bg-blue-500 text-xs p-2 rounded-lg">DÉFI</span>
                        Comment nommer cette boîte ?
                    </h3>
                    <p className="text-slate-400 mb-6 font-medium">Pour stocker "le score du joueur", quelle est la meilleure écriture ?</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onClick={() => handleQuizClick('snake')} className="p-4 rounded-xl bg-slate-800 border-2 border-slate-700 hover:border-blue-500 transition-all font-mono">score_du_joueur</button>
                        <button onClick={() => handleQuizClick('camelCase')} className="p-4 rounded-xl bg-slate-800 border-2 border-slate-700 hover:border-emerald-500 transition-all font-mono text-emerald-400">scoreDuJoueur</button>
                        <button onClick={() => handleQuizClick('upper')} className="p-4 rounded-xl bg-slate-800 border-2 border-slate-700 hover:border-blue-500 transition-all font-mono">SCOREDUJOUEUR</button>
                    </div>

                    <AnimatePresence>
                        {quizFeedback && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`mt-6 p-6 rounded-2xl text-center font-bold border-2 ${
                                    quizFeedback === 'success'
                                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                                        : "bg-rose-500/10 border-rose-500 text-rose-400"
                                }`}
                            >
                                {quizFeedback === 'success'
                                    ? "🌟 Parfait ! C'est le CamelCase. C'est la norme en JavaScript."
                                    : "❌ Pas tout à fait. On évite les tirets bas ou les majuscules partout en JS."}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </motion.div>
        </LessonLayout>
    );
}