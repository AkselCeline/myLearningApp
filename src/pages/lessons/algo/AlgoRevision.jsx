import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function AlgoRevision() {
    const [step, setStep] = useState(0); // 0: Start, 1-5: Levels, 6: Final
    const [score, setScore] = useState(0);
    const [shake, setShake] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const nextStep = () => {
        setStep(s => s + 1);
        setSelected(null);
        setIsCorrect(null);
    };

    const validate = (choice, correct) => {
        setSelected(choice);
        if (choice === correct) {
            setIsCorrect(true);
            setScore(s => s + 1);
        } else {
            setIsCorrect(false);
            triggerShake();
        }
    };

    return (
        <LessonLayout theme="Algorithme" title="🏆 Le Donjon de l'Algorithme" lessonId="algorithme_7">
            <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} className="max-w-3xl mx-auto py-8">

                {/* HUD : Score et Progression */}
                {step > 0 && step < 6 && (
                    <div className="flex justify-between items-center mb-8 bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
                        <span className="font-black text-slate-500 uppercase text-xs tracking-widest">Niveau {step} / 5</span>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`w-3 h-3 rounded-full ${step >= i ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                            ))}
                        </div>
                        <span className="font-black text-indigo-500">SCORE: {score * 100}</span>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {/* --- ÉCRAN 0 : INTRODUCTION --- */}
                    {step === 0 && (
                        <motion.div key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
                            <div className="text-9xl mb-4">🏰</div>
                            <h2 className="text-4xl font-black dark:text-white uppercase italic">Le Grand Examen</h2>
                            <p className="text-slate-500 max-w-md mx-auto">Tu vas traverser 5 salles. Chaque erreur te fera perdre des points. Seuls les vrais codeurs arrivent au bout.</p>
                            <button onClick={nextStep} className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/30">
                                ENTRER DANS LE DONJON
                            </button>
                        </motion.div>
                    )}

                    {/* --- ÉPREUVE 1 : VARIABLES & CALCULS --- */}
                    {step === 1 && (
                        <motion.div key="1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                            <div className="bg-slate-900 p-6 rounded-3xl border-4 border-slate-800">
                                <h3 className="text-amber-400 font-black mb-4 uppercase italic">Calcul de Variable</h3>
                                <code className="block text-indigo-300 text-lg leading-relaxed">
                                    let x = 10;<br/>
                                    x = x + 5;<br/>
                                    x = x * 2;
                                </code>
                            </div>
                            <p className="font-bold text-center dark:text-white text-xl">Quelle est la valeur finale de x ?</p>
                            <div className="grid grid-cols-2 gap-4">
                                {[15, 20, 25, 30].map(val => (
                                    <button
                                        key={val} disabled={selected !== null}
                                        onClick={() => validate(val, 30)}
                                        className={`p-6 rounded-2xl font-black border-2 transition-all ${selected === val ? (val === 30 ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-rose-500 border-rose-400 text-white') : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white hover:border-indigo-500'}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- ÉPREUVE 2 : LES CONDITIONS --- */}
                    {step === 2 && (
                        <motion.div key="2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                            <div className="bg-slate-900 p-6 rounded-3xl border-4 border-slate-800">
                                <h3 className="text-amber-400 font-black mb-4 uppercase italic">Porte Logique</h3>
                                <code className="block text-indigo-300 text-lg">
                                    let age = 16;<br/>
                                    let permis = false;<br/><br/>
                                    SI (age >= 18 OU permis == vrai) {"{"}<br/>
                                    &nbsp;&nbsp;Afficher("OK");<br/>
                                    {"}"} SINON {"{"}<br/>
                                    &nbsp;&nbsp;Afficher("STOP");<br/>
                                    {"}"}
                                </code>
                            </div>
                            <p className="font-bold text-center dark:text-white text-xl">Qu'affiche ce code ?</p>
                            <div className="grid grid-cols-2 gap-4">
                                {["OK", "STOP", "ERREUR", "RIEN"].map(choice => (
                                    <button key={choice} disabled={selected !== null} onClick={() => validate(choice, "STOP")} className={`p-6 rounded-2xl font-black border-2 transition-all ${selected === choice ? (choice === "STOP" ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-rose-500 border-rose-400 text-white') : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white hover:border-indigo-500'}`}>
                                        {choice}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- ÉPREUVE 3 : LES TABLEAUX --- */}
                    {step === 3 && (
                        <motion.div key="3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                            <div className="bg-slate-900 p-6 rounded-3xl border-4 border-slate-800">
                                <h3 className="text-amber-400 font-black mb-4 uppercase italic">L'Index Secret</h3>
                                <code className="block text-indigo-300 text-lg">
                                    let fruits = ["🍎", "🍐", "🍓", "🍌"];<br/>
                                    Afficher(fruits[2]);
                                </code>
                            </div>
                            <p className="font-bold text-center dark:text-white text-xl">Quel fruit sera affiché ?</p>
                            <div className="grid grid-cols-2 gap-4">
                                {["🍎", "🍐", "🍓", "🍌"].map(f => (
                                    <button key={f} disabled={selected !== null} onClick={() => validate(f, "🍓")} className={`p-8 text-4xl rounded-2xl border-2 transition-all ${selected === f ? (f === "🍓" ? 'bg-emerald-500 border-emerald-400' : 'bg-rose-500 border-rose-400') : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- ÉPREUVE 4 : LES BOUCLES --- */}
                    {step === 4 && (
                        <motion.div key="4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                            <div className="bg-slate-900 p-6 rounded-3xl border-4 border-slate-800 text-indigo-300 font-mono text-lg">
                                let count = 0;<br/>
                                for (let i = 0; i &lt; 4; i++) {"{"}<br/>
                                &nbsp;&nbsp;count = count + 1;<br/>
                                {"}"}
                            </div>
                            <p className="font-bold text-center dark:text-white text-xl">Combien vaut 'count' à la fin ?</p>
                            <div className="grid grid-cols-4 gap-4">
                                {[0, 3, 4, 5].map(n => (
                                    <button key={n} disabled={selected !== null} onClick={() => validate(n, 4)} className={`p-4 text-2xl font-black rounded-2xl border-2 transition-all ${selected === n ? (n === 4 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white') : 'bg-white dark:bg-slate-800 dark:text-white'}`}>
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- ÉPREUVE 5 : LES FONCTIONS --- */}
                    {step === 5 && (
                        <motion.div key="5" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                            <div className="bg-slate-900 p-6 rounded-3xl border-4 border-slate-800 text-indigo-300 font-mono">
                                function doubler(n) {"{"}<br/>
                                &nbsp;&nbsp;return n * 2;<br/>
                                {"}"}<br/><br/>
                                let resultat = doubler(5);
                            </div>
                            <p className="font-bold text-center dark:text-white text-xl">Que contient la variable 'resultat' ?</p>
                            <div className="grid grid-cols-2 gap-4">
                                {[5, 10, "n * 2", "doubler"].map(res => (
                                    <button key={res} disabled={selected !== null} onClick={() => validate(res, 10)} className={`p-4 font-black rounded-2xl border-2 transition-all ${selected === res ? (res === 10 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white') : 'bg-white dark:bg-slate-800 dark:text-white'}`}>
                                        {res}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- ÉCRAN FINAL --- */}
                    {step === 6 && (
                        <motion.div key="6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-8 p-12 bg-indigo-600 rounded-[3rem] text-white shadow-2xl shadow-indigo-500/50">
                            <h2 className="text-5xl font-black italic">BILAN DU DONJON</h2>
                            <div className="text-8xl font-black py-6 bg-white/10 rounded-full w-48 h-48 flex items-center justify-center mx-auto border-4 border-white/30">
                                {score}/5
                            </div>
                            <div className="space-y-4">
                                <p className="text-2xl font-bold">
                                    {score === 5 ? "👑 LEGENDAIRE : Tu maîtrises l'algo !" : score >= 3 ? "⚔️ GUERRIER : Tu as de bonnes bases." : "💀 REPRIS DE JUSTICE : Relis bien les cours !"}
                                </p>
                                <p className="opacity-80">Score Final : {score * 100} Points</p>
                            </div>
                            <button onClick={() => window.location.href = '/dashboard'} className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all">
                                QUITTER LE DONJON
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bouton de progression (n'apparaît que si on a répondu) */}
                {selected !== null && step < 6 && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        onClick={nextStep}
                        className="w-full mt-10 p-5 bg-slate-800 text-white rounded-2xl font-black flex justify-between items-center hover:bg-black transition-all"
                    >
                        <span>ALLER À LA SALLE SUIVANTE</span>
                        <span>➔</span>
                    </motion.button>
                )}
            </motion.div>
        </LessonLayout>
    );
}