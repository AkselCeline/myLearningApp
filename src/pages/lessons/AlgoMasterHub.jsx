import React, { useState } from 'react';
// Importation de tes composants (assure-toi que les noms correspondent)
import VariableIntro from './algo/VariableIntro';
import LetVariablesIntro from './LetVariablesIntro';
import InverserVariables from './InverserVariables';
import PositiveNegativeLesson from './PositiveNegativeLesson';
import LogicGameIntro from './LogicGameIntro';
import LeapYearLesson from './LeapYearLesson';
import LoopAnimation from './LoopAnimation';
import AlgoPrixHTTTC from './AlgoPrixHTTTC';

export default function AlgoMasterHub() {
    const [activeTab, setActiveTab] = useState('home');
    const [completed, setCompleted] = useState([]);

    const modules = [
        { id: 'vars', title: 'Les Variables', icon: '📦', color: 'bg-amber-500', component: <VariableIntro /> },
        { id: 'let', title: 'Déclaration let', icon: '✍️', color: 'bg-orange-500', component: <LetVariablesIntro /> },
        { id: 'swap', title: 'L\'Échange (Swap)', icon: '🔄', color: 'bg-sky-500', component: <InverserVariables /> },
        { id: 'posneg', title: 'Signes & Nombres', icon: '⚖️', color: 'bg-rose-500', component: <PositiveNegativeLesson /> },
        { id: 'logic', title: 'Jeu de Logique', icon: '🕵️', color: 'bg-emerald-500', component: <LogicGameIntro /> },
        { id: 'leap', title: 'Année Bissextile', icon: '📅', color: 'bg-indigo-500', component: <LeapYearLesson /> },
        { id: 'loops', title: 'Boucles FOR', icon: '🔁', color: 'bg-violet-500', component: <LoopAnimation /> },
        { id: 'ttc', title: 'Calcul de Taxe', icon: '💶', color: 'bg-blue-600', component: <AlgoPrixHTTTC /> },
    ];

    const currentModule = modules.find(m => m.id === activeTab);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 dark:text-slate-100 pb-20">
            {/* Header Global */}
            <nav className="bg-white dark:bg-slate-900 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 px-6 py-4">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setActiveTab('home')}
                    >
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <span className="font-black text-xl">A</span>
                        </div>
                        <h1 className="font-black tracking-tighter text-xl">ALGO<span className="text-indigo-600">LAB</span></h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progression</p>
                            <p className="font-bold text-sm text-indigo-600">{completed.length} / {modules.length} modules</p>
                        </div>
                        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-600 transition-all duration-500"
                                style={{ width: `${(completed.length / modules.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 pt-10">
                {activeTab === 'home' ? (
                    <>
                        <header className="mb-12">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Prêt à devenir <br/><span className="text-indigo-600 italic">développeur ?</span></h2>
                            <p className="text-slate-500 font-medium max-w-lg">Sélectionne un module pour explorer les concepts fondamentaux de l'algorithmique à travers des expériences interactives.</p>
                        </header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {modules.map((module) => (
                                <button
                                    key={module.id}
                                    onClick={() => setActiveTab(module.id)}
                                    className="group relative bg-white dark:bg-slate-900 dark:bg-slate-900 p-6 rounded-[2rem] border-2 border-slate-100 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-100 transition-all text-left flex flex-col h-48 active:scale-95"
                                >
                                    <div className={`${module.color} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg mb-4 group-hover:rotate-12 transition-transform`}>
                                        {module.icon}
                                    </div>
                                    <h3 className="font-black text-slate-800 leading-tight mb-2">{module.title}</h3>
                                    <span className="mt-auto text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                                        Commencer <span>→</span>
                                    </span>
                                    {completed.includes(module.id) && (
                                        <div className="absolute top-4 right-4 text-emerald-500 text-xl">✅</div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="animate-question">
                        {/* Bouton Retour */}
                        <button
                            onClick={() => setActiveTab('home')}
                            className="mb-8 flex items-center gap-2 text-slate-400 font-bold hover:text-indigo-600 transition-colors group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour au menu
                        </button>

                        {/* Contenu du Module */}
                        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200/50 p-2 sm:p-10 border border-slate-100">
                            {currentModule.component}

                            {/* Validation du module */}
                            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center">
                                {!completed.includes(activeTab) ? (
                                    <button
                                        onClick={() => setCompleted([...completed, activeTab])}
                                        className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95"
                                    >
                                        Marquer comme terminé ✨
                                    </button>
                                ) : (
                                    <div className="text-emerald-500 font-black flex items-center gap-2 uppercase tracking-widest text-sm">
                                        ✨ Module complété ! ✨
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}