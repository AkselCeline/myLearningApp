import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lessonsData from '../data/lessonsData';

// Imports de composants spécifiques à certains cours
import AlgorithmeIntro from './lessons/AlgorithmeIntro'; // ajuste le chemin si nécessaire
import ConditionIntro from './lessons/ConditionIntro'; // ajuste le chemin si nécessaire
import BoucleIntro from './lessons/BoucleIntro'; // ajuste le chemin si nécessaire
import VariableIntro from './lessons/VariableIntro'; // ajuste le chemin si nécessaire
import FunctionIntro from "./lessons/FunctionIntro"; // ajuste le chemin si nécessaire
import LogicGameIntro from "./lessons/LogicGameIntro"; // ajuste le chemin si nécessaire
import ConsoleLogIntro from "./lessons/ConsoleLogIntro"; // ajuste le chemin si nécessaire
import LetVariablesIntro from "./lessons/LetVariablesIntro"; // ajuste le chemin si nécessaire
import IfConditionIntro from "./lessons/IfConditionIntro"; // ajuste le chemin si nécessaire
import FirstAlgorithmGame from "./lessons/FirstAlgorithmGame"; // ajuste le chemin si nécessaire
import InverserVariables from "./lessons/InverserVariables"; // ajuste le chemin si nécessaire
import PrixTTC from "./lessons/PrixTTC"; // ajuste le chemin si nécessaire
import LeapYearLesson from "./lessons/LeapYearLesson"; // ajuste le chemin si nécessaire
import InputRangeLesson from "./lessons/InputRangeLesson"; // ajuste le chemin si nécessaire
import LoopAnimation from "./lessons/LoopAnimation"; // ajuste le chemin si nécessaire
import PositiveNegativeLesson from "./lessons/PositiveNegativeLesson"; // ajuste le chemin si nécessaire
import AlphabetOrderLesson from "./lessons/AlphabetOrderLesson"; // ajuste le chemin si nécessaire
import EvenOddLesson from "./lessons/EvenOddLesson"; // ajuste le chemin si nécessaire

// Map des composants personnalisés
const courseComponents = {
    AlgorithmeIntro,
    ConditionIntro,
    BoucleIntro,
    VariableIntro,
    FunctionIntro,
    LogicGameIntro,
    ConsoleLogIntro,
    LetVariablesIntro,
    IfConditionIntro,
    FirstAlgorithmGame,
    InverserVariables,
    PrixTTC,
    LeapYearLesson,
    InputRangeLesson,
    LoopAnimation,
    PositiveNegativeLesson,
    AlphabetOrderLesson,
    EvenOddLesson,
    // Ajoute ici d'autres composants personnalisés si besoin
};

export default function CourseDetail() {
    const { theme, courseId } = useParams();
    const navigate = useNavigate();

    if (!theme) return <div className="p-8 text-red-500">Thème non spécifié</div>;

    const themeData = lessonsData[theme.toLowerCase()];
    if (!themeData) return <div className="p-8 text-red-500">Thème introuvable</div>;

    // Recherche du cours
    let course = null;
    for (const level of themeData.levels) {
        console.log("Level courses:", level.courses);
        console.log("Searching for courseId:", Number(courseId));
        course = level.courses.find(c => c.id === Number(courseId));
        if (course) break;
    }
    console.log("Course trouvé :", course);
    if (!course) return <div className="p-8 text-red-500">Cours introuvable</div>;

    // Si un composant spécifique est défini pour ce cours, le charger
    const CustomComponent = course.component ? courseComponents[course.component] : null;

    // Gestion quiz
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const questions = course.content?.questions || [];

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
        <div className="min-h-screen bg-gray-50 p-8 max-w-3xl mx-auto">
            <button
                className="mb-6 text-teal-600 hover:underline"
                onClick={() => navigate(-1)}
            >
                ← Retour
            </button>

            <h1 className="text-3xl font-bold text-teal-800 mb-6">{course.title}</h1>

            {CustomComponent ? (
                <CustomComponent />
            ) : course.type === "cours" ? (
                <div className="bg-white p-6 rounded-xl shadow whitespace-pre-line">
                    {typeof course.content === 'string' ? course.content : "Contenu indisponible."}
                </div>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow">
                    {questions.length === 0 ? (
                        <p>Aucune question disponible pour ce quiz.</p>
                    ) : !showResult ? (
                        <>
                            <p className="mb-4 font-semibold" aria-live="polite">
                                Question {currentQ + 1} / {questions.length}
                            </p>
                            <p className="mb-6">{questions[currentQ].question}</p>
                            <div className="space-y-3" role="list">
                                {questions[currentQ].options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(idx)}
                                        className="w-full bg-teal-100 hover:bg-teal-200 rounded py-2"
                                        aria-label={`Option ${idx + 1}: ${opt}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <p className="text-xl font-semibold mb-4">Quiz terminé !</p>
                            <p className="text-lg mb-6">
                                Votre score : {score} / {questions.length}
                            </p>
                            <button
                                onClick={restartQuiz}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Recommencer le quiz
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}
