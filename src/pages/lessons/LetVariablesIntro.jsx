import React, { useState } from 'react';

export default function LetVariablesIntro() {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        const normalized = answer.trim().replace(/\s+/g, '');
        if (normalized === 'Bonjour,Samira!') {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6 text-gray-800">
            <h1 className="text-2xl font-bold">🟠 Comprendre les variables avec <code>let</code></h1>

            <p>
                Une <strong>variable</strong> permet de <em>stocker une valeur</em> (comme un mot, un nombre, un message).
                On peut ensuite utiliser cette valeur plus tard dans le programme.
            </p>

            <p>On crée une variable avec <code>let</code> :</p>
            <div className="bg-gray-100 p-4 rounded font-mono">
                let prenom = "Samira";
            </div>

            <p>Et on peut l’utiliser comme ceci :</p>
            <div className="bg-gray-100 p-4 rounded font-mono">
                console.log("Bonjour, " + prenom + "!");
            </div>

            <p className="mt-4">Ce code affichera :</p>
            <div className="bg-black text-white p-2 rounded font-mono">
                Bonjour, Samira!
            </div>

            {/* Mini Quiz */}
            <form onSubmit={handleSubmit} className="space-y-2 mt-4">
                <label>
                    🔍 Que va afficher ce code ?
                    <pre className="bg-gray-100 p-3 mt-1 rounded font-mono">
{`let prenom = "Samira";
console.log("Bonjour, " + prenom + "!");`}
                    </pre>
                    <input
                        type="text"
                        className="mt-2 block border border-gray-300 rounded px-2 py-1 w-full"
                        placeholder='Écris exactement ce qui s’affiche'
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
                    <p className="text-green-600 font-semibold">✅ C’est exact !</p>
                )}
                {isCorrect === false && (
                    <p className="text-red-600 font-semibold">❌ Pas tout à fait. Relis bien le message affiché !</p>
                )}
            </form>

            <h2 className="text-xl font-semibold mt-6">✍️ À toi de jouer</h2>
            <p>Crée une variable <code>nom</code> et affiche : <br /><strong>Bienvenue, nom !</strong></p>
            <div className="bg-gray-100 p-4 rounded font-mono space-y-1">
                <div>let nom = "Lina";</div>
                <div>console.log("Bienvenue, " + nom + "!");</div>
            </div>

            <p className="mt-4">
                Tu peux tester ce code dans la console de ton navigateur ou sur <a href="https://jsconsole.com" target="_blank" className="text-blue-600 underline">jsconsole.com</a> !
            </p>
        </div>
    );
}
