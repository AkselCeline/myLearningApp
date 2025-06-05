import React, { useState } from 'react';

export default function ConsoleLogIntro() {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    function checkAnswer(e) {
        e.preventDefault();
        const cleaned = answer.trim().replace(/\s+/g, '');
        if (cleaned === 'Lerésultatest:9' || cleaned === 'Le résultat est :9') {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6 text-gray-800">
            <h1 className="text-2xl font-bold">🟢 Afficher un message avec <code>console.log</code></h1>

            <p>
                Quand tu veux que ton programme **affiche quelque chose**, tu peux utiliser <code>console.log()</code>.
                C’est comme dire à l’ordinateur : <em>“Écris ça pour moi”</em>.
            </p>

            <div className="bg-gray-100 p-4 rounded">
                <pre>
                    <code>
                        console.log("Bonjour !");
                    </code>
                </pre>
            </div>

            <p>Ce code affichera :</p>
            <div className="bg-black text-white p-2 rounded font-mono">Bonjour !</div>

            <h2 className="text-xl font-semibold mt-4">📚 Exemple :</h2>
            <div className="bg-gray-100 p-4 rounded space-y-1 font-mono">
                <div>console.log("Le résultat est :");</div>
                <div>console.log(3 * 3);</div>
            </div>

            <form onSubmit={checkAnswer} className="space-y-2 mt-4">
                <label>
                    🔍 Que va afficher ce code dans la console ?
                    <input
                        type="text"
                        className="block mt-1 border border-gray-300 rounded px-2 py-1 w-full"
                        placeholder='Tape ta réponse ici (ex: "Le résultat est : 9")'
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Vérifier
                </button>
                {isCorrect === true && (
                    <p className="text-green-600 font-semibold">✅ Bravo !</p>
                )}
                {isCorrect === false && (
                    <p className="text-red-600 font-semibold">❌ Pas tout à fait, essaie encore !</p>
                )}
            </form>

            <h2 className="text-xl font-semibold mt-6">✍️ À toi de jouer</h2>
            <p>Écris 3 messages avec <code>console.log</code>. Par exemple :</p>
            <div className="bg-gray-100 p-4 rounded font-mono space-y-1">
                <div>console.log("Ton prénom ici");</div>
                <div>console.log("J'aime le chocolat !");</div>
                <div>console.log("5 + 7 = " + (5 + 7));</div>
            </div>

            <p className="mt-4">Tu peux tester ce code dans un site comme <a href="https://jsconsole.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">jsconsole.com</a> ou dans la console de ton navigateur !</p>
        </div>
    );
}
