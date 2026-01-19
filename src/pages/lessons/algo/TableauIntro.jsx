import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { CodeBlock } from '../../CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

export default function TableauIntro() {
    const [items, setItems] = useState(["🍎", "🍕", "🍔"]);
    const [inputValue, setInputValue] = useState("");
    const [quizIndex, setQuizIndex] = useState(null);
    const [shake, setShake] = useState(false);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const addItem = () => {
        if (inputValue.trim() !== "") {
            setItems([...items, inputValue]);
            setInputValue("");
        }
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <LessonLayout
            theme="Algorithme"
            title="Les Tableaux : Listes et Collections"
            lessonId="algorithme_6"
        >
            <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} className="space-y-12 py-4">

                {/* 1. INTRODUCTION */}
                <section className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Le Casier Magique</h2>
                        <p className="text-emerald-50 text-lg leading-relaxed font-medium">
                            Un <strong>Tableau</strong> (Array) est une variable capable de contenir plusieurs éléments à la fois. C'est comme une liste de courses numérotée !
                        </p>
                    </div>
                    <span className="absolute -right-4 -bottom-4 text-9xl opacity-20 rotate-12">📊</span>
                </section>

                {/* 2. LE JEU : GÉRER SA LISTE */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
                    <h3 className="text-xl font-black mb-6 text-center dark:text-white">Simulateur de Tableau</h3>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {items.map((item, idx) => (
                            <motion.div
                                layout
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                key={idx}
                                className="flex flex-col items-center"
                            >
                                <span className="text-xs font-black text-slate-400 mb-1 italic">Index [{idx}]</span>
                                <div className="relative bg-slate-100 dark:bg-slate-800 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl border-2 border-emerald-500 shadow-inner group">
                                    {item}
                                    <button
                                        onClick={() => removeItem(idx)}
                                        className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex gap-2 max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Ajouter un emoji..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 dark:bg-slate-800 outline-none focus:border-emerald-500 dark:text-white font-bold"
                        />
                        <button
                            onClick={addItem}
                            className="bg-emerald-500 text-white px-6 rounded-xl font-black hover:bg-emerald-600 transition-all"
                        >
                            AJOUTER
                        </button>
                    </div>
                </section>

                {/* 3. EXPLICATION CODE */}
                <section>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 italic">Syntaxe en JavaScript :</h3>

                    <CodeBlock language="javascript" code={`let maListe = ["🍎", "🍕", "🍔"];\n\n// Accéder au premier élément\nconsole.log(maListe[0]); // Affiche 🍎\n\n// Connaître la taille de la liste\nconsole.log(maListe.length); // Affiche 3`} />
                </section>

                {/* 4. LE QUIZ : LE PIÈGE DE L'INDEX */}
                <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                    <h3 className="text-2xl font-black mb-6">Le Défi de l'Index 🧠</h3>
                    <p className="text-slate-300 mb-6 font-bold">Dans le tableau suivant : <span className="text-emerald-400 font-mono">["🐶", "🐱", "🐭"]</span>, comment accède-t-on au chat (<span className="text-xl">🐱</span>) ?</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onClick={() => { setQuizIndex(0); triggerShake(); }} className={`p-4 rounded-xl border-2 transition-all font-mono ${quizIndex === 0 ? 'bg-rose-500/20 border-rose-500' : 'bg-slate-800 border-slate-700'}`}>liste[0]</button>
                        <button onClick={() => setQuizIndex(1)} className={`p-4 rounded-xl border-2 transition-all font-mono ${quizIndex === 1 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700'}`}>liste[1]</button>
                        <button onClick={() => { setQuizIndex(2); triggerShake(); }} className={`p-4 rounded-xl border-2 transition-all font-mono ${quizIndex === 2 ? 'bg-rose-500/20 border-rose-500' : 'bg-slate-800 border-slate-700'}`}>liste[2]</button>
                    </div>

                    <AnimatePresence>
                        {quizIndex !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className={`mt-6 p-4 rounded-xl text-center font-black ${quizIndex === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}
                            >
                                {quizIndex === 1 ? "✅ Bravo ! L'index 0 est le chien, l'index 1 est le chat." : "❌ Erreur ! N'oublie pas : l'ordinateur commence à 0 !"}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                <footer className="bg-emerald-50 dark:bg-emerald-900/10 border-2 border-dashed border-emerald-200 dark:border-emerald-900/30 p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-black text-emerald-800 dark:text-emerald-400 mb-2">À retenir 💡</h3>
                    <p className="text-emerald-700 dark:text-emerald-500 font-medium italic">
                        La propriété <strong>.length</strong> est très utile pour savoir combien d'éléments contient ton tableau sans avoir à les compter toi-même !
                    </p>
                </footer>
            </motion.div>
        </LessonLayout>
    );
}