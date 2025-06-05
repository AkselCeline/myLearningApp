import React, { useState } from 'react';

const words = ['Banane', 'Pomme', 'Cerise', 'Abricot', 'Orange'];
const shuffledWords = words
    .map(word => ({ word, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ word }) => word);

export default function AlphabetOrderLesson() {
    const [userAnswer, setUserAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);

    const [orderedWords, setOrderedWords] = useState(shuffledWords);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [orderCheckResult, setOrderCheckResult] = useState(null);

    const [tutorialStep, setTutorialStep] = useState(0);

    function handleQuizSubmit(e) {
        e.preventDefault();
        if (userAnswer.trim().toLowerCase() === 'abricot') {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    function handleDragStart(index) {
        setDraggedIndex(index);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(dropIndex) {
        if (draggedIndex === null) return;
        const newOrder = [...orderedWords];
        const draggedItem = newOrder.splice(draggedIndex, 1)[0];
        newOrder.splice(dropIndex, 0, draggedItem);
        setOrderedWords(newOrder);
        setDraggedIndex(null);
    }

    function checkOrder() {
        const correct = orderedWords.every((word, i, arr) =>
            i === 0 || word.toLowerCase() >= arr[i - 1].toLowerCase()
        );
        setOrderCheckResult(correct);
    }

    const tutorialTexts = [
        "Le tri alphabétique compare les mots selon la première lettre.",
        "Par exemple, 'Abricot' commence par A, 'Banane' par B, donc 'Abricot' vient avant.",
        "On range les mots comme dans un dictionnaire, de A à Z.",
        "Essaie maintenant de trier toi-même les mots en les glissant dans le bon ordre."
    ];

    return (
        <div className="max-w-xl mx-auto p-6 font-sans space-y-6">
            <h1 className="text-3xl font-bold mb-4">Trier par ordre alphabétique</h1>

            <p>
                En algorithme, il est courant de trier des mots. Le tri alphabétique se base principalement
                sur la <strong>première lettre</strong> de chaque mot, comme dans un dictionnaire.
            </p>

            <h2 className="text-xl font-semibold mt-6">Exemple d'algorithme</h2>
            <pre className="bg-gray-100 p-4 rounded font-mono text-sm">
{`Pour chaque mot dans la liste :
  Comparer avec le suivant
  Si la première lettre est après l'autre, échanger
Répéter jusqu'à ce que la liste soit triée`}
      </pre>

            {/* Tutoriel pas à pas */}
            <section className="bg-blue-50 p-4 rounded border border-blue-200">
                <h3 className="text-lg font-semibold mb-2">Mini tutoriel pas à pas</h3>
                <p className="mb-4">{tutorialTexts[tutorialStep]}</p>
                <div className="flex justify-between">
                    <button
                        onClick={() => setTutorialStep(prev => Math.max(0, prev - 1))}
                        disabled={tutorialStep === 0}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Précédent
                    </button>
                    <button
                        onClick={() => setTutorialStep(prev => Math.min(tutorialTexts.length - 1, prev + 1))}
                        disabled={tutorialStep === tutorialTexts.length - 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                        Suivant
                    </button>
                </div>
            </section>

            {/* Quiz rapide */}
            <h2 className="text-xl font-semibold mt-6">Quiz rapide</h2>
            <form onSubmit={handleQuizSubmit} className="space-y-2 max-w-sm">
                <label className="block">
                    Quel mot vient en premier dans la liste suivante ?<br />
                    <em>{words.join(', ')}</em>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        placeholder="Écris ta réponse ici"
                        className="mt-1 w-full border border-gray-400 rounded px-2 py-1"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Vérifier
                </button>
            </form>
            {quizResult === true && (
                <p className="text-green-600 font-semibold mt-2">Bravo ! C’est la bonne réponse.</p>
            )}
            {quizResult === false && (
                <p className="text-red-600 font-semibold mt-2">Essaie encore :)</p>
            )}

            <hr className="my-8" />

            {/* Mini-jeu */}
            <h2 className="text-xl font-semibold">Mini-jeu : Trie les mots</h2>
            <p>
                Glisse les mots dans l’ordre alphabétique selon leur <strong>première lettre</strong>, puis clique sur "Vérifier".
            </p>

            <ul className="space-y-2 mt-4">
                {orderedWords.map((word, index) => (
                    <li
                        key={word}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        className="border border-gray-300 rounded px-4 py-2 cursor-move bg-gray-50 hover:bg-gray-100"
                    >
                        {word}
                    </li>
                ))}
            </ul>

            <button
                onClick={checkOrder}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                Vérifier l’ordre
            </button>
            {orderCheckResult === true && (
                <p className="mt-2 text-green-600 font-semibold">Parfait ! Les mots sont bien triés.</p>
            )}
            {orderCheckResult === false && (
                <p className="mt-2 text-red-600 font-semibold">Ce n’est pas encore correct, réessaye.</p>
            )}
        </div>
    );
}

