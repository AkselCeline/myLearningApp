import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function JavaLoops() {
    const [items, setItems] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    // États pour l'exercice
    const [userCode, setUserCode] = useState("");
    const [isFixed, setIsFixed] = useState(false);
    const [feedback, setFeedback] = useState("Ce code va tourner à l'infini et faire planter le PC ! Ajoute l'incrémentation pour le sauver.");

    const runLoop = () => {
        setIsRunning(true);
        setItems([]);
        let count = 0;
        const interval = setInterval(() => {
            if (count < 5) {
                setItems(prev => [...prev, `📦 Item ${count}`]);
                count++;
            } else {
                clearInterval(interval);
                setIsRunning(false);
            }
        }, 500);
    };

    const validateExercise = (input) => {
        setUserCode(input);
        // On vérifie si l'utilisateur a ajouté i++ ou i = i + 1 ou i += 1
        if (input.includes("i++") || input.includes("i = i + 1") || input.includes("i += 1")) {
            setIsFixed(true);
            setFeedback("✅ Bravo ! Sans l'incrémentation (i++), la boucle ne s'arrêterait jamais car 'i' resterait toujours à 0.");
        } else {
            setIsFixed(false);
            setFeedback("Le compteur 'i' est bloqué à 0. Ajoute de quoi l'augmenter à chaque tour.");
        }
    };

    return (
        <LessonLayout theme="Java" title="Les Boucles : La Répétition" lessonId="java_06">
            <div className="space-y-12 py-4">
                {/* 1. INTRODUCTION */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl">
                    <h2 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">Automatiser le travail 🔄</h2>
                    <p className="text-orange-100 text-lg leading-relaxed font-medium">
                        Une boucle permet de répéter un bloc de code. La boucle <strong>for</strong> est idéale quand on sait exactement combien de fois on veut répéter l'action.
                    </p>
                </section>

                {/* 2. DÉMONSTRATION INTERACTIVE */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="bg-slate-950 p-6 rounded-3xl font-mono text-sm border-l-8 border-orange-500 shadow-2xl">
                                <p className="text-pink-500">for <span className="text-white">(int i = 0; i {'<'} 5; i++) {"{"}</span></p>
                                <p className="text-blue-400 ml-6 italic">// Répété 5 fois</p>
                                <p className="text-blue-400 ml-6">System.out.println(<span className="text-emerald-400">"Item "</span> + i);</p>
                                <p className="text-pink-500">{"}"}</p>
                            </div>
                            <button
                                onClick={runLoop}
                                disabled={isRunning}
                                className={`w-full py-4 rounded-2xl font-black uppercase transition-all ${isRunning ? 'bg-slate-100 text-slate-400' : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg'}`}
                            >
                                {isRunning ? "Exécution..." : "Lancer la boucle"}
                            </button>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl min-h-[250px] flex flex-col items-center justify-start border-2 border-dashed border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-black text-slate-400 uppercase mb-4">Résultat de la boucle</span>
                            <div className="w-full space-y-2">
                                <AnimatePresence>
                                    {items.map((item, idx) => (
                                        <motion.div
                                            key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                            className="bg-white dark:bg-slate-900 p-2 px-4 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs flex justify-between items-center"
                                        >
                                            <span className="text-orange-500 font-bold">{item}</span>
                                            <span className="text-[10px] text-slate-400">i = {idx}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. EXERCICE : RÉPARER LA BOUCLE INFINIE */}
                <section className="bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800">
                    <div className="p-8 border-b border-slate-800 bg-slate-900/40 flex justify-between items-center">
                        <div>
                            <h3 className="text-white font-black uppercase tracking-widest text-sm italic">Urgence : Boucle Infinie ! 🚨</h3>
                            <p className={`text-[11px] mt-1 font-medium ${isFixed ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {feedback}
                            </p>
                        </div>
                        {isFixed && <span className="bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full font-black animate-pulse">FIXÉ !</span>}
                    </div>

                    <div className="p-8 font-mono text-sm">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                            <p className="text-pink-500">int <span className="text-white">i = 0;</span></p>
                            <p className="text-pink-500 mt-2">while <span className="text-white">(i {'<'} 10) {"{"}</span></p>
                            <p className="text-blue-400 ml-8">System.out.println(i);</p>

                            {/* INPUT POUR LE FIX */}
                            <div className="ml-8 mt-2 flex items-center gap-2 bg-slate-800/50 p-2 rounded-lg border border-slate-700 focus-within:border-orange-500 transition-all">
                                <span className="text-slate-500">//</span>
                                <input
                                    type="text"
                                    value={userCode}
                                    onChange={(e) => validateExercise(e.target.value)}
                                    placeholder="Ecris le code manquant ici..."
                                    className="bg-transparent border-none outline-none text-orange-400 w-full focus:ring-0"
                                />
                            </div>

                            <p className="text-pink-500 mt-2">{"}"}</p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">Indices</h4>
                                <ul className="text-[10px] text-slate-400 space-y-1">
                                    <li>• La condition est (i {'<'} 10).</li>
                                    <li>• Si 'i' ne change jamais, (0 {'<'} 10) est toujours VRAI.</li>
                                    <li>• Pour arrêter la boucle, il faut augmenter 'i'.</li>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-center items-center p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                                <p className="text-[10px] text-orange-500 font-bold uppercase mb-2">État de i</p>
                                <span className="text-2xl font-black text-white">{isFixed ? "0 → 1 → ... → 10" : "0"}</span>
                                <span className="text-[9px] text-orange-200 mt-1">{isFixed ? "Boucle saine" : "Bloqué à zéro !"}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. RÉCAPITULATIF SYNTAXE */}
                <section className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-white">
                    <h3 className="text-orange-400 font-mono text-sm mb-6">// Résumé : for vs while</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
                        <div className="space-y-2">
                            <p className="text-white font-bold tracking-widest text-[10px] uppercase text-slate-500 mb-2">Boucle FOR</p>
                            <p className="text-slate-400 italic">// Quand on connaît le nombre de tours.</p>
                            <p>for (int i=0; i{'<'}taille; i++)</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-white font-bold tracking-widest text-[10px] uppercase text-slate-500 mb-2">Boucle WHILE</p>
                            <p className="text-slate-400 italic">// Tant qu'une condition est vraie.</p>
                            <p>while (jeuEstLance == true)</p>
                        </div>
                    </div>
                </section>
            </div>
        </LessonLayout>
    );
}