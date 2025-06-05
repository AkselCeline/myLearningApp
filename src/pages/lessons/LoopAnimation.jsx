import React, { useState, useEffect, useRef } from 'react';

export default function LoopAnimation() {
    const [i, setI] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [speed, setSpeed] = useState(800); // vitesse en ms par étape

    const maxIterations = 5;
    const intervalRef = useRef(null);

    // Fonction pour démarrer ou arrêter l'animation
    function toggleRun() {
        if (isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        } else {
            if (i >= maxIterations) {
                setI(0);
                setLogs([]);
            }
            setIsRunning(true);
        }
    }

    // Effet pour gérer la boucle animée
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setI(prev => {
                    const next = prev + 1;
                    if (next > maxIterations) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        return prev;
                    }
                    setLogs(logs => [...logs, `Itération ${next}: i = ${next}`]);
                    return next;
                });
            }, speed);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, speed]);

    // Reset manuel
    function reset() {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setI(0);
        setLogs([]);
    }

    return (
        <div className="max-w-lg mx-auto p-6 font-sans space-y-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Animation de boucle FOR</h2>
            <p>
                Cette animation montre une boucle <code>for</code> qui compte de 1 à {maxIterations}.
                À chaque itération, on affiche la valeur de <code>i</code>.
            </p>

            <div className="text-center mt-6 mb-4">
                <div className="inline-block p-6 bg-blue-100 rounded">
                    <div className="text-xl font-semibold mb-2">Valeur de i</div>
                    <div className="text-6xl font-mono text-blue-700">{i === 0 ? '-' : i}</div>
                </div>
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={toggleRun}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    {isRunning ? 'Pause' : i === maxIterations ? 'Relancer' : 'Démarrer'}
                </button>
                <button
                    onClick={reset}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                    disabled={!i && logs.length === 0}
                >
                    Réinitialiser
                </button>
            </div>

            <div className="mt-6">
                <label className="block mb-2 font-semibold" htmlFor="speed">
                    Vitesse de l’animation (ms par étape) : {speed} ms
                </label>
                <input
                    type="range"
                    id="speed"
                    min="200"
                    max="2000"
                    step="100"
                    value={speed}
                    onChange={e => setSpeed(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            <div className="mt-6 max-h-48 overflow-y-auto bg-gray-100 p-3 rounded border">
                <h3 className="font-semibold mb-2">Instructions exécutées :</h3>
                {logs.length === 0 && <p className="italic text-gray-500">Lancez l’animation pour voir les étapes.</p>}
                <ul className="list-disc list-inside font-mono text-sm space-y-1">
                    {logs.map((log, idx) => (
                        <li key={idx}>{log}</li>
                    ))}
                </ul>
            </div>

            {i === maxIterations && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded text-green-700 font-semibold">
                    La boucle est terminée !<br />
                    Cela signifie qu’on a exécuté toutes les instructions de la boucle de 1 à {maxIterations}.
                </div>
            )}
        </div>
    );
}
