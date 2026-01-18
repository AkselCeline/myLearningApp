import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lessonsData from '../data/lessonsData';

// --- IMPORTS DES COMPOSANTS PERSONNALISÉS ---
import AlgorithmeIntro from './lessons/AlgorithmeIntro';
import ConditionIntro from './lessons/ConditionIntro';
import BoucleIntro from './lessons/BoucleIntro';
import VariableIntro from './lessons/VariableIntro';
import FunctionIntro from "./lessons/FunctionIntro";
import LogicGameIntro from "./lessons/LogicGameIntro";
import ConsoleLogIntro from "./lessons/ConsoleLogIntro";
import LetVariablesIntro from "./lessons/LetVariablesIntro";
import IfConditionIntro from "./lessons/IfConditionIntro";
import FirstAlgorithmGame from "./lessons/FirstAlgorithmGame";
import InverserVariables from "./lessons/InverserVariables";
import PrixTTC from "./lessons/PrixTTC";
import LeapYearLesson from "./lessons/LeapYearLesson";
import InputRangeLesson from "./lessons/InputRangeLesson";
import LoopAnimation from "./lessons/LoopAnimation";
import PositiveNegativeLesson from "./lessons/PositiveNegativeLesson";
import AlphabetOrderLesson from "./lessons/AlphabetOrderLesson";
import EvenOddLesson from "./lessons/EvenOddLesson";

const courseComponents = {
    AlgorithmeIntro, ConditionIntro, BoucleIntro, VariableIntro,
    FunctionIntro, LogicGameIntro, ConsoleLogIntro, LetVariablesIntro,
    IfConditionIntro, FirstAlgorithmGame, InverserVariables, PrixTTC,
    LeapYearLesson, InputRangeLesson, LoopAnimation, PositiveNegativeLesson,
    AlphabetOrderLesson, EvenOddLesson
};

export default function CourseDetail() {
    const { theme, courseId } = useParams();
    const navigate = useNavigate();

    // État du Quiz
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // 1. Recherche des données du cours
    const themeData = lessonsData[theme?.toLowerCase()];
    let course = null;
    if (themeData) {
        for (const level of themeData.levels) {
            course = level.courses.find(c => c.id === Number(courseId));
            if (course) break;
        }
    }

    // Gestion d'erreur
    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-10 bg-white rounded-[2.5rem] shadow-xl border border-slate-100">
                    <p className="text-5xl mb-4">🔍</p>
                    <h2 className="text-2xl font-black text-slate-800">Cours introuvable</h2>
                    <button onClick={() => navigate(-1)} className="mt-6 bg-teal-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-600 transition-all">
                        Retourner au parcours
                    </button>
                </div>
            </div>
        );
    }

    // 2. Identification du composant spécial
    const CustomComponent = course.component ? courseComponents[course.component] : null;
    const questions = course.content?.questions || [];

    // 3. Logique du Quiz
    const handleAnswer = (index) => {
        if (index === questions[currentQ].answer) {
            setScore(prev => prev + 1);
        }
        if (currentQ + 1 < questions.length) {
            setCurrentQ(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* TOP NAVIGATION BAR */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 mb-8">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-colors group"
                        onClick={() => navigate(-1)}
                    >
                        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                        Retour
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {course.type}
                        </span>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-6">
                {/* TITRE DU COURS */}
                <header className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                        {course.title}
                    </h1>
                    <div className="h-1.5 w-20 bg-teal-500 mt-6 rounded-full mx-auto md:mx-0"></div>
                </header>

                {/* ZONE DE CONTENU */}
                <div className="relative">

                    {/* CAS 1 : COMPOSANT INTERACTIF (Jeu / Animation) */}
                    {CustomComponent ? (
                            <div className="bg-white rounded-[2.5rem] p-4 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 animate-question">
                                <CustomComponent />
                            </div>
                        ) :

                        /* CAS 2 : LECTEUR DE COURS (Texte) */
                        course.type === "cours" ? (
                                <article className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 animate-question">
                                    <div className="whitespace-pre-line text-slate-600 text-lg leading-relaxed font-medium font-sans">
                                        {typeof course.content === 'string' ? course.content : "Contenu indisponible."}
                                    </div>
                                </article>
                            ) :

                            /* CAS 3 : INTERFACE DE QUIZ */
                            (
                                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                                    {!showResult ? (
                                        <div key={currentQ} className="space-y-8 animate-question">
                                            {/* Progression */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-teal-500 h-full transition-all duration-700 ease-out"
                                                        style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-black text-slate-400 uppercase">
                                            Q.{currentQ + 1} / {questions.length}
                                        </span>
                                            </div>

                                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug">
                                                {questions[currentQ].question}
                                            </h2>

                                            <div className="grid gap-4">
                                                {questions[currentQ].options.map((opt, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleAnswer(idx)}
                                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                                        className="animate-question group flex items-center p-6 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] text-left hover:border-teal-500 hover:bg-teal-50 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                                                    >
                                                <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mr-4 font-black text-slate-400 group-hover:border-teal-200 group-hover:text-teal-500 transition-colors">
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                                        <span className="text-lg font-bold text-slate-700 group-hover:text-teal-900 transition-colors">
                                                    {opt}
                                                </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        /* RÉSULTATS DU QUIZ */
                                        <div className="text-center py-10 space-y-8 animate-question">
                                            <div className="relative inline-block">
                                                <div className="text-8xl mb-2 animate-bounce">
                                                    {score === questions.length ? "🏆" : "🎉"}
                                                </div>
                                                {score === questions.length && (
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white"></div>
                                                )}
                                            </div>
                                            <div>
                                                <h2 className="text-4xl font-black text-slate-900 mb-2">Quiz terminé !</h2>
                                                <p className="text-slate-500 text-xl">
                                                    Tu as obtenu <span className="text-teal-600 font-black">{score}</span> sur <span className="font-bold">{questions.length}</span>.
                                                </p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                                                <button
                                                    onClick={restartQuiz}
                                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-5 px-10 rounded-[1.5rem] transition-all"
                                                >
                                                    Réessayer le quiz
                                                </button>
                                                <button
                                                    onClick={() => navigate(-1)}
                                                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 px-10 rounded-[1.5rem] shadow-xl shadow-slate-200 transition-all hover:-translate-y-1 active:scale-95"
                                                >
                                                    Étape suivante
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                </div>
            </main>
        </div>
    );
}