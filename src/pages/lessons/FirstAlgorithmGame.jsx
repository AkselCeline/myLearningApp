import React, { useState } from 'react';

const gridSize = 3;
const goalPosition = { x: 2, y: 0 }; // coin haut droit

const tournerDroite = dir => {
    const ordre = ['haut', 'droite', 'bas', 'gauche'];
    return ordre[(ordre.indexOf(dir) + 1) % 4];
};

const tournerGauche = dir => {
    const ordre = ['haut', 'gauche', 'bas', 'droite'];
    return ordre[(ordre.indexOf(dir) + 1) % 4];
};

export default function FirstAlgorithmGame() {
    const [code, setCode] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 2 });
    const [direction, setDirection] = useState('haut');
    const [message, setMessage] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    function runCode() {
        setIsAnimating(true);
        let pos = { ...position };
        let dir = direction;

        const commands = code
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        for (let cmd of commands) {
            if (cmd === 'avancer()') {
                if (dir === 'haut') pos.y -= 1;
                else if (dir === 'bas') pos.y += 1;
                else if (dir === 'gauche') pos.x -= 1;
                else if (dir === 'droite') pos.x += 1;
            } else if (cmd === 'tournerDroite()') {
                dir = tournerDroite(dir);
            } else if (cmd === 'tournerGauche()') {
                dir = tournerGauche(dir);
            } else {
                setMessage(`⚠️ Erreur : "${cmd}" est inconnu.`);
                setIsAnimating(false);
                return;
            }

            if (pos.x < 0 || pos.x >= gridSize || pos.y < 0 || pos.y >= gridSize) {
                setMessage('💥 Le robot a percuté le mur !');
                setIsAnimating(false);
                return;
            }
        }

        setPosition(pos);
        setDirection(dir);

        if (pos.x === goalPosition.x && pos.y === goalPosition.y) {
            setMessage('🏆 Mission accomplie ! Le robot a atteint le drapeau.');
        } else {
            setMessage('📍 Destination non atteinte. Ajuste ton code !');
        }
        setIsAnimating(false);
    }

    const resetGame = () => {
        setPosition({ x: 0, y: 2 });
        setDirection('haut');
        setMessage('');
        setCode('');
    };

    return (
        <div className="space-y-8 py-4 animate-question">
            {/* Header / Tutoriel */}
            <header className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
                <h2 className="text-xl font-black text-indigo-900 mb-4 flex items-center gap-2">
                    <span>🤖</span> Mission : Algorithme de Navigation
                </h2>
                <div className="text-sm text-indigo-700 space-y-2 leading-relaxed font-medium">
                    <p>Guide le robot vers le 🚩 en utilisant ces commandes :</p>
                    <div className="flex flex-wrap gap-2 py-2">
                        {['avancer()', 'tournerDroite()', 'tournerGauche()'].map(cmd => (
                            <code key={cmd} className="bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-indigo-200 font-bold text-indigo-600">
                                {cmd}
                            </code>
                        ))}
                    </div>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Zone de Code */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Éditeur de code</span>
                        <button onClick={resetGame} className="text-[10px] font-black text-rose-500 uppercase hover:underline">Réinitialiser</button>
                    </div>
                    <div className="relative">
                        <textarea
                            rows={8}
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            placeholder={"// Écris ton code ici...\navancer()\ntournerDroite()"}
                            className="w-full bg-slate-900 text-emerald-400 font-mono p-6 rounded-[2rem] shadow-xl border-4 border-slate-800 outline-none focus:border-indigo-500 transition-all resize-none"
                        />
                        <button
                            onClick={runCode}
                            disabled={isAnimating}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isAnimating ? "Mouvement..." : "EXÉCUTER ▶"}
                        </button>
                    </div>
                </div>

                {/* Zone de Grille */}
                <div className="flex flex-col items-center gap-6 bg-slate-50 p-8 rounded-[3rem] border border-slate-100">
                    <div className="grid grid-cols-3 gap-3 bg-slate-200 p-3 rounded-3xl shadow-inner">
                        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                            const x = i % gridSize;
                            const y = Math.floor(i / gridSize);
                            const isRobot = position.x === x && position.y === y;
                            const isGoal = goalPosition.x === x && goalPosition.y === y;

                            const dirRotation = {
                                haut: 'rotate-0',
                                droite: 'rotate-90',
                                bas: 'rotate-180',
                                gauche: '-rotate-90'
                            };

                            return (
                                <div
                                    key={i}
                                    className="w-20 h-20 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden"
                                >
                                    {isGoal && <span className="text-3xl animate-pulse">🚩</span>}
                                    {isRobot && (
                                        <div className={`text-4xl transition-all duration-500 ease-out transform ${dirRotation[direction]}`}>
                                            🤖
                                        </div>
                                    )}
                                    {/* Coordonnées discrètes */}
                                    <span className="absolute bottom-1 right-1 text-[8px] text-slate-200 font-bold">{x},{y}</span>
                                </div>
                            );
                        })}
                    </div>

                    {message && (
                        <div className={`p-4 rounded-2xl text-sm font-bold text-center animate-question ${
                            message.includes('🎉') || message.includes('🏆')
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : "bg-rose-50 text-rose-600 border border-rose-100"
                        }`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}