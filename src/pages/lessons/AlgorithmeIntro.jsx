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
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    // Quiz validation
    function handleQuizSubmit(e) {
        e.preventDefault();
        if (quizAnswer === 'Prendre une tasse') {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    // Drag & Drop handlers
    function handleDragStart(id) {
        setDraggedId(id);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(id) {
        const draggedIndex = orderedSteps.findIndex(s => s.id === draggedId);
        const dropIndex = orderedSteps.findIndex(s => s.id === id);
        const newOrder = [...orderedSteps];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, orderedSteps[draggedIndex]);
        setOrderedSteps(newOrder);
        setDraggedId(null);
    }

    // Validate order
    function checkOrder() {
        const correct = orderedSteps.every((step, idx) => step.id === steps[idx].id);
        setOrderResult(correct);
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-8 font-sans">
            <p className="text-lg">
                Un algorithme, c’est comme une recette de cuisine : c’est une suite d’instructions pour faire quelque chose.
            </p>

            <h2 className="text-2xl font-semibold mt-6">Exemple : Préparer un café</h2>
            <ol className="list-decimal list-inside space-y-1">
                {steps.map(step => (
                    <li key={step.id}>{step.text}</li>
                ))}
            </ol>

            {/* Mini quiz */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold">Quiz rapide</h3>
                <form onSubmit={handleQuizSubmit} className="mt-2 space-y-2">
                    <label className="block">
                        Quelle est la première étape pour préparer un café ?
                        <input
                            type="text"
                            className="block border border-gray-400 rounded px-2 py-1 mt-1 w-full"
                            value={quizAnswer}
                            onChange={e => setQuizAnswer(e.target.value)}
                            placeholder="Écris ta réponse ici"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Valider
                    </button>
                </form>
                {quizResult === true && <p className="mt-2 text-green-600 font-semibold">Bravo ! C’est la bonne réponse.</p>}
                {quizResult === false && <p className="mt-2 text-red-600 font-semibold">Essaie encore :)</p>}
            </section>

            {/* Jeu de mise en ordre */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Mets les étapes dans le bon ordre</h3>
                <ul className="space-y-2">
                    {orderedSteps.map(step => (
                        <li
                            key={step.id}
                            draggable
                            onDragStart={() => handleDragStart(step.id)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(step.id)}
                            className="border border-gray-300 rounded px-4 py-2 cursor-move bg-gray-50 hover:bg-gray-100"
                        >
                            {step.text}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={checkOrder}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Vérifier l’ordre
                </button>
                {orderResult === true && <p className="mt-2 text-green-600 font-semibold">Super ! Tu as tout mis dans le bon ordre.</p>}
                {orderResult === false && <p className="mt-2 text-red-600 font-semibold">Pas encore, essaie de nouveau.</p>}
            </section>
        </div>
    );
}
