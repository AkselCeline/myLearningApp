import React, { useState, useEffect, useRef } from 'react';

export default function LoopAnimation() {
    const [i, setI] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [speed, setSpeed] = useState(800);

    const maxIterations = 5;
    const intervalRef = useRef(null);

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
                    setLogs(logs => [...logs, `Itération ${next} : i vaut maintenant ${next}`]);
                    return next;
                });
            }, speed);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, speed]);

    function reset() {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setI(0);
        setLogs([]);
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header : Concept de la Boucle */}
            <header className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-indigo-200 text-xs font-black uppercase tracking-[0.2em] mb-4">La Boucle FOR</h2>
                    <p className="text-xl font-medium leading-relaxed">
                        Répéter une tâche manuellement est fatigant. <br/>
                        La boucle permet de dire à l'ordinateur : <span className="text-indigo-900 font-black italic underline decoration-white underline-offset-4">"Fais ceci X fois"</span>.
                    </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-10 text-[12rem] font-black italic">FOR</div>
            </header>



            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Visualisation Centrale */}
                <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border-2 border-slate-100 shadow-sm flex flex-col items-center gap-8">
                    <div className="relative flex items-center justify-center">
                        {/* Cercle de progression SVG */}
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle
                                cx="96" cy="96" r="88"
                                stroke="currentColor" strokeWidth="8"
                                fill="transparent" className="text-slate-100"
                            />
                            <circle
                                cx="96" cy="96" r="88"
                                stroke="currentColor" strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={553}
                                strokeDashoffset={553 - (553 * i) / maxIterations}
                                className="text-indigo-500 transition-all duration-500 ease-out"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-slate-400 font-black text-xs uppercase tracking-widest">Valeur de i</span>
                            <span className="text-6xl font-black text-slate-800">{i}</span>
                        </div>
                    </div>

                    <div className="w-full space-y-4">
                        <div className="flex gap-3">
                            <button
                                onClick={toggleRun}
                                className={`flex-1 py-4 rounded-2xl font-black text-white transition-all shadow-lg active:scale-95 ${
                                    isRunning ? "bg-rose-500 shadow-rose-100" : "bg-indigo-600 shadow-indigo-100"
                                }`}
                            >
                                {isRunning ? '⏸ PAUSE' : i === maxIterations ? '🔄 RELANCER' : '▶ DÉMARRER'}
                            </button>
                            <button
                                onClick={reset}
                                className="px-6 bg-slate-100 text-slate-400 rounded-2xl font-black hover:bg-slate-200 transition-all"
                            >
                                ⟲
                            </button>
                        </div>

                        <div className="space-y-2 px-2">
                            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span>Lent</span>
                                <span>Vitesse : {speed}ms</span>
                                <span>Rapide</span>
                            </div>
                            <input
                                type="range" min="200" max="1500" step="100" value={speed}
                                onChange={e => setSpeed(Number(e.target.value))}
                                className="w-full accent-indigo-600"
                            />
                        </div>
                    </div>
                </section>

                {/* Console et Code */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl border-4 border-slate-800 font-mono text-sm overflow-hidden">
                        <div className="flex gap-2 mb-4 border-b border-slate-800 pb-3 text-slate-500 text-[10px] font-black tracking-widest uppercase">
                            Console de sortie
                        </div>
                        <div className="space-y-2 h-48 overflow-y-auto scrollbar-hide text-indigo-300">
                            {logs.length === 0 ? (
                                <p className="italic opacity-30 text-xs">En attente d'exécution...</p>
                            ) : (
                                logs.map((log, idx) => (
                                    <div key={idx} className="flex gap-3 animate-question">
                                        <span className="text-slate-600 font-bold">{idx + 1}</span>
                                        <span className="text-emerald-400 italic">✔</span>
                                        {log}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {i === maxIterations && (
                        <div className="bg-emerald-500 rounded-[2rem] p-6 text-white text-center font-black animate-question shadow-xl shadow-emerald-100">
                            ✨ MISSION TERMINÉE ! <br/>
                            <span className="text-xs font-medium opacity-80 uppercase tracking-widest">
                                La condition (i &le; {maxIterations}) est devenue fausse.
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Aide-mémoire Visuel */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Structure d'une boucle
                </h4>
                <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-center uppercase tracking-tighter sm:text-xs">
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100">
                        <span className="block text-indigo-500 mb-1">1. Départ</span>
                        i = 0
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100">
                        <span className="block text-indigo-500 mb-1">2. Condition</span>
                        i &lt; {maxIterations}
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-slate-100">
                        <span className="block text-indigo-500 mb-1">3. Pas (+1)</span>
                        i++
                    </div>
                </div>
            </div>
        </div>
    );
}