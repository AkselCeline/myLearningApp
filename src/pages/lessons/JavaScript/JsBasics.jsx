import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function JsBasics() {
    const [headingText, setHeadingText] = useState("Bonjour !");
    const [codeOutput, setCodeOutput] = useState("");

    const runJs = () => {
        setHeadingText("🚀 JavaScript est là !");
        setCodeOutput("document.querySelector('h1').innerText = '🚀 JavaScript est là !';");
    };

    return (
        <LessonLayout
            theme="JavaScript"
            title="JS : Prendre le contrôle"
            lessonId="js_11"
        >
            <div className="space-y-12 py-4">
                {/* 1. ANALOGIE DU CERVEAU */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Le Cerveau du Web 🧠</h2>
                        <p className="text-amber-900 text-lg leading-relaxed font-medium">
                            JavaScript permet de rendre ta page <strong>vivante</strong>. Au lieu d'avoir un texte figé, tu peux le changer dynamiquement selon les actions de l'utilisateur.
                        </p>
                    </div>
                    <span className="absolute -right-4 -bottom-4 text-9xl opacity-20 rotate-12 font-black">JS</span>
                </section>

                {/* 2. DÉMONSTRATION INTERACTIVE */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm text-center">
                    <h3 className="text-xl font-black mb-8 dark:text-white uppercase tracking-widest italic">Le Pouvoir du Click</h3>

                    <div className="mb-10 p-10 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                        <motion.h1
                            key={headingText}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl font-black text-indigo-600 dark:text-indigo-400"
                        >
                            {headingText}
                        </motion.h1>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <button
                            onClick={runJs}
                            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-10 py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95"
                        >
                            EXÉCUTER LE CODE JS
                        </button>

                        <AnimatePresence>
                            {codeOutput && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full max-w-lg bg-slate-900 p-4 rounded-xl text-left border-l-4 border-yellow-400"
                                >
                                    <p className="text-slate-500 text-xs font-black mb-2 uppercase tracking-tighter italic">// Ce qui vient de se passer :</p>
                                    <code className="text-yellow-400 font-mono text-sm">{codeOutput}</code>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* 3. EXPLICATION TECHNIQUE */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-xl font-black dark:text-white underline decoration-yellow-400">1. Cibler</h4>
                        <p className="text-slate-500 font-medium italic">
                            On utilise <code>document.querySelector()</code> pour dire à JS quel élément on veut modifier (comme un lasso).
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-black dark:text-white underline decoration-yellow-400">2. Agir</h4>
                        <p className="text-slate-500 font-medium italic">
                            On utilise <code>.innerText</code> ou <code>.style</code> pour changer le contenu ou l'apparence.
                        </p>
                    </div>
                </section>
            </div>
        </LessonLayout>
    );
}