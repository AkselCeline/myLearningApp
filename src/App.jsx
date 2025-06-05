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
import AlgorithmeIntro from './pages/lessons/AlgorithmeIntro';
import ConditionIntro from './pages/lessons/ConditionIntro';
import BoucleIntro from './pages/lessons/BoucleIntro';
import VariableIntro from './pages/lessons/VariableIntro';
import FunctionIntro from './pages/lessons/FunctionIntro';
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


export default function App() {
  return (
    <Router>
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
          <Route path="/lessons/algorithme/course/intro" element={<AlgorithmeIntro />} />
          <Route path="/lessons/algorithme/course/conditionIntro" element={<ConditionIntro />} />
          <Route path="/lessons/algorithme/course/boucleIntro" element={<BoucleIntro />} />
          <Route path="/lessons/algorithme/course/variableIntro" element={<VariableIntro />} />
          <Route path="/lessons/algorithme/course/functionIntro" element={<FunctionIntro />} />
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
    </Router>
  );
}
