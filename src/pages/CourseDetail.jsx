import React from 'react';
import { useParams } from 'react-router-dom';
import lessonsData from '../data/lessonsData';

// --- 1. LES IMPORTS (Vérifie bien que les chemins sont bons) ---
import AlgorithmeIntro from './lessons/algo/AlgorithmeIntro';
import ConditionIntro from './lessons/algo/ConditionIntro';
import BoucleIntro from './lessons/algo/BoucleIntro';
import VariableIntro from "./lessons/algo/VariableIntro";
import FonctionIntro from "./lessons/algo/FonctionIntro";
import TableauIntro from "./lessons/algo/TableauIntro";
import AlgoRevision from "./lessons/algo/AlgoRevision";
import HtmlIntro from "./lessons/html/HtmlIntro";
import CssIntro from "./lessons/html/CssIntro";
import BoxModelIntro from "./lessons/html/BoxModelIntro";
import ProjetCarteProfil from './lessons/html/ProjetCarteProfil';
import JsBasics from './lessons/JavaScript/JsBasics';
import JsDom from "./lessons/JavaScript/JsDom";
import JsEvents from "./lessons/JavaScript/JsEvents";
import JsCounter from "./lessons/JavaScript/JsCounter";
import JsQuiz from "./lessons/JavaScript/JsQuiz";
import GitIntro from "./lessons/git/GitIntro";
import GitCommit from "./lessons/git/GitCommit";
import GitPush from "./lessons/git/GitPush";
import GitTerminalGame from "./lessons/git/GitTerminalGame";
import JavaIntro from "./lessons/java/JavaIntro";
import JavaJvm from "./lessons/java/JavaJvm";
import JavaVariables from "./lessons/java/JavaVariables";
import JavaArrays from "./lessons/java/JavaArrays";
import JavaQuiz from "./lessons/java/JavaQuiz";
import JavaConditions from "./lessons/java/JavaConditions";
import JavaLoops from "./lessons/java/JavaLoops";

// --- 2. LE MAPPING ---
const componentsMap = {
    "AlgorithmeIntro": AlgorithmeIntro,
    "ConditionIntro": ConditionIntro,
    "BoucleIntro": BoucleIntro,
    "VariableIntro": VariableIntro,
    "FonctionIntro": FonctionIntro,
    "TableauIntro": TableauIntro,
    "AlgoRevision": AlgoRevision,
    "HtmlIntro": HtmlIntro,
    "CssIntro": CssIntro,
    "BoxModelIntro": BoxModelIntro,
    "ProjetCarteProfil": ProjetCarteProfil,
    "JsBasics": JsBasics,
    "JsDom": JsDom,
    "JsEvents": JsEvents,
    "JsCounter": JsCounter,
    "JsQuiz": JsQuiz,
    "GitIntro": GitIntro,
    "GitCommit": GitCommit,
    "GitPush": GitPush,
    "GitTerminalGame": GitTerminalGame,
    "JavaIntro": JavaIntro,
    "JavaJvm": JavaJvm,
    "JavaVariables": JavaVariables,
    "JavaArrays": JavaArrays,
    "JavaQuiz": JavaQuiz,
    "JavaConditions": JavaConditions,
    "JavaLoops": JavaLoops,
};

export default function CourseDetail() {
    const { theme, courseId } = useParams();

    // Mapping d'URL
    const themeMap = { "algo": "algorithme", "java": "java", "git": "git", "html": "html", "javascript": "JavaScript" };
    const dataKey = themeMap[theme.toLowerCase()] || theme.toLowerCase();

    const themeData = lessonsData[dataKey];
    if (!themeData) return <div className="p-20 text-white">Thème non trouvé...</div>;

    // Recherche du cours (Number(courseId) transforme "2" en 2)
    const currentCourse = themeData.levels
        .flatMap(level => level.courses)
        .find(c => c.id === Number(courseId));

    if (!currentCourse) return <div className="p-20 text-white">Cours {courseId} non trouvé dans les données.</div>;

    // Récupération du composant
    const SelectedLesson = componentsMap[currentCourse.component];

    // C'EST ICI QUE TU VOIS LE MESSAGE D'ERREUR
    if (!SelectedLesson) {
        return (
            <div className="min-h-screen bg-slate-900 text-white p-20">
                <h2 className="text-xl font-bold text-rose-400">Erreur de liaison !</h2>
                <p className="mt-4 text-slate-400">
                    Tu essaies d'ouvrir : <span className="text-teal-400 font-mono">{currentCourse.component}</span>
                </p>
                <p className="mt-2">
                    Vérifie que <span className="font-bold">ConditionIntro</span> est bien écrit dans ton <span className="italic">componentsMap</span>.
                </p>
            </div>
        );
    }

    return <SelectedLesson />;
}