import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function JsDom() {
    const [elements, setElements] = useState([]);

    const addStar = () => {
        const newStar = { id: Date.now(), x: Math.random() * 80, y: Math.random() * 80 };
        setElements([...elements, newStar]);
    };

    return (
        <LessonLayout theme="JavaScript" title="DOM : Création Magique" lessonId="js_13">
            <div className="space-y-10 py-4">
                <section className="p-8 rounded-[2.5rem] bg-indigo-900 text-white shadow-xl relative overflow-hidden">
                    <h2 className="text-3xl font-black mb-4">Manipuler le DOM 🏗️</h2>
                    <p className="text-indigo-200 text-lg">
                        Le <strong>DOM</strong> est la structure de ta page. Avec JavaScript, tu peux utiliser <code>document.createElement()</code> pour fabriquer de nouveaux éléments et les injecter dans la page sans la recharger.
                    </p>
                </section>

                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] text-center">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-black dark:text-white uppercase">Générateur d'Éléments</h3>
                        <button
                            onClick={() => setElements([])}
                            className="text-xs font-bold text-rose-500 hover:underline"
                        >
                            Vider le ciel
                        </button>
                    </div>

                    {/* Zone de rendu magique */}
                    <div className="relative h-[300px] bg-slate-950 rounded-[2rem] border-4 border-slate-800 overflow-hidden mb-8 shadow-inner">
                        <AnimatePresence>
                            {elements.map((star) => (
                                <motion.div
                                    key={star.id}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                    style={{ left: `${star.x}%`, top: `${star.y}%` }}
                                    className="absolute text-4xl pointer-events-none"
                                >
                                    ⭐
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {elements.length === 0 && (
                            <div className="h-full flex items-center justify-center text-slate-700 font-black italic">
                                Le ciel est vide... Cliquez sur le bouton !
                            </div>
                        )}
                    </div>

                    <button
                        onClick={addStar}
                        className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                    >
                        <span>document.appendChild(⭐)</span>
                    </button>
                </section>

                <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                    <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                        <span className="text-yellow-400">💡</span> Pourquoi c'est important ?
                    </h3>
                    <p className="text-slate-400 mb-6 font-medium">
                        C'est comme ça que fonctionnent Facebook ou Instagram : quand tu postes un commentaire, JavaScript crée un nouvel élément HTML pour l'afficher instantanément sans que tu aies besoin de rafraîchir la page !
                    </p>
                </section>


            </div>
        </LessonLayout>
    );
}