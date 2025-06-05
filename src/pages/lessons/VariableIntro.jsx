import React, { useState } from 'react';

export default function VariableIntro() {
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);

    const [userPairs, setUserPairs] = useState({});
    const [validationResult, setValidationResult] = useState(null);

    const exampleVariables = [
        { name: 'nom', value: 'Alice' },
        { name: 'âge', value: '25' },
        { name: 'ville', value: 'Paris' },
    ];

    const gameVariables = ['animal', 'nombre', 'couleur'];
    const possibleValues = ['Chat', '42', 'Bleu'];

    function handleQuizSubmit(e) {
        e.preventDefault();
        if (quizAnswer.trim().toLowerCase().includes('boîte')) {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    function handlePairChange(variable, value) {
        setUserPairs(prev => ({
            ...prev,
            [variable]: value,
        }));
    }

    function checkPairs() {
        const correct = {
            animal: 'Chat',
            nombre: '42',
            couleur: 'Bleu',
        };
        const isCorrect = Object.entries(correct).every(
            ([key, val]) => userPairs[key] === val
        );
        setValidationResult(isCorrect);
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-8 font-sans">
            <h1 className="text-2xl font-bold">La variable : une boîte pour stocker une valeur</h1>

            <p className="text-lg">
                Une <strong>variable</strong>, c’est comme une <strong>boîte avec une étiquette</strong>. On peut y ranger une information, comme un nom, un nombre ou un mot.
            </p>

            {/* Visuel des variables comme des boîtes */}
            <section className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Les variables en image</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    {exampleVariables.map(v => (
                        <div key={v.name} className="border border-gray-400 rounded-xl p-4 shadow bg-yellow-50">
                            <div className="text-sm text-gray-500 mb-2">Nom de la variable</div>
                            <div className="text-lg font-bold">{v.name}</div>
                            <div className="h-0.5 bg-gray-300 my-2" />
                            <div className="text-sm text-gray-500 mb-1">Valeur contenue</div>
                            <div className="text-blue-600 text-lg">{v.value}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Exemple de code */}
            <h2 className="text-xl font-semibold mt-6">Exemple de déclaration</h2>
            <pre className="bg-gray-100 p-4 rounded">
{`let nom = "Alice";
let âge = 25;
let ville = "Paris";`}
      </pre>

            {/* Quiz rapide */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold">Quiz rapide</h3>
                <form onSubmit={handleQuizSubmit} className="mt-2 space-y-2">
                    <label className="block">
                        Une variable, c’est comme une... ?
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
                {quizResult === true && <p className="mt-2 text-green-600 font-semibold">Bravo ! Une boîte, c’est une super comparaison.</p>}
                {quizResult === false && <p className="mt-2 text-red-600 font-semibold">Essaie d’imaginer un objet du quotidien...</p>}
            </section>

            {/* Jeu d'association (différent de l'exemple) */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Associe chaque variable à sa valeur</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Ces variables sont différentes de celles vues dans l’exemple. Trouve leur bonne valeur !
                </p>
                <div className="space-y-4">
                    {gameVariables.map(variable => (
                        <div key={variable} className="flex items-center space-x-4">
                            <span className="w-24 font-medium">{variable} :</span>
                            <select
                                value={userPairs[variable] || ''}
                                onChange={e => handlePairChange(variable, e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1"
                            >
                                <option value="">-- Choisis une valeur --</option>
                                {possibleValues.map(val => (
                                    <option key={val} value={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <button
                    onClick={checkPairs}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Vérifier les associations
                </button>
                {validationResult === true && <p className="mt-2 text-green-600 font-semibold">Bravo ! C’est tout bon 🎉</p>}
                {validationResult === false && <p className="mt-2 text-red-600 font-semibold">Pas encore, essaie encore une fois.</p>}
            </section>
        </div>
    );
}
