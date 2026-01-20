import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import LessonPage from './pages/LessonPage';
import CourseDetail from "./pages/CourseDetail";
import AlgorithmeIntro from './pages/lessons/algo/AlgorithmeIntro';
import ConditionIntro from './pages/lessons/algo/ConditionIntro';
import BoucleIntro from './pages/lessons/algo/BoucleIntro';
import VariableIntro from './pages/lessons/algo/VariableIntro';
import FunctionIntro from './pages/lessons/algo/FonctionIntro';
import HtmlIntro from './pages/lessons/html/HtmlIntro';
import CssIntro from './pages/lessons/html/CssIntro';
import BoxModelIntro from './pages/lessons/html/BoxModelIntro';
import ProjetCarteProfil from './pages/lessons/html/ProjetCarteProfil';
import JsBasics from './pages/lessons/JavaScript/JsBasics';
import JsDom from "./pages/lessons/JavaScript/JsDom";
import JsEvents from "./pages/lessons/JavaScript/JsEvents";
import JsQuiz from "./pages/lessons/JavaScript/JsQuiz";
import GitIntro from "./pages/lessons/git/GitIntro";
import GitCommit from "./pages/lessons/git/GitCommit";
import GitPush from "./pages/lessons/git/GitPush";
import GitTerminalGame from "./pages/lessons/git/GitTerminalGame";
import JavaIntro from "./pages/lessons/java/JavaIntro";
import JavaJvm from "./pages/lessons/java/JavaJvm";
import JavaVariables from "./pages/lessons/java/JavaVariables";
import JavaArrays from "./pages/lessons/java/JavaArrays";
import JavaQuiz from "./pages/lessons/java/JavaQuiz";
import JavaConditions from "./pages/lessons/java/JavaConditions";
import LogicGameIntro from './pages/lessons/LogicGameIntro';
import ConsoleLogIntro from './pages/lessons/ConsoleLogIntro';
import LetVariablesIntro from './pages/lessons/LetVariablesIntro';
import IfConditionIntro from './pages/lessons/IfConditionIntro';
import FirstAlgorithmGame from './pages/lessons/FirstAlgorithmGame';
import PrixTTC from './pages/lessons/PrixTTC';
import LeapYearLesson from './pages/lessons/LeapYearLesson';
import InputRangeLesson from './pages/lessons/InputRangeLesson';
import LoopAnimation from './pages/lessons/LoopAnimation';
import PositiveNegativeLesson from './pages/lessons/PositiveNegativeLesson';
import AlphabetOrderLesson from './pages/lessons/AlphabetOrderLesson';
import EvenOddLesson from './pages/lessons/EvenOddLesson';
import {UserProvider} from "./context/UserContext";
import JavaLoops from "./pages/lessons/java/JavaLoops";



export default function App() {
    return (
        <UserProvider>
            <Router>
                <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 dark:text-slate-100 transition-colors duration-300">
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/profil" element={<Profile />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/parametres" element={<Settings />} />
                        <Route path="/lessons/:theme" element={<LessonPage />} />
                        <Route path="/lessons/:theme/course/:courseId" element={<CourseDetail />} />
                        <Route path="/lesshtmlons/algorithme/course/intro" element={<AlgorithmeIntro />} />
                        <Route path="/lessons/algorithme/course/conditionIntro" element={<ConditionIntro />} />
                        <Route path="/lessons/algorithme/course/boucleIntro" element={<BoucleIntro />} />
                        <Route path="/lessons/algorithme/course/variableIntro" element={<VariableIntro />} />
                        <Route path="/lessons/algorithme/course/functionIntro" element={<FunctionIntro />} />
                        <Route path="/lessons/html/course/HtmlIntro" element={<HtmlIntro />} />
                        <Route path="/lessons/html/course/CssIntro" element={<CssIntro />} />
                        <Route path="/lessons/html/course/BoxModelIntro" element={<BoxModelIntro />} />
                        <Route path="/lessons//course/ProjetCarteProfil" element={<ProjetCarteProfil />} />
                        <Route path="/lessons/JavaScript/course/JsBasics" element={<JsBasics />} />
                        <Route path="/lessons/JavaScript/course/JsDom" element={<JsDom />} />
                        <Route path="/lessons/JavaScript/course/JsEvents" element={<JsEvents />} />
                        <Route path="/lessons/JavaScript/course/JsQuiz" element={<JsQuiz />} />
                        <Route path="/lessons/git/course/GitIntro" element={<GitIntro />} />
                        <Route path="/lessons/git/course/GitCommit" element={<GitCommit />} />
                        <Route path="/lessons/git/course/GitPush" element={<GitPush />} />
                        <Route path="/lessons/git/course/GitTerminalGame" element={<GitTerminalGame />} />
                        <Route path="/lessons/java/course/JavaIntro" element={<JavaIntro />} />
                        <Route path="/lessons/java/course/JavaJvm" element={<JavaJvm />} />
                        <Route path="/lessons/java/course/JavaVariables" element={<JavaVariables />} />
                        <Route path="/lessons/java/course/JavaArrays" element={<JavaArrays />} />
                        <Route path="/lessons/java/course/JavaQuiz" element={<JavaQuiz />} />
                        <Route path="/lessons/java/course/JavaConditions" element={<JavaConditions />} />
                        <Route path="/lessons/java/course/JavaLoops" element={<JavaLoops />} />
                        <Route path="/lessons/algorithme/course/logicGameIntro" element={<LogicGameIntro />} />
                        <Route path="/lessons/algorithme/course/consoleLogIntro" element={<ConsoleLogIntro />} />
                        <Route path="/lessons/algorithme/course/letVariablesIntro" element={<LetVariablesIntro />} />
                        <Route path="/lessons/algorithme/course/firstAlgorithmGame" element={<FirstAlgorithmGame />} />
                        <Route path="/lessons/algorithme/course/ifConditionIntro" element={<IfConditionIntro />} />
                        <Route path="/lessons/algorithme/course/prixTTC" element={<PrixTTC />} />
                        <Route path="/lessons/algorithme/course/leapYearLesson" element={<LeapYearLesson />} />
                        <Route path="/lessons/algorithme/course/inputRangeLesson" element={<InputRangeLesson />} />
                        <Route path="/lessons/algorithme/course/loopAnimation" element={<LoopAnimation />} />
                        <Route path="/lessons/algorithme/course/positiveNegativeLesson" element={<PositiveNegativeLesson />} />
                        <Route path="/lessons/algorithme/course/alphabetOrderLesson" element={<AlphabetOrderLesson />} />
                        <Route path="/lessons/algorithme/course/evenOddLesson" element={<EvenOddLesson />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}
