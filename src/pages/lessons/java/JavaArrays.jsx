import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function JavaArrays() {
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [userGuess, setUserGuess] = useState("");
    const [gameFeedback, setGameFeedback] = useState("Trouve l'index de 'Orange' pour gagner !");

    const fruits = ["Pomme", "Banane", "Orange", "Fraise"];

    const checkExercise = (val) => {
        setUserGuess(val);
        if (val === "2") {
            setGameFeedback("✅ BRAVO ! fruits[2] renvoie bien 'Orange'.");
        } else if (val === "") {
            setGameFeedback("Trouve l'index de 'Orange' !");
        } else {
            setGameFeedback(`❌ Non, fruits[${val}] c'est '${fruits[val] || "une erreur !"}'`);
        }
    };

    return (
        <LessonLayout theme="Java" title="Les Tableaux en Java" lessonId="java_04">
            <div className="space-y-12 py-4">
                {/* 1. LE CONCEPT DE TAILLE FIXE */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-800 to-indigo-900 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Les Tableaux Statiques 📦</h2>
                        <p className="text-blue-100 text-lg leading-relaxed font-medium">
                            En Java, un tableau est un objet qui stocke des éléments du <strong>même type</strong>.
                            Sa caractéristique principale ? Sa <strong>taille est fixe</strong>. Une fois créé, on ne peut plus l'agrandir.
                        </p>
                    </div>
                    <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 font-black">ARRAY</div>
                </section>

                {/* 2. VISUALISEUR D'INDEX */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] text-center shadow-sm">
                    <h3 className="text-xl font-black mb-2 dark:text-white italic uppercase tracking-tighter">L'index commence à Zéro !</h3>
                    <p className="text-sm text-slate-500 mb-10 font-medium">Survole une case pour voir son adresse mémoire.</p>

                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        {fruits.map((fruit, index) => (
                            <motion.div
                                key={index}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onMouseLeave={() => setHighlightedIndex(null)}
                                whileHover={{ y: -5 }}
                                className={`w-24 h-28 rounded-3xl border-2 flex flex-col items-center justify-center transition-all cursor-crosshair relative
                                    ${highlightedIndex === index ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg' : 'border-slate-100 dark:border-slate-800'}`}
                            >
                                <span className={`absolute top-3 text-[10px] font-black px-2 py-0.5 rounded-full ${highlightedIndex === index ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                    idx: {index}
                                </span>
                                <span className="font-bold dark:text-white mt-4 text-sm">{fruit}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl max-w-md mx-auto border border-dashed border-slate-200 dark:border-slate-700">
                        <h4 className="text-xs font-black uppercase text-blue-500 mb-4 tracking-widest">Mini-Défi</h4>
                        <p className="text-sm dark:text-slate-300 mb-4 font-bold">{gameFeedback}</p>
                        <div className="flex gap-2 justify-center">
                            <span className="font-mono text-lg font-bold dark:text-white">fruits[</span>
                            <input
                                type="number"
                                placeholder="?"
                                className="w-12 bg-white dark:bg-slate-900 border-2 border-blue-500 rounded-lg text-center font-bold text-blue-500 outline-none"
                                onChange={(e) => checkExercise(e.target.value)}
                            />
                            <span className="font-mono text-lg font-bold dark:text-white">]</span>
                        </div>
                    </div>
                </section>



                {/* 3. SYNTAXE ET PROPRIÉTÉS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-white h-full">
                        <h3 className="text-cyan-400 font-mono text-sm mb-6">// Déclaration & Taille</h3>
                        <div className="space-y-4 font-mono text-sm">
                            <p><span className="text-blue-400">int</span>[] tab = <span className="text-pink-500">new</span> <span className="text-blue-400">int</span>[<span className="text-orange-400">5</span>];</p>
                            <p className="text-slate-500 text-xs mt-4 italic">// Pour connaître la taille :</p>
                            <p className="text-white">System.out.println(tab.<span className="text-yellow-400">length</span>); <span className="text-slate-500">// Affiche 5</span></p>
                        </div>
                    </section>

                    <section className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[2.5rem] border border-amber-200 dark:border-amber-800/50">
                        <h3 className="text-amber-600 dark:text-amber-400 font-black text-sm mb-4 uppercase tracking-widest">⚠️ Le Piège Classique</h3>
                        <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed">
                            Si ton tableau a une taille de <strong>4</strong>, le dernier index est <strong>3</strong>.
                            Tenter d'accéder à <code>fruits[4]</code> provoquera une erreur immédiate qui fera planter ton programme :
                            <span className="block mt-2 font-mono text-[10px] bg-rose-500 text-white p-2 rounded">Exception: ArrayIndexOutOfBoundsException</span>
                        </p>
                    </section>
                </div>

                {/* 4. RÉSUMÉ */}
                <section className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-black uppercase mb-4 dark:text-white">À retenir :</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-center gap-2">✅ <strong className="text-slate-900 dark:text-slate-200">Homogène :</strong> Un seul type de donnée.</li>
                        <li className="flex items-center gap-2">✅ <strong className="text-slate-900 dark:text-slate-200">Indexé :</strong> Accès ultra-rapide via l'index.</li>
                        <li className="flex items-center gap-2">❌ <strong className="text-slate-900 dark:text-slate-200">Rigide :</strong> Impossible d'ajouter une 5ème case.</li>
                        <li className="flex items-center gap-2">✅ <strong className="text-slate-900 dark:text-slate-200">Length :</strong> Propriété pour connaître la taille.</li>
                    </ul>
                </section>
            </div>
        </LessonLayout>
    );
}