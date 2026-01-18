import React, { useState } from 'react';

const weatherConditions = [
    {
        id: 1,
        condition: 'Il pleut',
        emoji: '🌧️',
        actions: ['Prendre un parapluie', 'Mettre des lunettes de soleil', 'Mettre un manteau'],
        correctAction: 'Prendre un parapluie',
        color: 'blue'
    },
    {
        id: 2,
        condition: 'Il fait soleil',
        emoji: '☀️',
        actions: ['Mettre des lunettes de soleil', 'Prendre un parapluie', 'Mettre un manteau'],
        correctAction: 'Mettre des lunettes de soleil',
        color: 'amber'
    },
    {
        id: 3,
        condition: 'Il fait froid',
        emoji: '❄️',
        actions: ['Mettre un manteau', 'Prendre un parapluie', 'Mettre des lunettes de soleil'],
        correctAction: 'Mettre un manteau',
        color: 'sky'
    },
];

export default function ConditionIntroComplet() {
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);
    const [selectedWeather, setSelectedWeather] = useState(null);
    const [selectedAction, setSelectedAction] = useState('');
    const [gameFeedback, setGameFeedback] = useState('');

    function handleQuizSubmit(e) {
        e.preventDefault();
        if (quizAnswer.toLowerCase().trim() === 'prendre un parapluie') {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    function validateChoice() {
        if (!selectedWeather) return;
        const conditionData = weatherConditions.find(w => w.condition === selectedWeather);
        if (selectedAction === conditionData.correctAction) {
            setGameFeedback("success");
        } else {
            setGameFeedback("error");
        }
    }

    const activeWeatherData = weatherConditions.find(w => w.condition === selectedWeather);

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Intro Style "Code" */}
            <div className="bg-indigo-900 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-indigo-300 text-xs font-black uppercase tracking-[0.2em] mb-4">Le concept SI... ALORS</h3>
                    <p className="text-white text-xl font-medium leading-relaxed">
                        <span className="text-pink-400 font-black italic">SI</span> la condition est vraie, <br/>
                        <span className="text-emerald-400 font-black italic">ALORS</span> l'ordinateur fait l'action.
                    </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10 text-9xl font-black text-white">?</div>
            </div>

            {/* Liste visuelle des conditions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {weatherConditions.map((w) => (
                    <div key={w.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                        <span className="text-2xl">{w.emoji}</span>
                        <span className="text-slate-600 font-bold text-sm">{w.condition}</span>
                    </div>
                ))}
            </div>

            {/* Jeu d'association Interactif */}
            <section className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-xl shadow-slate-200/50">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-slate-800">Laboratoire de Conditions</h3>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Associe l'action à la météo</p>
                </div>

                {/* Étape 1 : Choisir la météo */}
                <div className="space-y-4">
                    <p className="text-slate-500 font-black text-[10px] uppercase tracking-tighter">Étape 1 : Choisir une météo</p>
                    <div className="flex flex-wrap gap-3">
                        {weatherConditions.map((w) => (
                            <button
                                key={w.id}
                                onClick={() => {
                                    setSelectedWeather(w.condition);
                                    setSelectedAction('');
                                    setGameFeedback('');
                                }}
                                className={`flex-1 py-4 px-6 rounded-2xl font-black transition-all flex items-center justify-center gap-2 border-b-4 active:border-b-0 active:translate-y-1 ${
                                    selectedWeather === w.condition
                                        ? "bg-indigo-600 text-white border-indigo-800 scale-105"
                                        : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                                }`}
                            >
                                <span className="text-xl">{w.emoji}</span>
                                {w.condition}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Étape 2 : Choisir l'action */}
                {selectedWeather && (
                    <div className="mt-10 space-y-6 animate-question">
                        <div className="h-px bg-slate-100 w-full"></div>
                        <p className="text-slate-500 font-black text-[10px] uppercase tracking-tighter">Étape 2 : Définir l'action</p>

                        <div className="grid gap-3">
                            {activeWeatherData.actions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setSelectedAction(action);
                                        setGameFeedback('');
                                    }}
                                    className={`p-5 rounded-2xl text-left font-bold transition-all border-2 ${
                                        selectedAction === action
                                            ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                                            : "bg-white border-slate-100 text-slate-600 hover:border-indigo-200"
                                    }`}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={validateChoice}
                            disabled={!selectedAction}
                            className={`w-full py-5 rounded-2xl font-black text-white text-lg transition-all shadow-lg ${
                                !selectedAction
                                    ? "bg-slate-300 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 hover:-translate-y-1"
                            }`}
                        >
                            Exécuter l'Algorithme
                        </button>
                    </div>
                )}

                {/* Feedback animé */}
                {gameFeedback && (
                    <div className={`mt-6 p-6 rounded-2xl text-center font-black animate-question ${
                        gameFeedback === 'success'
                            ? "bg-emerald-500 text-white shadow-xl shadow-emerald-200"
                            : "bg-rose-50 text-rose-600 border border-rose-100"
                    }`}>
                        {gameFeedback === 'success'
                            ? "✨ PARFAIT ! La condition est remplie avec succès."
                            : "❌ ERREUR : Cette action ne correspond pas à la météo."}
                    </div>
                )}
            </section>

            {/* Quiz Rapide de Fin */}
            <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-800 mb-6">Test de réflexe</h3>
                <form onSubmit={handleQuizSubmit} className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <label className="block text-slate-600 font-bold mb-4 italic">
                            "Si l'ordinateur détecte qu'il pleut..."
                        </label>
                        <input
                            type="text"
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all"
                            value={quizAnswer}
                            onChange={(e) => setQuizAnswer(e.target.value)}
                            placeholder="Que dois-je faire ?"
                        />
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-slate-800 transition-all">
                        Vérifier ma réponse
                    </button>
                </form>
                {quizResult !== null && (
                    <p className={`mt-4 text-center font-bold animate-question ${quizResult ? "text-emerald-600" : "text-rose-600"}`}>
                        {quizResult ? "✅ C'est juste ! Tu maîtrises les conditions." : "❌ Regarde bien l'exemple en haut !"}
                    </p>
                )}
            </section>
        </div>
    );
}