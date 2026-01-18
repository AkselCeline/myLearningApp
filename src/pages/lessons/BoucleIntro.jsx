import React, { useState } from 'react';

const countingSteps = [1, 2, 3, 4, 5];

export default function BoucleIntro() {
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);
    const [shuffledNumbers, setShuffledNumbers] = useState(shuffleArray(countingSteps));
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
        if (quizAnswer.trim() === '3') {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    const handleDragStart = (id) => setDraggedId(id);
    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (id) => {
        const draggedIndex = shuffledNumbers.indexOf(draggedId);
        const dropIndex = shuffledNumbers.indexOf(id);
        const newOrder = [...shuffledNumbers];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, draggedId);
        setShuffledNumbers(newOrder);
        setDraggedId(null);
    };

    function checkOrder() {
        const correct = shuffledNumbers.every((num, idx) => num === countingSteps[idx]);
        setOrderResult(correct);
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Concept de base */}
            <div className="bg-sky-50 border-l-4 border-sky-500 p-6 rounded-r-2xl">
                <p className="text-slate-700 text-lg leading-relaxed">
                    Une <span className="font-black text-sky-700">boucle</span> est un super-pouvoir qui permet de répéter une action sans avoir à l'écrire plusieurs fois. C'est l'outil parfait pour les tâches répétitives !
                </p>
            </div>

            {/* Illustration visuelle */}


            [Image of a for loop flowchart]

            <section>
                <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <span className="text-2xl">🔄</span> Exemple : Compter jusqu'à 5
                </h2>
                <div className="flex flex-wrap gap-3">
                    {countingSteps.map((num) => (
                        <div key={num} className="flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-900 border-2 border-sky-100 rounded-xl shadow-sm text-sky-600 font-black text-xl animate-bounce" style={{ animationDelay: `${num * 0.1}s` }}>
                            {num}
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-slate-500 text-sm italic">Imagine devoir écrire "Afficher 1", "Afficher 2"... une boucle le fait pour toi en 3 lignes !</p>
            </section>

            {/* Quiz Interactif */}
            <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-800 mb-4">Quiz logique</h3>
                <form onSubmit={handleQuizSubmit} className="space-y-4">
                    <label className="block text-slate-600 font-medium mb-2">
                        Si une boucle demande à l'ordinateur de dire "Bonjour !" 3 fois de suite, combien de fois entendras-tu "Bonjour !" ?
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="number"
                            className="flex-1 p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-sky-500 outline-none font-bold text-slate-700 transition-all text-center"
                            value={quizAnswer}
                            onChange={e => setQuizAnswer(e.target.value)}
                            placeholder="Écris le chiffre..."
                        />
                        <button
                            type="submit"
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                        >
                            Vérifier
                        </button>
                    </div>
                </form>
                {quizResult !== null && (
                    <div className={`mt-4 p-4 rounded-xl font-bold flex items-center gap-2 animate-question ${quizResult ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                        {quizResult ? "✨ Exact ! La boucle se répète précisément le nombre de fois demandé." : "❌ Pas tout à fait. La boucle ne change pas le compte !"}
                    </div>
                )}
            </section>

            {/* Jeu : Remettre les étapes en boucle */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-xl font-black text-slate-800">Répare la séquence</h3>
                        <p className="text-slate-400 text-sm">Remets les nombres dans l'ordre pour que la boucle fonctionne.</p>
                    </div>
                    <span className="text-[10px] font-black bg-sky-100 text-sky-600 px-3 py-1 rounded-full uppercase tracking-widest mb-1">
                        Interactif
                    </span>
                </div>

                <ul className="flex flex-col gap-3">
                    {shuffledNumbers.map((num) => (
                        <li
                            key={num}
                            draggable
                            onDragStart={() => handleDragStart(num)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(num)}
                            className={`flex items-center p-5 bg-white dark:bg-slate-900 border-2 rounded-2xl cursor-grab active:cursor-grabbing transition-all ${
                                draggedId === num ? "opacity-20 scale-95 border-dashed border-sky-300" : "border-slate-100 hover:border-sky-200 hover:shadow-md"
                            }`}
                        >
                            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center font-black mr-4 border border-sky-100">
                                {num}
                            </div>
                            <span className="font-bold text-slate-700">Nombre {num}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        onClick={checkOrder}
                        className="w-full sm:w-auto bg-sky-500 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-sky-100 hover:bg-sky-600 transition-all hover:-translate-y-1 active:scale-95"
                    >
                        Valider l'ordre
                    </button>

                    {orderResult !== null && (
                        <div className={`w-full p-6 rounded-[2rem] text-center font-black animate-question ${orderResult ? "bg-emerald-500 text-white shadow-xl shadow-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-100"}`}>
                            {orderResult ? "🏆 Parfait ! Ta boucle est maintenant prête à tourner à l'infini." : "🧐 Un chiffre n'est pas à sa place, réessaie !"}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}