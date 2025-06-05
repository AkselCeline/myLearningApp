import React, { useState } from 'react';

export default function IfConditionIntro() {
    const [age, setAge] = useState('');
    const [result, setResult] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        const num = parseInt(age, 10);
        if (!isNaN(num)) {
            if (num >= 18) {
                setResult("Tu es majeur !");
            } else {
                setResult("Tu es mineur.");
            }
        } else {
            setResult("Entre un nombre valide !");
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6 text-gray-800">
            <h1 className="text-2xl font-bold">🟡 Les conditions avec <code>if</code></h1>

            <p>Avec <code>if</code>, on peut dire au programme :</p>
            <blockquote className="italic">« Fais ça <strong>seulement si</strong> une condition est vraie. »</blockquote>

            <div className="bg-gray-100 p-4 rounded font-mono">
                {`let age = 20;

if (age >= 18) {
    console.log("Tu es majeur !");
} else {
    console.log("Tu es mineur.");
}`}
            </div>

            <form onSubmit={handleSubmit} className="space-y-2 mt-4">
                <label>
                    ✍️ Ton âge :
                    <input
                        type="number"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        className="block border border-gray-300 rounded px-2 py-1 mt-1 w-full"
                        placeholder="Ex: 16"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Tester
                </button>
            </form>
            {result && (
                <div className="mt-2 text-lg font-semibold text-purple-700">{result}</div>
            )}

            <h2 className="text-xl font-semibold mt-6">🧪 Défi</h2>
            <p>Essaye de changer la valeur de <code>age</code> pour voir ce que ton programme affiche !</p>
        </div>
    );
}
