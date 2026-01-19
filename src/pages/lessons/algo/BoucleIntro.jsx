import React, { useState, useEffect } from 'react';
import LessonLayout from '../../LessonLayout';
import { CodeBlock } from '../../CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

export default function BoucleIntro() {
    const [reps, setReps] = useState(0);
    const [isTraining, setIsTraining] = useState(false);
    const [displayReps, setDisplayReps] = useState(0);
    const [shake, setShake] = useState(false);
    const [gameChoice, setGameChoice] = useState(null);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const startLoop = () => {
        if (reps <= 0) { triggerShake(); return; }
        setIsTraining(true);
        setDisplayReps(0);
        let count = 0;
        const interval = setInterval(() => {
            count++;
            setDisplayReps(count);
            if (count >= reps) { clearInterval(interval); setIsTraining(false); }
        }, 400);
    };

    return (
        <LessonLayout theme="Algorithme" title="Maîtriser les Boucles" lessonId="algorithme_3">
            <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} className="space-y-12 py-4">

                {/* 1. SIMULATEUR VISUEL */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border-2 border-orange-500/10">
                    <h3 className="text-2xl font-black mb-6 text-center">🤖 Robot Trainer v2.0</h3>
                    <div className="flex flex-col items-center gap-6">
                        <motion.div animate={isTraining ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}} className="text-8xl">🤖</motion.div>
                        <div className="text-5xl font-black text-orange-500 tabular-nums">{displayReps}</div>
                        <input type="number" value={reps} onChange={(e) => setReps(Number(e.target.value))} className="w-32 p-4 text-center text-2xl font-black rounded-2xl bg-slate-100 dark:bg-slate-800" />
                        <button onClick={startLoop} disabled={isTraining} className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl text-white font-black transition-all">LANCER LA BOUCLE</button>
                    </div>
                </section>

                {/* 2. LE JEU DE LOGIQUE (NOUVEAU) */}
                <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
                    <h3 className="text-xl font-black mb-4 text-orange-400">🎮 Mini-Jeu : Le Prédicteur</h3>
                    <p className="mb-6 text-slate-300">Si j'exécute ce code, quel sera le <b>dernier nombre</b> affiché ?</p>
                    <CodeBlock language="javascript" code={`for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`} />
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {[4, 5, 6].map(num => (
                            <button key={num} onClick={() => setGameChoice(num)} className={`p-4 rounded-xl font-black border-2 transition-all ${gameChoice === num ? (num === 5 ? 'border-emerald-500 bg-emerald-500/20' : 'border-rose-500 bg-rose-500/20') : 'border-slate-700 bg-slate-800'}`}>
                                {num}
                            </button>
                        ))}
                    </div>
                    {gameChoice && (
                        <p className="mt-4 text-center font-bold">{gameChoice === 5 ? "✅ Correct ! La boucle s'arrête exactement à 5." : "❌ Faux ! Regarde bien la condition i <= 5."}</p>
                    )}
                </section>
            </motion.div>
        </LessonLayout>
    );
}