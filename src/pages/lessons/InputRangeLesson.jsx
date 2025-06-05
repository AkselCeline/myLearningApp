import React, { useState } from 'react';

const numbers = [0, 5, 11, 3, 10, -1, 7, 12, 1, 15];

export default function InputRangeLesson() {
    const [input, setInput] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [message, setMessage] = useState('');
    const [valid, setValid] = useState(null);

    const [validBox, setValidBox] = useState([]);
    const [invalidBox, setInvalidBox] = useState([]);
    const [dragged, setDragged] = useState(null);
    const [showResult, setShowResult] = useState(false);

    // Vérification du champ de saisie
    const checkInput = () => {
        const value = parseInt(input);
        if (isNaN(value)) {
            setMessage("🚫 Ce n’est pas un nombre.");
            setValid(false);
        } else if (value >= 1 && value <= 10) {
            setMessage("✅ Bien joué ! Tu as saisi un nombre entre 1 et 10.");
            setValid(true);
        } else {
            setMessage("⚠️ Le nombre doit être entre 1 et 10.");
            setValid(false);
        }
    };

    const handleDragStart = (num) => setDragged(num);

    const handleDrop = (boxType) => {
        if (boxType === 'valid') {
            setValidBox([...validBox, dragged]);
        } else {
            setInvalidBox([...invalidBox, dragged]);
        }
        setDragged(null);
    };

    const isValid = (n) => n >= 1 && n <= 10;

    const handleCheck = () => {
        const allValidCorrect = validBox.every(isValid);
        const allInvalidCorrect = invalidBox.every(n => !isValid(n));
        const allSorted = validBox.length + invalidBox.length === numbers.length;

        if (!allSorted) {
            setResultMessage('❗️ Tu dois classer tous les nombres.');
            return;
        }

        if (allValidCorrect && allInvalidCorrect) {
            setResultMessage('🎉 Bravo, tous les nombres sont bien triés !');
        } else {
            setResultMessage('❌ Il y a des erreurs dans ton tri, essaie encore.');
        }
    };

    const getRemaining = () =>
        numbers.filter(n => !validBox.includes(n) && !invalidBox.includes(n));

    return (
        <div className="max-w-xl mx-auto p-6 space-y-8 font-sans">
            <h1 className="text-2xl font-bold">📥 Saisir un nombre entre 1 et 10</h1>

            <p>
                En programmation, il est important de contrôler les données saisies. Par exemple, on peut exiger que
                l'utilisateur entre un nombre entre 1 et 10.
            </p>

            {/* Saisie simple */}
            <div>
                <label className="block font-medium">Entre un nombre :</label>
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border px-3 py-2 rounded mt-1 w-full"
                    placeholder="Tape un nombre entre 1 et 10"
                />
                <button
                    onClick={checkInput}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Vérifier
                </button>
                {message && (
                    <p className={`mt-2 font-semibold ${valid ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </div>

            {/* Pseudo-code */}
            <div className="bg-gray-100 p-4 rounded">
                <h2 className="text-lg font-semibold">🧠 Pseudo-code</h2>
                <pre className="whitespace-pre-wrap text-sm">
{`répéter
    lire un nombre
jusqu’à ce que le nombre soit >= 1 et <= 10
afficher "Nombre valide"`}
        </pre>
            </div>

            {/* Mini-jeu drag & drop */}
            <div className="pt-6 border-t">
                <h2 className="text-xl font-bold mb-2">🎮 Jeu : trie les bons nombres !</h2>
                <p className="mb-4">Fais glisser chaque nombre dans la bonne boîte.</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {getRemaining().map((num) => (
                        <div
                            key={num}
                            draggable
                            onDragStart={() => handleDragStart(num)}
                            className="px-4 py-2 bg-gray-200 rounded cursor-move hover:bg-gray-300"
                        >
                            {num}
                        </div>
                    ))}
                </div>

                <div className="flex gap-4">
                    {/* Boîte Valide */}
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop('valid')}
                        className="flex-1 min-h-[100px] p-4 border-2 border-green-500 rounded"
                    >
                        <h3 className="font-semibold text-green-700 mb-2">✅ Valide (1 à 10)</h3>
                        <div className="flex flex-wrap gap-2">
                            {validBox.map((num) => (
                                <span key={num} className="bg-green-100 px-3 py-1 rounded">{num}</span>
                            ))}
                        </div>
                    </div>

                    {/* Boîte Invalide */}
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop('invalid')}
                        className="flex-1 min-h-[100px] p-4 border-2 border-red-500 rounded"
                    >
                        <h3 className="font-semibold text-red-700 mb-2">❌ Invalide</h3>
                        <div className="flex flex-wrap gap-2">
                            {invalidBox.map((num) => (
                                <span key={num} className="bg-red-100 px-3 py-1 rounded">{num}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleCheck}
                    className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    Vérifier le tri
                </button>

                {resultMessage && (
                    <p className={`mt-3 font-semibold ${resultMessage.includes('Bravo') ? 'text-green-700' : 'text-red-700'}`}>
                        {resultMessage}
                    </p>
                )}
            </div>
        </div>
    );
}
