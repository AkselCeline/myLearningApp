import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
    {
        question: "Quelle fonction permet de sélectionner un élément HTML en JavaScript ?",
        options: ["document.select()", "document.querySelector()", "document.getHTML()"],
        answer: 1,
        explication: "querySelector() est la méthode moderne la plus utilisée pour cibler un élément avec son sélecteur CSS."
    },
    {
        question: "Quel événement est déclenché quand on clique sur un bouton ?",
        options: ["onHover", "onChange", "onClick"],
        answer: 2,
        explication: "L'événement 'click' (ou l'attribut onclick) réagit à l'appui de l'utilisateur."
    },
    {
        question: "Comment appelle-t-on la structure hiérarchique d'une page HTML manipulée par JS ?",
        options: ["Le DOM", "Le CSS", "L'API"],
        answer: 0,
        explication: "DOM signifie Document Object Model. C'est l'arbre de ta page web."
    }
];

export default function JsQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleAnswer = (index) => {
        setSelectedOption(index);
        if (index === questions[currentStep].answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
                setSelectedOption(null);
            } else {
                setShowResult(true);
            }
        }, 1000);
    };

    return (
        <LessonLayout theme="JavaScript" title="Examen Final : JavaScript" lessonId="js_quiz">
            <div className="max-w-2xl mx-auto py-8">
                {!showResult ? (
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border-b-8 border-yellow-400"
                    >
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Question {currentStep + 1} / {questions.length}</span>
                        <h2 className="text-2xl font-black mt-4 mb-8 dark:text-white leading-tight">
                            {questions[currentStep].question}
                        </h2>

                        <div className="space-y-4">
                            {questions[currentStep].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    disabled={selectedOption !== null}
                                    className={`w-full p-5 rounded-2xl text-left font-bold transition-all border-2 ${
                                        selectedOption === index
                                            ? (index === questions[currentStep].answer ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white')
                                            : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-yellow-400'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center p-12 bg-slate-900 rounded-[3rem] text-white">
                        <h2 className="text-5xl mb-4">🎉</h2>
                        <h3 className="text-3xl font-black mb-2">Quiz Terminé !</h3>
                        <p className="text-slate-400 text-lg mb-8">Ton score est de <span className="text-yellow-400 font-black">{score} / {questions.length}</span></p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-yellow-400 text-slate-900 px-10 py-4 rounded-2xl font-black"
                        >
                            REFAIRE LE TEST
                        </button>
                    </div>
                )}
            </div>
        </LessonLayout>
    );
}