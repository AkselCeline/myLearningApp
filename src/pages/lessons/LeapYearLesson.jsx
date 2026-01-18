import React, { useState } from 'react';

export default function LeapYearLesson() {
    const [year, setYear] = useState('');
    const [result, setResult] = useState(null);
    const [explanation, setExplanation] = useState('');
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizFeedback, setQuizFeedback] = useState(null);

    const checkLeapYear = () => {
        const y = parseInt(year);
        if (isNaN(y)) {
            setResult(null);
            setExplanation("Entre un nombre valide.");
            return;
        }

        if (y % 4 !== 0) {
            setResult({ text: "Commune", isLeap: false });
            setExplanation(`L'année ${y} n'est pas divisible par 4. Pas de 29 février !`);
        } else if (y % 100 !== 0) {
            setResult({ text: "Bissextile", isLeap: true });
            setExplanation(`Divisible par 4 mais pas par 100 : c'est une année bissextile.`);
        } else if (y % 400 === 0) {
            setResult({ text: "Bissextile", isLeap: true });
            setExplanation(`Exception de l'exception : divisible par 400 ! Elle est bissextile.`);
        } else {
            setResult({ text: "Commune", isLeap: false });
            setExplanation(`Divisible par 100 mais pas par 400 : elle perd son titre de bissextile.`);
        }
    };

    const checkQuiz = () => {
        const answer = quizAnswer.trim().toLowerCase();
        setQuizFeedback(answer === "non" ? "Correct ! 1900 est divisible par 100 mais pas par 400. ✅" : "Et non ! C'est le piège classique des siècles. ❌");
    };

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header Calendrier */}
            <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-amber-400 text-xs font-black uppercase tracking-[0.2em] mb-4">L'énigme du 29 Février</h3>
                    <p className="text-xl font-medium leading-relaxed">
                        Toutes les années divisibles par 4 ne sont pas bissextiles. <br/>
                        C'est un <span className="text-amber-300 font-black italic underline decoration-white underline-offset-4">filtre logique</span> à trois étapes.
                    </p>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-10 text-[10rem] font-black italic">366</div>
            </section>

            {/* Focus : Le Modulo % */}
            <div className="bg-amber-50 rounded-[2rem] p-8 border-2 border-amber-100 relative group">
                <div className="absolute -top-4 left-8 bg-amber-400 text-white px-4 py-1 rounded-full text-xs font-black uppercase shadow-lg">
                    Outil : Le Modulo %
                </div>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <p className="text-amber-900 font-bold leading-relaxed">
                            Le modulo donne le <span className="underline decoration-amber-500 underline-offset-4">reste</span> d'une division.
                        </p>
                        <p className="text-amber-700 text-sm mt-3 italic">
                            Si <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-bold">Année % 4 === 0</code>, cela veut dire que l'année est parfaitement divisible par 4.
                        </p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-2xl space-y-2 font-mono text-sm shadow-inner">
                        <div className="flex justify-between"><span>10 % 3</span> <span className="font-black text-amber-600">reste 1</span></div>
                        <div className="flex justify-between"><span>12 % 4</span> <span className="font-black text-emerald-600">reste 0</span></div>
                    </div>
                </div>
            </div>

            {/* Testeur d'année */}
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 p-8 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Simulateur de Calendrier</h3>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                        type="number"
                        value={year}
                        onChange={e => { setYear(e.target.value); setResult(null); }}
                        className="flex-1 p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none focus:border-indigo-500 font-black text-2xl text-slate-700 transition-all text-center"
                        placeholder="Ex: 2024"
                    />
                    <button
                        onClick={checkLeapYear}
                        className="bg-indigo-600 text-white px-8 py-4 rounded-3xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
                    >
                        Analyser
                    </button>
                </div>

                {result && (
                    <div className={`p-6 rounded-[2rem] animate-question border-2 ${result.isLeap ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`text-4xl ${result.isLeap ? 'animate-bounce' : ''}`}>
                                {result.isLeap ? '🌟' : '📅'}
                            </div>
                            <div>
                                <h4 className={`text-lg font-black ${result.isLeap ? 'text-emerald-700' : 'text-slate-700'}`}>
                                    Année {result.text}
                                </h4>
                                <p className="text-sm text-slate-500 font-medium">{explanation}</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Pseudo-code & Logic Tree */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="bg-slate-900 p-6 rounded-[2rem] shadow-2xl overflow-hidden relative">
                    <div className="text-xs font-black text-slate-500 uppercase mb-4 tracking-widest">Algorithme (Pseudo-code)</div>
                    <pre className="text-indigo-300 font-mono text-xs leading-relaxed">
                        <span className="text-pink-400 italic font-sans">// Étape 1</span><br/>
                        <span className="text-pink-400">SI</span> année % 4 != 0 <span className="text-pink-400">ALORS</span><br/>
                        {"  "}Afficher "Commune"<br/>
                        <span className="text-pink-400">SINON SI</span> année % 100 != 0 <span className="text-pink-400">ALORS</span><br/>
                        {"  "}Afficher "Bissextile"<br/>
                        <span className="text-pink-400">SINON SI</span> année % 400 == 0 <span className="text-pink-400">ALORS</span><br/>
                        {"  "}Afficher "Bissextile"<br/>
                        <span className="text-pink-400">SINON</span><br/>
                        {"  "}Afficher "Commune"
                    </pre>
                </div>

                {/* Quiz Rapide */}
                <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100">
                    <h4 className="text-indigo-900 font-black flex items-center gap-2 mb-4">
                        <span className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">🎯</span> Quiz Express
                    </h4>
                    <p className="text-indigo-700 font-medium text-sm mb-4 leading-relaxed">
                        L'année <strong>1900</strong> est-elle bissextile ?
                        <span className="block text-[10px] text-indigo-400 mt-1 uppercase tracking-tighter">(Indice : elle est divisible par 100 mais pas par 400)</span>
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={quizAnswer}
                            onChange={e => { setQuizAnswer(e.target.value); setQuizFeedback(null); }}
                            placeholder="Oui ou Non ?"
                            className="flex-1 px-4 py-3 rounded-xl border-2 border-indigo-100 outline-none focus:border-indigo-400 font-bold transition-all"
                        />
                        <button onClick={checkQuiz} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black hover:bg-indigo-700 transition-all shadow-md">
                            Vérifier
                        </button>
                    </div>
                    {quizFeedback && (
                        <div className={`mt-4 p-3 rounded-xl text-xs font-black text-center animate-question ${quizFeedback.includes('Correct') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {quizFeedback}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}