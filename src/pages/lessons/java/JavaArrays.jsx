import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function JavaArrays() {
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const fruits = ["Pomme", "Banane", "Orange", "Fraise"];

    return (
        <LessonLayout theme="Java" title="Les Tableaux en Java" lessonId="java_04">
            <div className="space-y-12 py-4">
                {/* 1. LE CONCEPT DE TAILLE FIXE */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-800 to-indigo-900 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Les Tableaux Statiques 📦</h2>
                        <p className="text-blue-100 text-lg leading-relaxed font-medium">
                            En Java, un tableau est une liste d'éléments du <strong>même type</strong>.
                            Contrairement au JavaScript, sa taille est fixée à la création.
                        </p>
                    </div>
                    <div className="absolute -right-10 -bottom-10 text-9xl opacity-10">ARRAY</div>
                </section>

                {/* 2. VISUALISEUR D'INDEX */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] text-center">
                    <h3 className="text-xl font-black mb-6 dark:text-white italic uppercase">L'index commence à Zéro !</h3>
                    <p className="text-sm text-slate-500 mb-8">Survole un élément pour voir son adresse (index) en mémoire.</p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {fruits.map((fruit, index) => (
                            <motion.div
                                key={index}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onMouseLeave={() => setHighlightedIndex(null)}
                                className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-help
                                    ${highlightedIndex === index ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-110' : 'border-slate-100 dark:border-slate-800'}`}
                            >
                                <span className="text-xs font-black text-blue-500">[{index}]</span>
                                <span className="font-bold dark:text-white mt-1 text-sm">{fruit}</span>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence>
                        {highlightedIndex !== null && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 text-sm font-mono text-blue-600 font-bold"
                            >
                                fruits[{highlightedIndex}] = "{fruits[highlightedIndex]}"
                            </motion.p>
                        )}
                    </AnimatePresence>
                </section>

                {/* 3. SYNTAXE JAVA */}
                <section className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-white">
                    <h3 className="text-cyan-400 font-mono text-sm mb-6">// Déclarer un tableau de 4 entiers :</h3>
                    <div className="space-y-4 font-mono text-sm">
                        <p><span className="text-blue-400">int</span>[] nombres = <span className="text-pink-500">new</span> <span className="text-blue-400">int</span>[<span className="text-orange-400">4</span>];</p>
                        <p className="text-slate-500 italic">// Ou avec des valeurs immédiates :</p>
                        <p><span className="text-blue-400">String</span>[] fruits = {"{"}<span className="text-emerald-400">"Pomme"</span>, <span className="text-emerald-400">"Banane"</span>{"}"};</p>
                        <div className="pt-4 border-t border-slate-800">
                            <p className="text-rose-400">// ATTENTION :</p>
                            <p className="text-xs text-slate-400 italic">fruits[2] = "Orange"; // ERREUR ! Le tableau est trop petit.</p>
                        </div>
                    </div>
                </section>
            </div>
        </LessonLayout>
    );
}