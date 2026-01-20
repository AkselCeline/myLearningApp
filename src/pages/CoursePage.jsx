import React from 'react';
import { useParams } from 'react-router-dom';
import lessonsData from '../data/lessonsData';

// N'oublie pas d'importer tes composants de leçons ici
import AlgorithmeIntro from './lessons/algo/AlgorithmeIntro';
import ConditionIntro from "./lessons/algo/ConditionIntro";
import BoucleIntro from "./lessons/algo/BoucleIntro";
import VariableIntro from "./lessons/algo/VariableIntro";
import FonctionIntro from "./lessons/algo/FonctionIntro";
import TableauIntro from "./lessons/algo/TableauIntro";
import AlgoRevision from "./lessons/algo/AlgoRevision";
import HtmlIntro from "./lessons/html/HtmlIntro";
import CssIntro from "./lessons/html/CssIntro"
import BoxModelIntro from "./lessons/html/BoxModelIntro";
import ProjetCarteProfil from './lessons/html/ProjetCarteProfil';
import JsBasics from './lessons/JavaScript/JsBasics';
import JsDom from './lessons/JavaScript/JsDom';
import JsEvents from './lessons/JavaScript/JsEvents';
import JsCounter from "./lessons/JavaScript/JsCounter";
import JsQuiz from "./lessons/JavaScript/JsQuiz";
import GitIntro from "./lessons/git/GitIntro";
import GitCommit from "./lessons/git/GitCommit";
import GitPush from "./lessons/git/GitPush";
import GitTerminalGame from "./lessons/git/GitTerminalGame";
import JavaIntro from "./lessons/java/JavaIntro";
import JavaJvm from "./lessons/java/JavaJvm";
import JavaArrays from "./lessons/java/JavaArrays";
import JavaVariables from "./lessons/java/JavaVariables";
import JavaQuiz from "./lessons/java/JavaQuiz";
import JavaConditions from "./lessons/java/JavaConditions";
import JavaLoops from "./lessons/java/JavaLoops";

const componentsMap = {
    AlgorithmeIntro: AlgorithmeIntro,
    ConditionIntro: ConditionIntro,
    BoucleIntro: BoucleIntro,
    VariableIntro: VariableIntro,
    FonctionIntro: FonctionIntro,
    TableauIntro: TableauIntro,
    AlgoRevision: AlgoRevision,
    HtmlIntro: HtmlIntro,
    CssIntro: CssIntro,
    BoxModelIntro: BoxModelIntro,
    ProjetCarteProfil: ProjetCarteProfil,
    JsBasics: JsBasics,
    JsDom: JsDom,
    JsEvents: JsEvents,
    JsCounter: JsCounter,
    JsQuiz: JsQuiz,
    GitIntro: GitIntro,
    GitCommit: GitCommit,
    GitPush: GitPush,
    GitTerminalGame: GitTerminalGame,
    JavaIntro: JavaIntro,
    JavaJvm: JavaJvm,
    JavaVariables: JavaVariables,
    JavaArrays: JavaArrays,
    JavaQuiz: JavaQuiz,
    JavaConditions: JavaConditions,
    JavaLoops: JavaLoops,
};

export default function CoursePage() {
    const { theme, courseId } = useParams();

    // 1. Traduction de l'URL vers la clé du JSON
    const themeMap = {
        "algo": "algorithme",
        "java": "java",
        "git": "git"
    };

    const dataKey = themeMap[theme.toLowerCase()] || theme.toLowerCase();
    const themeData = lessonsData[dataKey];

    // Sécurité si le thème n'existe pas
    if (!themeData) {
        return <div className="p-20 text-center dark:text-white">Thème "{theme}" introuvable.</div>;
    }

    // --- 4. RECHERCHE DU COURS ---
    // On aplatit les niveaux (levels) pour chercher dans tous les cours (courses)
    // IMPORTANT : Number(courseId) car l'URL donne du texte, mais l'ID est un nombre
    const currentCourse = themeData.levels
        .flatMap(level => level.courses)
        .find(c => c.id === Number(courseId));

    if (!currentCourse) {
        return (
            <div className="p-20 text-center dark:text-white">
                <h1 className="text-2xl font-bold">Oups ! Cours introuvable</h1>
                <p className="text-slate-500">L'ID {courseId} n'existe pas dans le parcours {themeData.theme}.</p>
            </div>
        );
    }

    // --- 5. RÉCUPÉRATION DU COMPOSANT REACT ---
    const SelectedLesson = componentsMap[currentCourse.component];

    if (!SelectedLesson) {
        return (
            <div className="p-20 text-center dark:text-white">
                <h2 className="text-xl font-bold">Composant non lié 🚧</h2>
                <p className="text-slate-500">Le fichier pour "{currentCourse.component}" n'est pas encore connecté dans CourseDetail.jsx.</p>
            </div>
        );
    }

    // --- 6. RENDU FINAL ---
    return (
        <div className="animate-in fade-in duration-500">
            <SelectedLesson />
        </div>
    );
}