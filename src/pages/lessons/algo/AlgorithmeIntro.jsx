import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { CodeBlock } from '../../CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    { id: 1, text: 'Prendre une tasse' },
    { id: 2, text: 'Mettre du café moulu' },
    { id: 3, text: 'Verser de l’eau chaude' },
    { id: 4, text: 'Mélanger' },
    { id: 5, text: 'Boire' },
];

export default function AlgorithmeIntro() {
    // --- ÉTATS ---
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);
    const [orderedSteps, setOrderedSteps] = useState(shuffleArray(steps));
    const [draggedId, setDraggedId] = useState(null);
    const [orderResult, setOrderResult] = useState(null);

    // Quiz Final
    const [finalQuizScore, setFinalQuizScore] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [shake, setShake] = useState(false);

    const questions = [
        {
            id: 'q1',
            question: "Un algorithme doit être...",
            options: ["Vague et créatif", "Précis et ordonné", "Long et complexe"],
            correct: 1
        },
        {
            id: 'q2',
            question: "Que se passe-t-il si on change l'ordre des étapes ?",
            options: ["Rien, le résultat est le même", "L'algorithme peut échouer", "L'ordinateur corrige tout seul"],
            correct: 1
        }
    ];

    // --- FONCTIONS LOGIQUE ---
    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    function handleQuizSubmit(e) {
        e.preventDefault();
        if (quizAnswer.toLowerCase().trim() === 'prendre une tasse') {
            setQuizResult(true);
        } else {
            setQuizResult(false);
            triggerShake();
        }
    }

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    // Drag & Drop
    function handleDragStart(id) { setDraggedId(id); }
    function handleDragOver(e) { e.preventDefault(); }
    function handleDrop(id) {
        const draggedIndex = orderedSteps.findIndex(s => s.id === draggedId);
        const dropIndex = orderedSteps.findIndex(s => s.id === id);
        const newOrder = [...orderedSteps];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, orderedSteps[draggedIndex]);
        setOrderedSteps(newOrder);
        setDraggedId(null);
    }

    function checkOrder() {
        const correct = orderedSteps.every((step, idx) => step.id === steps[idx].id);
        setOrderResult(correct);
        if (!correct) triggerShake();
    }

    const checkFinalQuiz = () => {
        let score = 0;
        questions.forEach(q => {
            if (selectedOptions[q.id] === q.correct) score++;
        });
        setFinalQuizScore(score);
        if (score < questions.length) triggerShake();
    };

    return (
        <LessonLayout
            theme="Algorithme"
            title="Qu'est-ce qu'un algorithme ?"
            lessonId="algorithme_1"
        >
            <motion.div
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                className="space-y-12 py-4"
            >
                {/* 1. HERO SECTION */}
                <section>
                    <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xl overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">La Recette Magique</h2>
                            <p className="text-teal-50 text-lg leading-relaxed font-medium">
                                Un algorithme est simplement une <strong>suite d’instructions précises</strong> pour atteindre un objectif. Ni plus, ni moins !
                            </p>
                        </div>
                        <span className="absolute -right-4 -bottom-4 text-9xl opacity-20 rotate-12">🧩</span>
                    </div>
                </section>

                {/* 2. EXEMPLE CODE */}
                <section>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4">En langage informatique :</h3>
                    <CodeBlock code={`FAIRE café {
  Prendre(tasse);
  Ajouter(café, tasse);
  SI (eau === chaude) {
    Verser(eau, tasse);
    Mélanger();
  } SINON {
    Chauffer(eau);
  }
  Boire();
}`} />
                </section>

                {/* 3. JEU DE MISE EN ORDRE */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6">Mets les étapes dans l'ordre (Drag & Drop)</h3>
                    <ul className="space-y-3">
                        {orderedSteps.map((step) => (
                            <li
                                key={step.id}
                                draggable
                                onDragStart={() => handleDragStart(step.id)}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(step.id)}
                                className={`flex items-center p-5 bg-slate-50 dark:bg-slate-800/50 border-2 rounded-2xl cursor-grab active:cursor-grabbing transition-all ${
                                    draggedId === step.id ? "opacity-30 border-dashed border-teal-300" : "border-transparent hover:border-teal-500/30"
                                }`}
                            >
                                <span className="mr-4 text-teal-500 font-black">☰</span>
                                <span className="font-bold text-slate-700 dark:text-slate-200">{step.text}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={checkOrder}
                        className="mt-6 w-full bg-teal-500 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-teal-600 transition-all"
                    >
                        Vérifier l'ordre
                    </button>
                    {orderResult !== null && (
                        <p className={`mt-4 font-bold text-center ${orderResult ? "text-emerald-500" : "text-rose-500"}`}>
                            {orderResult ? "🏆 Bravo ! L'ordre est parfait." : "❌ Ce n'est pas encore ça, réessaie !"}
                        </p>
                    )}
                </section>

                {/* 4. QUIZ FINAL STYLE DARK */}
                <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-teal-500 p-3 rounded-2xl">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Défi Final</h3>
                    </div>

                    <div className="space-y-8">
                        {questions.map((q) => (
                            <div key={q.id} className="space-y-4">
                                <p className="text-lg font-bold text-slate-300">{q.question}</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {q.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedOptions(prev => ({ ...prev, [q.id]: idx }))}
                                            className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                                                selectedOptions[q.id] === idx
                                                    ? "bg-teal-500 border-teal-400 text-white"
                                                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={checkFinalQuiz}
                        className="mt-10 w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-teal-400 transition-colors"
                    >
                        Valider mes réponses
                    </button>

                    <AnimatePresence>
                        {finalQuizScore !== null && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`mt-6 p-6 rounded-2xl text-center font-black ${finalQuizScore === questions.length ? "bg-emerald-500" : "bg-rose-500"}`}
                            >
                                {finalQuizScore === questions.length ? "🔥 Parfait ! Tu es prêt pour la suite." : "❌ Regarde bien les définitions et réessaie !"}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* 5. FOOTER À RETENIR */}
                <section className="bg-amber-50 dark:bg-amber-900/10 border-2 border-dashed border-amber-200 dark:border-amber-900/30 p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-black text-amber-800 dark:text-amber-500 mb-2">À retenir 💡</h3>
                    <p className="text-amber-700 dark:text-amber-600 font-medium italic">
                        L'ordinateur est très bête : il fait exactement ce que tu écris. La précision est donc ta meilleure arme !
                    </p>
                </section>
            </motion.div>
        </LessonLayout>
    );
}