import React, { useState } from 'react';

const steps = [
    { id: 1, text: 'Prendre une tasse' },
    { id: 2, text: 'Mettre du café moulu' },
    { id: 3, text: 'Verser de l’eau chaude' },
    { id: 4, text: 'Mélanger' },
    { id: 5, text: 'Boire' },
];

export default function AlgorithmeIntro() {
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);

    const [orderedSteps, setOrderedSteps] = useState(shuffleArray(steps));
    const [draggedId, setDraggedId] = useState(null);
    const [orderResult, setOrderResult] = useState(null);

    function shuffleArray(array) {
        return [...array]
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    function handleQuizSubmit(e) {
        e.preventDefault();
        // Validation plus souple (minuscules et trim)
        if (quizAnswer.toLowerCase().trim() === 'prendre une tasse') {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    function handleDragStart(id) { setDraggedId(id); }
    function handleDragOver(e) { e.preventDefault(); }

    function handleDrop(id) {
        const draggedIndex = orderedSteps.findIndex(s => s.id === draggedId);
        const dropIndex = orderedSteps.findIndex(s => s.id === id);
        const newOrder = [...orderedSteps];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, orderedSteps[draggedIndex]);
        setOrderedSteps(newOrder);
        setDraggedId(null);
    }

    function checkOrder() {
        const correct = orderedSteps.every((step, idx) => step.id === steps[idx].id);
        setOrderResult(correct);
    }

    return (
        <div className="space-y-12 py-4 animate-question">
            {/* Introduction visuelle */}
            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-2xl">
                <p className="text-slate-700 text-lg leading-relaxed">
                    Un <span className="font-black text-teal-700">algorithme</span>, c’est comme une recette de cuisine : une suite précise d’instructions pour atteindre un objectif.
                </p>
            </div>

            {/* Liste statique des étapes */}
            <section>
                <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <span className="text-2xl">☕</span> Exemple : Préparer un café
                </h2>
                <div className="grid gap-3">
                    {steps.map((step, idx) => (
                        <div key={step.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 text-sm">
                                {idx + 1}
                            </span>
                            <span className="text-slate-600 font-semibold">{step.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mini quiz interactif */}
            <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-800 mb-4">Quiz rapide</h3>
                <form onSubmit={handleQuizSubmit} className="space-y-4">
                    <label className="block text-slate-600 font-medium mb-2">
                        Quelle est la première étape pour préparer un café ?
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            className="flex-1 p-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-bold text-slate-700"
                            value={quizAnswer}
                            onChange={e => setQuizAnswer(e.target.value)}
                            placeholder="Écris ta réponse..."
                        />
                        <button
                            type="submit"
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95"
                        >
                            Valider
                        </button>
                    </div>
                </form>
                {quizResult !== null && (
                    <div className={`mt-4 p-4 rounded-xl font-bold flex items-center gap-2 animate-question ${quizResult ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                        {quizResult ? "✅ Bravo ! C'est exactement ça." : "❌ Pas tout à fait, regarde bien la liste plus haut !"}
                    </div>
                )}
            </section>

            {/* Jeu de mise en ordre (Drag & Drop) */}
            <section>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h3 className="text-xl font-black text-slate-800">Mets les étapes dans l'ordre</h3>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                        Glisser-Déposer 👆
                    </span>
                </div>

                <ul className="space-y-3">
                    {orderedSteps.map((step) => (
                        <li
                            key={step.id}
                            draggable
                            onDragStart={() => handleDragStart(step.id)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(step.id)}
                            className={`group flex items-center p-5 bg-white border-2 rounded-2xl cursor-grab active:cursor-grabbing transition-all ${
                                draggedId === step.id ? "opacity-30 border-dashed border-teal-300" : "border-slate-100 hover:border-teal-200 hover:shadow-md"
                            }`}
                        >
                            <div className="mr-4 text-slate-300 group-hover:text-teal-400 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                            </div>
                            <span className="font-bold text-slate-700">{step.text}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        onClick={checkOrder}
                        className="w-full sm:w-auto bg-teal-500 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-teal-200 hover:bg-teal-600 transition-all hover:-translate-y-1 active:scale-95"
                    >
                        Vérifier l'ordre final
                    </button>

                    {orderResult !== null && (
                        <div className={`w-full p-5 rounded-[1.5rem] text-center font-black animate-question ${orderResult ? "bg-emerald-500 text-white shadow-xl shadow-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-100"}`}>
                            {orderResult ? "🏆 Magnifique ! Tu as l'esprit d'un programmeur." : "🧐 Il y a encore un petit mélange, réessaie !"}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}