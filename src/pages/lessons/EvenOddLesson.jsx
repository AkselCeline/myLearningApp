import React, { useState, useEffect } from 'react';

export default function EvenOddLesson() {
    const [inputNumber, setInputNumber] = useState('');
    const [result, setResult] = useState(null);
    const [quizResult, setQuizResult] = useState(null);

    const [dragItems, setDragItems] = useState([]);
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
        if (isPlaying && dragItems.length === 0 && score > 0) {
            setIsPlaying(false);
        }
    }, [dragItems, isPlaying, score]);

    function checkEvenOdd() {
        const n = parseInt(inputNumber, 10);
        if (isNaN(n)) {
            setResult(null);
        } else {
            setResult(n % 2 === 0 ? 'Pair' : 'Impair');
        }
    }

    function handleQuizSubmit(e) {
        e.preventDefault();
        if (parseInt(inputNumber) % 2 !== 0) { // On demande pour 9 dans l'énoncé
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    function handleDrop(target, value) {
        if (target === 'even' && value % 2 === 0) {
            setEvenBox([...evenBox, value]);
            setDragItems(dragItems.filter(n => n !== value));
            setScore(prev => prev + 1);
        } else if (target === 'odd' && value % 2 !== 0) {
            setOddBox([...oddBox, value]);
            setDragItems(dragItems.filter(n => n !== value));
            setScore(prev => prev + 1);
        }
    }

    function startGame() {
        setDragItems(shuffle([1, 4, 7, 9, 2, 6, 11, 14, 20, 33, 42, 57]));
        setEvenBox([]);
        setOddBox([]);
        setScore(0);
        setTimer(30);
        setIsPlaying(true);
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header Logique */}
            <section className="bg-slate-900 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-violet-400 text-xs font-black uppercase tracking-[0.2em] mb-4">L'opérateur Modulo %</h3>
                    <p className="text-white text-lg font-medium leading-relaxed">
                        Pour savoir si un nombre est <span className="text-emerald-400 font-black">Pair</span> ou <span className="text-amber-400 font-black">Impair</span>, on regarde le reste de sa division par 2.
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white/10 p-3 rounded-xl border border-white/10 font-mono text-sm text-emerald-300">
                            8 % 2 = 0 <span className="text-white/50">→ Pair</span>
                        </div>
                        <div className="bg-white/10 p-3 rounded-xl border border-white/10 font-mono text-sm text-amber-300">
                            7 % 2 = 1 <span className="text-white/50">→ Impair</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testeur de nombre */}
            <section className="bg-white rounded-[2rem] p-8 border-2 border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <span className="p-2 bg-violet-100 rounded-lg text-lg">🧪</span> Testeur de Modulo
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="number"
                        value={inputNumber}
                        onChange={e => setInputNumber(e.target.value)}
                        className="flex-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-violet-500 font-bold text-slate-700 transition-all"
                        placeholder="Entre un nombre..."
                    />
                    <button
                        onClick={checkEvenOdd}
                        className="bg-violet-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-violet-700 transition-all shadow-lg shadow-violet-100"
                    >
                        Analyser
                    </button>
                </div>
                {result && (
                    <div className={`mt-4 p-4 rounded-2xl text-center font-black animate-question ${result === 'Pair' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        Ce nombre est {result} !
                    </div>
                )}
            </section>

            {/* Jeu de Tri Éclair */}
            <section className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-slate-800">Défi : Le Grand Tri</h2>
                    {!isPlaying && (
                        <p className="text-slate-500 font-medium mt-2 italic text-sm">
                            Trie les nombres le plus vite possible dans les bonnes zones.
                        </p>
                    )}
                </div>

                {!isPlaying ? (
                    <div className="text-center">
                        {score > 0 && (
                            <div className="mb-6 animate-question">
                                <p className="text-4xl font-black text-violet-600 mb-1">{score}</p>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Nombres triés avec succès</p>
                            </div>
                        )}
                        <button
                            onClick={startGame}
                            className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-xl active:scale-95"
                        >
                            {score > 0 ? "Recommencer" : "Lancer le Défi"}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8 animate-question">
                        {/* Barre d'infos Jeu */}
                        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Temps</span>
                                <span className={`text-xl font-black ${timer < 10 ? 'text-rose-500 animate-pulse' : 'text-slate-700'}`}>{timer}s</span>
                            </div>
                            <div className="h-8 w-px bg-slate-100"></div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Score</span>
                                <span className="text-xl font-black text-violet-600">{score}</span>
                            </div>
                        </div>

                        {/* Zone de Drag */}
                        <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-slate-200 min-h-[120px] flex flex-wrap justify-center gap-3">
                            {dragItems.map(n => (
                                <div
                                    key={n}
                                    draggable
                                    onDragStart={e => e.dataTransfer.setData('text/plain', n)}
                                    className="w-14 h-14 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-700 shadow-sm cursor-grab active:cursor-grabbing hover:border-violet-300 hover:text-violet-600 transition-all text-lg"
                                >
                                    {n}
                                </div>
                            ))}
                        </div>

                        {/* Zones de Drop */}
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                onDragOver={e => e.preventDefault()}
                                onDrop={e => handleDrop('even', parseInt(e.dataTransfer.getData('text')))}
                                className="group min-h-[150px] p-4 bg-emerald-50 border-4 border-dashed border-emerald-200 rounded-[2rem] flex flex-col items-center transition-all hover:bg-emerald-100 hover:border-emerald-400"
                            >
                                <span className="text-2xl mb-2 group-hover:scale-125 transition-transform">🟢</span>
                                <h4 className="font-black text-emerald-700 uppercase text-xs tracking-widest">Pairs</h4>
                                <div className="flex flex-wrap gap-1 mt-4 justify-center">
                                    {evenBox.map((n, i) => (
                                        <span key={i} className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-md">{n}</span>
                                    ))}
                                </div>
                            </div>

                            <div
                                onDragOver={e => e.preventDefault()}
                                onDrop={e => handleDrop('odd', parseInt(e.dataTransfer.getData('text')))}
                                className="group min-h-[150px] p-4 bg-amber-50 border-4 border-dashed border-amber-200 rounded-[2rem] flex flex-col items-center transition-all hover:bg-amber-100 hover:border-amber-400"
                            >
                                <span className="text-2xl mb-2 group-hover:scale-125 transition-transform">🟠</span>
                                <h4 className="font-black text-amber-700 uppercase text-xs tracking-widest">Impairs</h4>
                                <div className="flex flex-wrap gap-1 mt-4 justify-center">
                                    {oddBox.map((n, i) => (
                                        <span key={i} className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-md">{n}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}