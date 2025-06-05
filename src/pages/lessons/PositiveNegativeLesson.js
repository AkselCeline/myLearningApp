import React, { useState, useEffect } from 'react';

const dragItems = [
    { id: 'pos', label: 'Positif' },
    { id: 'neg', label: 'Négatif' },
    { id: 'nul', label: 'Nul' },
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

    const exampleNumber = -7;

    // Animation state
    const [step, setStep] = useState(0);

    // Drag & Drop state
    const [draggingId, setDraggingId] = useState(null);
    const [assignments, setAssignments] = useState({}); // numberId -> dragItemId
    const [gameResult, setGameResult] = useState(null);

    // Animation steps texts
    const animationSteps = [
        `Le nombre est ${exampleNumber}`,
        exampleNumber > 0
            ? 'Le nombre est supérieur à 0 → Positif'
            : exampleNumber < 0
                ? 'Le nombre est inférieur à 0 → Négatif'
                : 'Le nombre est égal à 0 → Nul',
    ];

    // Animation auto-advance every 2s
    useEffect(() => {
        if (step < animationSteps.length - 1) {
            const timer = setTimeout(() => setStep(step + 1), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Quiz check
    function checkAnswer(e) {
        e.preventDefault();
        const answer = userAnswer.trim().toLowerCase();
        if (
            (exampleNumber < 0 && (answer === 'négatif' || answer === 'negatif')) ||
            (exampleNumber > 0 && answer === 'positif') ||
            (exampleNumber === 0 && answer === 'nul')
        ) {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    // Drag & Drop handlers
    function handleDragStart(id) {
        setDraggingId(id);
    }

    function handleDrop(numberId) {
        if (!draggingId) return;
        setAssignments(prev => ({ ...prev, [numberId]: draggingId }));
        setDraggingId(null);
    }

    // Check drag game result
    function checkGame() {
        const allCorrect = numbersToSort.every(
            n => assignments[n.id] === n.correct
        );
        setGameResult(allCorrect);
    }

    return (
        <div className="max-w-xl mx-auto p-6 font-sans space-y-8">
            <h1 className="text-3xl font-bold mb-4">Les nombres positifs et négatifs en algorithme</h1>

            <p>
                En algorithmique, il est important de savoir si un nombre est <strong>positif</strong>, <strong>négatif</strong> ou <strong>nul</strong>.
            </p>
            <p>
                - Un nombre est <strong>positif</strong> s’il est supérieur à zéro.<br />
                - Un nombre est <strong>négatif</strong> s’il est inférieur à zéro.<br />
                - Le nombre <strong>0</strong> est appelé <strong>nul</strong>.
            </p>

            <h2 className="text-xl font-semibold">Animation explicative</h2>
            <div className="p-4 mb-6 bg-blue-50 border border-blue-200 rounded font-mono text-lg text-center">
                {animationSteps[step]}
            </div>

            <h2 className="text-xl font-semibold">Exemple d’algorithme simple :</h2>
            <pre className="bg-gray-100 p-4 rounded font-mono text-sm">
{`Si nombre > 0 alors
    Afficher "Le nombre est positif"
Sinon si nombre < 0 alors
    Afficher "Le nombre est négatif"
Sinon
    Afficher "Le nombre est nul"
Fin Si`}
      </pre>

            <p>Testons ce nombre : <strong>{exampleNumber}</strong></p>

            <h3 className="text-lg font-semibold mt-4">Quiz rapide</h3>
            <form onSubmit={checkAnswer} className="space-y-2 max-w-sm">
                <label className="block">
                    Selon l’algorithme, ce nombre est :
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        placeholder="positif / négatif / nul"
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

            <hr className="my-8"/>

            <h2 className="text-xl font-semibold">Mini-jeu : Associe chaque nombre à son type</h2>
            <p>Clique et glisse l’étiquette « Positif », « Négatif » ou « Nul » sur chaque nombre.</p>

            <div className="flex flex-wrap gap-6 mt-4">
                {/* Nombres à classer */}
                <div className="flex flex-col space-y-3">
                    {numbersToSort.map(n => (
                        <div
                            key={n.id}
                            onDrop={() => handleDrop(n.id)}
                            onDragOver={e => e.preventDefault()}
                            className="w-24 h-12 border border-gray-400 rounded flex items-center justify-center text-xl font-semibold cursor-pointer"
                            style={{backgroundColor: assignments[n.id] ? '#d1fae5' : 'white'}}
                        >
                            {n.value}
                        </div>
                    ))}
                </div>

                {/* Étiquettes draggable */}
                <div className="flex flex-col space-y-3">
                    {dragItems.map(item => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={() => handleDragStart(item.id)}
                            className="w-32 h-12 bg-blue-600 text-white rounded flex items-center justify-center cursor-grab select-none"
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={checkGame}
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                Vérifier les réponses
            </button>
            {gameResult === true && (
                <p className="text-green-700 font-semibold mt-3">Super ! Tu as bien associé tous les nombres.</p>
            )}
            {gameResult === false && (
                <p className="text-red-700 font-semibold mt-3">Certaines réponses sont incorrectes. Essaie encore !</p>
            )}
        </div>
    );
}
