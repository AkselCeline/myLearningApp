import React, { useState } from 'react';

export default function LeapYearLesson() {
    const [year, setYear] = useState('');
    const [result, setResult] = useState(null);
    const [explanation, setExplanation] = useState('');
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizFeedback, setQuizFeedback] = useState(null);

    const leapQuiz = {
        question: "L'année 1900 est-elle bissextile ?",
        correctAnswer: "non"
    };

    const checkLeapYear = () => {
        const y = parseInt(year);
        if (isNaN(y)) {
            setResult(null);
            setExplanation("Entre un nombre valide.");
            return;
        }

        if (y % 4 !== 0) {
            setResult("Non bissextile");
            setExplanation(`${y} n'est pas divisible par 4.`);
        } else if (y % 100 !== 0) {
            setResult("Bissextile");
            setExplanation(`${y} est divisible par 4 mais pas par 100.`);
        } else if (y % 400 === 0) {
            setResult("Bissextile");
            setExplanation(`${y} est divisible par 100 et aussi par 400.`);
        } else {
            setResult("Non bissextile");
            setExplanation(`${y} est divisible par 100 mais pas par 400.`);
        }
    };

    const checkQuiz = () => {
        const answer = quizAnswer.trim().toLowerCase();
        setQuizFeedback(answer === leapQuiz.correctAnswer ? "Bonne réponse ✅" : "Mauvaise réponse ❌");
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6 font-sans">
            <h1 className="text-2xl font-bold">🗓️ Est-ce une année bissextile ?</h1>

            <p>
                Une année est bissextile si elle suit ces règles :
                <ul className="list-disc list-inside mt-2">
                    <li>Elle est divisible par 4</li>
                    <li><strong>Mais</strong> si elle est divisible par 100, elle n'est pas bissextile</li>
                    <li><strong>Sauf</strong> si elle est aussi divisible par 400, alors elle est bissextile</li>
                </ul>
            </p>

            {/* Explication du modulo */}
            <div className="bg-yellow-100 p-4 rounded mt-4">
                <h2 className="text-lg font-semibold mb-2">🔍 C’est quoi le modulo <code>%</code> ?</h2>
                <p>Le symbole <code>%</code> s'appelle le <strong>modulo</strong>. Il donne le <strong>reste</strong> d'une division.</p>
                <ul className="list-disc list-inside mt-2">
                    <li><code>10 % 3 = 1</code> → 10 divisé par 3 = reste 1</li>
                    <li><code>12 % 4 = 0</code> → 12 est divisible par 4</li>
                </ul>
                <p className="mt-2 italic">Imagine que tu veux mettre 10 bonbons dans des sacs de 3… Tu remplis 3 sacs, il te reste 1 bonbon → <code>10 % 3 = 1</code></p>
            </div>

            {/* Testeur d'année */}
            <div>
                <label className="block mb-1 font-medium mt-4">Entre une année :</label>
                <input
                    type="number"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    placeholder="Ex: 2024"
                />
                <button
                    onClick={checkLeapYear}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Tester
                </button>
            </div>

            {result && (
                <div className="mt-3 p-4 bg-gray-100 rounded">
                    <p className="font-bold">Résultat : {result}</p>
                    <p className="text-sm mt-1">{explanation}</p>
                </div>
            )}

            {/* Mini quiz */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">🎯 Quiz rapide</h2>
                <p className="mt-2">{leapQuiz.question}</p>
                <input
                    type="text"
                    value={quizAnswer}
                    onChange={e => setQuizAnswer(e.target.value)}
                    placeholder="oui / non"
                    className="border px-2 py-1 rounded mt-2"
                />
                <button
                    onClick={checkQuiz}
                    className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Valider
                </button>
                {quizFeedback && (
                    <p className="mt-2 font-semibold">
                        {quizFeedback}
                    </p>
                )}
            </div>

            {/* Pseudo-code */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold">🧾 Pseudo-code de l’algorithme</h2>
                <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap mt-2">
{`Lire une année

Si (année % 4 ≠ 0)
    Afficher "Non bissextile"
Sinon si (année % 100 ≠ 0)
    Afficher "Bissextile"
Sinon si (année % 400 = 0)
    Afficher "Bissextile"
Sinon
    Afficher "Non bissextile"`}
        </pre>
            </div>
        </div>
    );
}
