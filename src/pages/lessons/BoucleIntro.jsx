import React, { useState } from 'react';

const countingSteps = [1, 2, 3, 4, 5];

export default function BoucleIntro() {
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);

    const [shuffledNumbers, setShuffledNumbers] = useState(shuffleArray(countingSteps));
    const [draggedId, setDraggedId] = useState(null);
    const [orderResult, setOrderResult] = useState(null);

    function shuffleArray(array) {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    function handleQuizSubmit(e) {
        e.preventDefault();
        // Réponse correcte : 3 fois
        if (quizAnswer.trim() === '3') {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    function handleDragStart(id) {
        setDraggedId(id);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(id) {
        const draggedIndex = shuffledNumbers.indexOf(draggedId);
        const dropIndex = shuffledNumbers.indexOf(id);
        const newOrder = [...shuffledNumbers];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, draggedId);
        setShuffledNumbers(newOrder);
        setDraggedId(null);
    }

    function checkOrder() {
        const correct = shuffledNumbers.every((num, idx) => num === countingSteps[idx]);
        setOrderResult(correct);
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-8 font-sans">
            <p className="text-lg">
                Une <strong>boucle</strong> dans un algorithme sert à répéter plusieurs fois une action. Par exemple, afficher "Bonjour !" 5 fois.
            </p>

            <h2 className="text-2xl font-semibold mt-6">Exemple : Compter de 1 à 5</h2>
            <p>Voici les nombres de 1 à 5, répétés grâce à une boucle :</p>
            <ol className="list-decimal list-inside space-y-1">
                {countingSteps.map(num => (
                    <li key={num}>{num}</li>
                ))}
            </ol>

            {/* Quiz */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold">Quiz rapide</h3>
                <form onSubmit={handleQuizSubmit} className="mt-2 space-y-2">
                    <label className="block">
                        Combien de fois la phrase "Bonjour !" est affichée si on répète 3 fois ?
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
                <h3 className="text-xl font-semibold mb-2">Mets les nombres dans le bon ordre</h3>
                <p>Fais glisser et dépose les nombres pour les remettre dans l’ordre de 1 à 5 :</p>
                <ul className="space-y-2">
                    {shuffledNumbers.map(num => (
                        <li
                            key={num}
                            draggable
                            onDragStart={() => handleDragStart(num)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(num)}
                            className="border border-gray-300 rounded px-4 py-2 cursor-move bg-gray-50 hover:bg-gray-100"
                        >
                            {num}
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
