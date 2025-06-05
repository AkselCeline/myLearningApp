import React, { useState } from 'react';

export default function LogicGameIntro() {
    const [answers, setAnswers] = useState({
        fly: '',
        swim: '',
        mammal: '',
    });
    const [result, setResult] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    function handleChange(name, value) {
        setAnswers(prev => ({ ...prev, [name]: value }));
    }

    function evaluate() {
        const { fly, swim, mammal } = answers;
        if (fly === 'yes' && swim === 'no' && mammal === 'no') {
            setResult('🐦 Tu penses à un oiseau !');
        } else if (fly === 'no' && swim === 'yes' && mammal === 'no') {
            setResult('🐟 Tu penses à un poisson !');
        } else if (fly === 'no' && swim === 'no' && mammal === 'yes') {
            setResult('🐱 Tu penses à un chat !');
        } else {
            setResult("❓ Hmm... Je ne suis pas sûr, essaie une autre combinaison !");
        }
        setShowExplanation(true);
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6 font-sans">
            <h1 className="text-2xl font-bold">Mini jeu de logique : Qui suis-je ?</h1>
            <p className="text-lg">
                Devine l’animal mystère en répondant à ces 3 questions :
            </p>

            <div className="space-y-4">
                <div>
                    <p>Est-ce que l’animal peut voler ?</p>
                    <select
                        value={answers.fly}
                        onChange={e => handleChange('fly', e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">Choisir</option>
                        <option value="yes">Oui</option>
                        <option value="no">Non</option>
                    </select>
                </div>
                <div>
                    <p>Est-ce qu’il peut nager ?</p>
                    <select
                        value={answers.swim}
                        onChange={e => handleChange('swim', e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">Choisir</option>
                        <option value="yes">Oui</option>
                        <option value="no">Non</option>
                    </select>
                </div>
                <div>
                    <p>Est-ce que c’est un mammifère ?</p>
                    <select
                        value={answers.mammal}
                        onChange={e => handleChange('mammal', e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    >
                        <option value="">Choisir</option>
                        <option value="yes">Oui</option>
                        <option value="no">Non</option>
                    </select>
                </div>
            </div>

            <button
                onClick={evaluate}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Deviner
            </button>

            {result && (
                <div className="mt-4 text-xl font-semibold text-green-700">
                    {result}
                </div>
            )}

            {showExplanation && (
                <div className="mt-6 border-t pt-4 text-base text-gray-700">
                    <h2 className="text-lg font-bold mb-2">🧠 Explication :</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>🐦 Oiseau :</strong> Peut voler, ne nage pas, et n’est pas un mammifère.</li>
                        <li><strong>🐟 Poisson :</strong> Ne vole pas, nage, et n’est pas un mammifère.</li>
                        <li><strong>🐱 Chat :</strong> Ne vole pas, ne nage pas, mais c’est un mammifère.</li>
                    </ul>
                    <p className="mt-3">
                        🔍 Le but de ce jeu est de **réfléchir de manière logique** pour déduire la bonne réponse. En combinant les réponses aux questions, tu élimines des possibilités — comme un vrai détective !
                    </p>
                    <p className="mt-2 italic text-sm text-gray-600">
                        Tu viens d’appliquer des conditions logiques, comme dans un algorithme !
                    </p>
                </div>
            )}
        </div>
    );
}
