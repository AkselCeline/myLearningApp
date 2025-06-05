import React, { useState } from 'react';

export default function FunctionIntro() {
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);

    const [functionMatch, setFunctionMatch] = useState({});
    const [matchResult, setMatchResult] = useState(null);

    const functions = [
        { name: 'saluer', description: 'Affiche un message de bienvenue' },
        { name: 'addition', description: 'Calcule la somme de deux nombres' },
        { name: 'afficherDate', description: 'Montre la date du jour' },
    ];

    const descriptions = [
        'Affiche un message de bienvenue',
        'Calcule la somme de deux nombres',
        'Montre la date du jour',
    ];

    const correctMatches = {
        saluer: 'Affiche un message de bienvenue',
        addition: 'Calcule la somme de deux nombres',
        afficherDate: 'Montre la date du jour',
    };

    function handleQuizSubmit(e) {
        e.preventDefault();
        if (quizAnswer.trim().toLowerCase().includes('répète') || quizAnswer.includes('réutilisable')) {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    function handleFunctionMatchChange(funcName, desc) {
        setFunctionMatch(prev => ({ ...prev, [funcName]: desc }));
    }

    function validateMatches() {
        const allCorrect = Object.entries(correctMatches).every(
            ([key, value]) => functionMatch[key] === value
        );
        setMatchResult(allCorrect);
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-8 font-sans">
            <h1 className="text-2xl font-bold">Découvrons les fonctions</h1>

            <p className="text-lg">
                Une <strong>fonction</strong>, c’est un bloc de code qui fait une tâche spécifique. On peut l’exécuter plusieurs fois sans tout réécrire.
            </p>

            <h2 className="text-xl font-semibold">Exemple :</h2>
            <pre className="bg-gray-100 p-4 rounded">
{`function direBonjour(prenom) {
  console.log("Bonjour " + prenom + " !");
}

direBonjour("Alice");`}
      </pre>

            {/* Quiz rapide */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold">Quiz rapide</h3>
                <form onSubmit={handleQuizSubmit} className="space-y-2">
                    <label className="block">
                        À quoi sert une fonction ?
                        <input
                            type="text"
                            className="block border border-gray-400 rounded px-2 py-1 mt-1 w-full"
                            value={quizAnswer}
                            onChange={e => setQuizAnswer(e.target.value)}
                            placeholder="Ta réponse ici"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Valider
                    </button>
                </form>
                {quizResult === true && <p className="text-green-600 font-semibold mt-2">Parfait ! C’est exactement ça.</p>}
                {quizResult === false && <p className="text-red-600 font-semibold mt-2">Pas tout à fait. Pense à l’idée de répéter une tâche…</p>}
            </section>

            {/* Jeu d'association : fonction → action */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Associe chaque fonction à sa description</h3>
                <div className="space-y-4">
                    {functions.map(func => (
                        <div key={func.name} className="flex items-center space-x-4">
                            <span className="w-32 font-medium">{func.name}()</span>
                            <select
                                value={functionMatch[func.name] || ''}
                                onChange={e => handleFunctionMatchChange(func.name, e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1"
                            >
                                <option value="">-- Choisis une description --</option>
                                {descriptions.map(desc => (
                                    <option key={desc} value={desc}>{desc}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <button
                    onClick={validateMatches}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Vérifier
                </button>
                {matchResult === true && <p className="mt-2 text-green-600 font-semibold">Bien joué ! 🎉</p>}
                {matchResult === false && <p className="mt-2 text-red-600 font-semibold">Essaie encore 🙂</p>}
            </section>
        </div>
    );
}
