import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

const javaQuestions = [
    {
        question: "Que signifie JVM ?",
        options: ["Java Visual Maker", "Java Virtual Machine", "Just Variable Mode"],
        answer: 1,
        explication: "La JVM est la machine virtuelle qui exécute le bytecode Java sur n'importe quel OS."
    },
    {
        question: "Lequel de ces types n'existe pas en Java ?",
        options: ["int", "String", "let"],
        answer: 2,
        explication: "'let' est utilisé en JavaScript. En Java, on utilise des types stricts comme int, double ou String."
    },
    {
        question: "Quelle est la particularité d'un tableau (Array) en Java ?",
        options: ["Sa taille est fixe", "Il peut contenir du texte et des chiffres mélangés", "Sa taille est infinie"],
        answer: 0,
        explication: "Une fois créé, la taille d'un tableau Java ne peut plus être modifiée."
    }
];

export default function JavaQuiz() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (idx) => {
        if (idx === javaQuestions[step].answer) setScore(score + 1);

        if (step < javaQuestions.length - 1) {
            setStep(step + 1);
        } else {
            setFinished(true);
        }
    };

    return (
        <LessonLayout theme="Java" title="Certification Java : Niveau 1" lessonId="java_quiz">
            <div className="max-w-2xl mx-auto py-10">
                {!finished ? (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border-t-8 border-blue-600"
                    >
                        <h3 className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">Question {step + 1}</h3>
                        <p className="text-2xl font-black mb-8 dark:text-white leading-tight">
                            {javaQuestions[step].question}
                        </p>
                        <div className="grid gap-4">
                            {javaQuestions[step].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    className="p-5 text-left rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all font-bold border-2 border-transparent"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center p-12 bg-blue-600 rounded-[3rem] text-white shadow-2xl">
                        <h2 className="text-4xl font-black mb-4">Score : {score} / {javaQuestions.length}</h2>
                        <p className="mb-8 opacity-80 italic">
                            {score === javaQuestions.length ? "Expert Java confirmé ! ☕" : "Pas mal ! Continue tes efforts."}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
                        >
                            Recommencer
                        </button>
                    </div>
                )}
            </div>
        </LessonLayout>
    );
}