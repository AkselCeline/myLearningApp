import React, { useState, useEffect } from 'react';

export default function EvenOddLesson() {
    const [inputNumber, setInputNumber] = useState('');
    const [result, setResult] = useState(null);
    const [quizResult, setQuizResult] = useState(null);

    const [dragItems, setDragItems] = useState(shuffle([3, 8, 5, 10, 7, 2]));
    const [evenBox, setEvenBox] = useState([]);
    const [oddBox, setOddBox] = useState([]);

    const [timer, setTimer] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);

    function shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        let interval = null;
        if (isPlaying && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timer]);

    useEffect(() => {
        if (isPlaying && dragItems.length === 0) {
            setIsPlaying(false);  // Arrête le jeu
        }
    }, [dragItems, isPlaying]);


    function checkEvenOdd() {
        const n = parseInt(inputNumber, 10);
        if (isNaN(n)) {
            setResult(null);
        } else {
            setResult(n % 2 === 0 ? 'pair' : 'impair');
        }
    }

    function handleQuizSubmit(e) {
        e.preventDefault();
        if (parseInt(inputNumber) % 2 === 0) {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    function handleDrop(target, value) {
        if (target === 'even' && value % 2 === 0) {
            setEvenBox([...evenBox, value]);
            setDragItems(dragItems.filter(n => n !== value));
            setScore(score + 1);
        } else if (target === 'odd' && value % 2 !== 0) {
            setOddBox([...oddBox, value]);
            setDragItems(dragItems.filter(n => n !== value));
            setScore(score + 1);
        }
    }

    function startGame() {
        setDragItems(shuffle([1, 4, 7, 9, 2, 6, 11, 14]));
        setEvenBox([]);
        setOddBox([]);
        setScore(0);
        setTimer(60);
        setIsPlaying(true);
    }

    return (
        <div className="max-w-xl mx-auto p-6 font-sans space-y-6">
            <h1 className="text-2xl font-bold">Algorithme : Pair ou Impair</h1>

            <p>
                Un nombre <strong>pair</strong> est divisible par 2 : il donne un reste nul (<code>nombre % 2 === 0</code>).
                Un nombre <strong>impair</strong> a un reste de 1.
            </p>
            <p>
                L’opérateur <strong>modulo (%)</strong> donne le reste d’une division.
                <br />
                <code>Ex : 7 % 2 = 1 → impair</code> <br />
                <code>8 % 2 = 0 → pair</code>
            </p>

            {/* Test simple */}
            <h2 className="text-xl font-semibold">Teste un nombre</h2>
            <div className="flex items-center space-x-2">
                <input
                    type="number"
                    value={inputNumber}
                    onChange={e => setInputNumber(e.target.value)}
                    className="border px-2 py-1 rounded"
                    placeholder="Nombre ?"
                />
                <button
                    onClick={checkEvenOdd}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                    Vérifier
                </button>
            </div>
            {result && (
                <p className="mt-2">
                    Ce nombre est <strong className="text-blue-700">{result}</strong>.
                </p>
            )}

            {/* Quiz */}
            <hr className="my-6" />
            <h2 className="text-xl font-semibold">Quiz rapide</h2>
            <form onSubmit={handleQuizSubmit} className="space-y-2">
                <label>
                    Si je dis 9, est-ce pair ou impair ?
                    <input
                        type="number"
                        value={inputNumber}
                        onChange={e => setInputNumber(e.target.value)}
                        placeholder="Ta réponse"
                        className="block border px-2 py-1 mt-1 rounded"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-1 rounded"
                >
                    Soumettre
                </button>
            </form>
            {quizResult === true && <p className="text-green-600">Bonne réponse !</p>}
            {quizResult === false && <p className="text-red-600">Essaie encore !</p>}

            {/* Jeu avec timer */}
            <hr className="my-6" />
            <h2 className="text-xl font-semibold">Défi : Trier pair ou impair</h2>
            {!isPlaying ? (
                <button
                    onClick={startGame}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    Lancer le jeu
                </button>
            ) : (
                <>
                    <p>Temps restant : <strong>{timer}s</strong> | Score : <strong>{score}</strong></p>

                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div className="border p-4 rounded bg-gray-50">
                            <h3 className="font-semibold mb-2">À trier</h3>
                            <div className="flex flex-wrap gap-2">
                                {dragItems.map(n => (
                                    <div
                                        key={n}
                                        draggable
                                        onDragStart={e => e.dataTransfer.setData('text/plain', n)}
                                        className="cursor-move px-3 py-1 bg-white border rounded"
                                    >
                                        {n}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div
                                onDragOver={e => e.preventDefault()}
                                onDrop={e => handleDrop('even', parseInt(e.dataTransfer.getData('text')))}
                                className="min-h-[80px] p-2 bg-green-100 border rounded"
                            >
                                <h4 className="font-medium">Pairs</h4>
                                {evenBox.map((n, i) => (
                                    <div key={i}>{n}</div>
                                ))}
                            </div>

                            <div
                                onDragOver={e => e.preventDefault()}
                                onDrop={e => handleDrop('odd', parseInt(e.dataTransfer.getData('text')))}
                                className="min-h-[80px] p-2 bg-yellow-100 border rounded"
                            >
                                <h4 className="font-medium">Impairs</h4>
                                {oddBox.map((n, i) => (
                                    <div key={i}>{n}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Résultat de la partie */}
            {!isPlaying && score > 0 && (
                <p className="mt-4 text-center font-semibold text-green-700">
                    Bravo 🎉 Tu as trié {score} nombres !
                </p>
            )}
        </div>
    );
}
