import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { CodeBlock } from '../../CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

export default function FonctionIntro() {
    const [fruit, setFruit] = useState("🍎");
    const [isBlending, setIsBlending] = useState(false);
    const [result, setResult] = useState(null);
    const [quizStatus, setQuizStatus] = useState(null);

    // Ma fonction "Machine à Jus"
    const faireDuJus = (ingredient) => {
        setIsBlending(true);
        setResult(null);

        setTimeout(() => {
            if (ingredient === "🍎") setResult("🧃 Jus de Pomme");
            else if (ingredient === "🍓") setResult("🥤 Smoothie Fraise");
            else if (ingredient === "🍊") setResult("🍹 Orangeade");
            setIsBlending(false);
        }, 1500);
    };

    return (
        <LessonLayout
            theme="Algorithme"
            title="Les Fonctions : Tes machines à coder"
            lessonId="algorithme_5"
        >
            <div className="space-y-12 py-4">
                {/* 1. CONCEPT VISUEL */}
                <section className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-xl overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">L'Usine Réutilisable</h2>
                        <p className="text-fuchsia-50 text-lg leading-relaxed font-medium">
                            Une <strong>fonction</strong> est un bloc de code qui porte un nom et qui effectue une tâche précise. On lui donne des ingrédients, elle les transforme, et elle nous rend un résultat.
                        </p>
                    </div>
                    <span className="absolute -right-4 -bottom-4 text-9xl opacity-20 rotate-12">⚙️</span>
                </section>

                {/* 2. LE JEU : LA MACHINE À JUS */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm text-center">
                    <h3 className="text-xl font-black mb-6 dark:text-white">🕹️ Simulateur de Fonction</h3>

                    <div className="flex flex-col items-center gap-8">
                        {/* Zone de préparation */}
                        <div className="flex gap-4">
                            {["🍎", "🍓", "🍊"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFruit(f)}
                                    className={`text-4xl p-4 rounded-2xl border-2 transition-all ${fruit === f ? 'border-fuchsia-500 bg-fuchsia-50' : 'border-transparent bg-slate-100'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {/* La Machine */}
                        <div className="relative group">
                            <motion.div
                                animate={isBlending ? { rotate: [0, -5, 5, -5, 5, 0], scale: [1, 1.05, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 0.2 }}
                                className="text-8xl bg-slate-100 dark:bg-slate-800 p-10 rounded-full border-4 border-dashed border-fuchsia-300"
                            >
                                🌪️
                            </motion.div>
                            <AnimatePresence>
                                {result && !isBlending && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 text-white px-6 py-2 rounded-full font-black shadow-lg"
                                    >
                                        RETOUR : {result} !
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={() => faireDuJus(fruit)}
                            disabled={isBlending}
                            className="bg-fuchsia-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-fuchsia-700 disabled:opacity-50 transition-all"
                        >
                            EXÉCUTER : faireDuJus("{fruit}")
                        </button>
                    </div>
                </section>

                {/* 3. EXPLICATION CODE */}
                <section>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4">Anatomie d'une fonction :</h3>

                    <CodeBlock language="javascript" code={`function faireDuJus(fruit) { // fruit est l'argument
  if (fruit === "🍎") {
     return "🧃 Jus de Pomme"; // La sortie
  }
}`} />
                </section>

                {/* 4. QUIZ FINAL SANS CONSOLE */}
                <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                    <h3 className="text-2xl font-black mb-6">Le mot-clé magique 🔑</h3>
                    <p className="text-slate-300 mb-6 font-bold">Quel mot-clé permet à une fonction de "renvoyer" un résultat ?</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onClick={() => setQuizStatus('wrong')} className="p-4 rounded-xl bg-slate-800 border-2 border-slate-700 hover:border-fuchsia-500 font-mono">give</button>
                        <button onClick={() => setQuizStatus('correct')} className="p-4 rounded-xl bg-slate-800 border-2 border-slate-700 hover:border-emerald-500 font-mono">return</button>
                        <button onClick={() => setQuizStatus('wrong')} className="p-4 rounded-xl bg-slate-800 border-2 border-slate-700 hover:border-fuchsia-500 font-mono">send</button>
                    </div>

                    <AnimatePresence>
                        {quizStatus && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                className={`mt-6 p-4 rounded-xl text-center font-black ${quizStatus === 'correct' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}
                            >
                                {quizStatus === 'correct' ? "✅ GAGNÉ ! 'return' termine la fonction et donne la valeur au reste du programme." : "❌ Non... En programmation, on utilise le terme 'return'."}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </LessonLayout>
    );
}