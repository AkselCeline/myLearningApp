import React, { useState, useEffect } from 'react';

const dragItems = [
    { id: 'pos', label: 'Positif', color: 'bg-blue-500', icon: '➕' },
    { id: 'neg', label: 'Négatif', color: 'bg-rose-500', icon: '➖' },
    { id: 'nul', label: 'Nul', color: 'bg-slate-500', icon: '⭕' },
];

const numbersToSort = [
    { id: 1, value: 10, correct: 'pos' },
    { id: 2, value: -5, correct: 'neg' },
    { id: 3, value: 0, correct: 'nul' },
    { id: 4, value: 3, correct: 'pos' },
    { id: 5, value: -12, correct: 'neg' },
];

export default function PositiveNegativeLesson() {
    const [userAnswer, setUserAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);
    const [step, setStep] = useState(0);
    const [draggingId, setDraggingId] = useState(null);
    const [assignments, setAssignments] = useState({});
    const [gameResult, setGameResult] = useState(null);

    const exampleNumber = -7;

    const animationSteps = [
        `Donnée reçue : ${exampleNumber}`,
        exampleNumber > 0 ? 'Analyse : > 0' : exampleNumber < 0 ? 'Analyse : < 0' : 'Analyse : === 0',
        exampleNumber > 0 ? 'Résultat : POSITIF' : exampleNumber < 0 ? 'Résultat : NÉGATIF' : 'Résultat : NUL',
    ];

    useEffect(() => {
        if (step < animationSteps.length - 1) {
            const timer = setTimeout(() => setStep(step + 1), 1500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    function checkAnswer(e) {
        e.preventDefault();
        const ans = userAnswer.trim().toLowerCase();
        const isCorrect = (exampleNumber < 0 && (ans === 'négatif' || ans === 'negatif')) ||
            (exampleNumber > 0 && ans === 'positif') ||
            (exampleNumber === 0 && ans === 'nul');
        setQuizResult(isCorrect);
    }

    const handleDrop = (numberId) => {
        if (!draggingId) return;
        setAssignments(prev => ({ ...prev, [numberId]: draggingId }));
        setDraggingId(null);
        setGameResult(null);
    };

    function checkGame() {
        if (Object.keys(assignments).length < numbersToSort.length) return;
        const allCorrect = numbersToSort.every(n => assignments[n.id] === n.correct);
        setGameResult(allCorrect);
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header Conceptuel */}
            <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden text-center sm:text-left">
                <div className="relative z-10">
                    <h2 className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4">L'axe des nombres</h2>
                    <p className="text-2xl font-black leading-tight">
                        Comparer par rapport à <span className="text-blue-400 italic">Zéro</span>.
                    </p>
                    <p className="mt-4 text-slate-400 text-sm font-medium">
                        C'est la base de la détection d'erreurs, de scores ou de stocks.
                    </p>
                </div>
                <div className="absolute -right-10 -top-10 opacity-10 text-[15rem] font-black italic">±</div>
            </section>



            {/* Terminal d'Analyse Automatique */}
            <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-slate-800 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Scanner Logique</span>
                </div>
                <div className="space-y-2 h-20 flex flex-col justify-center items-center text-center">
                    <div className="text-blue-400 font-black text-xl tracking-tighter transition-all duration-500">
                        {animationSteps[step]}
                    </div>
                </div>
            </div>

            {/* Quiz Rapide */}
            <section className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm">
                <form onSubmit={checkAnswer} className="space-y-4 text-center">
                    <label className="block text-slate-600 font-black text-sm uppercase tracking-tighter mb-4">
                        Selon l'algorithme, {exampleNumber} est un nombre...
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={e => {setUserAnswer(e.target.value); setQuizResult(null);}}
                            className="flex-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold text-center"
                            placeholder="positif, négatif ou nul ?"
                        />
                        <button type="submit" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95">
                            Vérifier
                        </button>
                    </div>
                    {quizResult !== null && (
                        <div className={`p-4 rounded-xl font-black animate-question ${quizResult ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {quizResult ? '✨ Parfait ! Tu as l\'œil.' : '❌ Regarde bien le signe devant le nombre.'}
                        </div>
                    )}
                </form>
            </section>

            {/* Jeu de Tri : L'Usine de Particules */}
            <section className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200">
                <div className="text-center mb-8">
                    <h3 className="text-xl font-black text-slate-800 uppercase italic underline decoration-blue-500">L'Usine de Tri</h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase mt-2">Glisse l'étiquette sur la valeur</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    {/* Colonne Nombres */}
                    <div className="grid grid-cols-1 gap-3 w-full max-w-[200px]">
                        {numbersToSort.map(n => (
                            <div
                                key={n.id}
                                onDrop={() => handleDrop(n.id)}
                                onDragOver={e => e.preventDefault()}
                                className={`h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                                    assignments[n.id]
                                        ? 'bg-white border-blue-400 shadow-md scale-105'
                                        : 'bg-slate-100 border-slate-200 border-dashed'
                                }`}
                            >
                                <span className="text-xl font-black text-slate-700">{n.value}</span>
                                {assignments[n.id] && (
                                    <span className="text-[8px] font-black uppercase text-blue-500 tracking-widest animate-question">
                                        {dragItems.find(d => d.id === assignments[n.id])?.label}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Séparateur */}
                    <div className="hidden md:block w-px h-64 bg-slate-200"></div>

                    {/* Étiquettes Draggable */}
                    <div className="flex flex-row md:flex-col gap-3">
                        {dragItems.map(item => (
                            <div
                                key={item.id}
                                draggable
                                onDragStart={() => setDraggingId(item.id)}
                                className={`${item.color} text-white px-6 py-4 rounded-2xl font-black cursor-grab active:cursor-grabbing shadow-lg shadow-slate-200 hover:-translate-y-1 transition-all flex items-center gap-2`}
                            >
                                <span className="bg-white/20 p-1 rounded-lg text-lg leading-none">{item.icon}</span>
                                <span className="hidden sm:inline">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center gap-4">
                    <button
                        onClick={checkGame}
                        className="w-full sm:w-auto bg-blue-600 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        Vérifier le tri
                    </button>
                    {gameResult !== null && (
                        <div className={`p-6 rounded-[2rem] font-black animate-question text-center ${gameResult ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                            {gameResult ? '🏆 TOUT EST BIEN TRIÉ ! Tu maîtrises la logique numérique.' : '⚙️ Quelques erreurs détectées dans les compartiments...'}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}