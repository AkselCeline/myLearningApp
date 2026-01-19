import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { CodeBlock } from '../../CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConditionIntro() {
    const [age, setAge] = useState(15);
    const [shake, setShake] = useState(false);
    const [quizChoice, setQuizChoice] = useState(null);

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    return (
        <LessonLayout
            theme="Algorithme"
            title="Les Conditions : Si... Alors..."
            lessonId="algorithme_2"
        >
            <motion.div
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                className="space-y-12 py-4"
            >
                {/* 1. INTRODUCTION VISUELLE */}
                <section className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Prendre des décisions</h2>
                        <p className="text-indigo-50 text-lg leading-relaxed font-medium">
                            En informatique, une <strong>condition</strong> permet à l'algorithme de choisir entre deux chemins. C'est le fameux "Si ceci est vrai, alors fais cela".
                        </p>
                    </div>
                    <span className="absolute -right-4 -bottom-4 text-9xl opacity-20 rotate-12">🚦</span>
                </section>

                {/* 2. LE SIMULATEUR INTERACTIF */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm text-center">
                    <h3 className="text-xl font-black mb-6 dark:text-white">Simulateur : La porte du club 🕺</h3>

                    <div className="flex flex-col items-center gap-6">
                        <div className="text-6xl mb-2">
                            {age >= 18 ? "🔓" : "🔒"}
                        </div>

                        <div className="w-full max-w-xs space-y-4">
                            <label className="block text-sm font-black uppercase text-slate-400">Âge du client : {age} ans</label>
                            <input
                                type="range" min="10" max="30" value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>

                        <div className={`p-6 rounded-2xl font-black transition-all ${age >= 18 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>
                            {age >= 18 ? "ENTRÉE AUTORISÉE" : "ACCÈS REFUSÉ (-18)"}
                        </div>
                    </div>
                </section>

                {/* 3. EXPLICATION CODE */}
                <section>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 font-mono">Structure d'une condition :</h3>

                    <CodeBlock language="pseudo-code" code={`SI (age >= 18) ALORS {
    Afficher("Bienvenue !");
} SINON {
    Afficher("Tu es trop jeune...");
}`} />
                </section>

                {/* 4. MINI-QUIZ TECHNIQUE */}
                <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <span className="bg-indigo-500 p-2 rounded-lg text-sm">QUIZ</span>
                        Vérifie ta logique
                    </h3>

                    <p className="text-slate-300 mb-6 font-bold">Lequel de ces symboles signifie "Est égal à" en programmation ?</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: "=", desc: "Attribution" },
                            { label: "==", desc: "Comparaison" },
                            { label: "!==", desc: "Différence" }
                        ].map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setQuizChoice(idx);
                                    if (idx !== 1) triggerShake();
                                }}
                                className={`p-4 rounded-2xl border-2 transition-all group ${
                                    quizChoice === idx
                                        ? (idx === 1 ? "bg-emerald-500 border-emerald-400" : "bg-rose-500 border-rose-400")
                                        : "bg-slate-800 border-slate-700 hover:border-indigo-500"
                                }`}
                            >
                                <div className="text-2xl font-black mb-1">{opt.label}</div>
                                <div className="text-[10px] uppercase opacity-50 font-black">{opt.desc}</div>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {quizChoice !== null && (
                            <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="mt-6 text-center font-black italic"
                            >
                                {quizChoice === 1 ? "✅ Exact ! On utilise double égal pour comparer deux valeurs." : "❌ Attention ! Un seul '=' sert à ranger une valeur, pas à comparer."}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </section>

                {/* 5. RÉSUMÉ */}
                <footer className="bg-indigo-50 dark:bg-indigo-900/10 border-2 border-dashed border-indigo-200 dark:border-indigo-900/30 p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-black text-indigo-800 dark:text-indigo-400 mb-2">Point Clé 💡</h3>
                    <p className="text-indigo-700 dark:text-indigo-500 font-medium">
                        Une condition renvoie toujours <strong>VRAI (True)</strong> ou <strong>FAUX (False)</strong>. C'est ce qu'on appelle un <strong>Booléen</strong>.
                    </p>
                </footer>
            </motion.div>
        </LessonLayout>
    );
}