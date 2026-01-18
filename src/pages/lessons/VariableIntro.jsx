import React, { useState } from 'react';

export default function VariableIntro() {
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);
    const [userPairs, setUserPairs] = useState({});
    const [validationResult, setValidationResult] = useState(null);

    const exampleVariables = [
        { name: 'nom', value: 'Alice', color: 'bg-amber-100 border-amber-200' },
        { name: 'âge', value: '25', color: 'bg-orange-100 border-orange-200' },
        { name: 'ville', value: 'Paris', color: 'bg-yellow-100 border-yellow-200' },
    ];

    const gameVariables = [
        { id: 'animal', label: 'animal' },
        { id: 'nombre', label: 'nombre' },
        { id: 'couleur', label: 'couleur' }
    ];
    const possibleValues = ['Chat', '42', 'Bleu'];

    function handleQuizSubmit(e) {
        e.preventDefault();
        const ans = quizAnswer.toLowerCase();
        if (ans.includes('boite') || ans.includes('boîte') || ans.includes('conteneur')) {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    const checkPairs = () => {
        const isCorrect = userPairs.animal === 'Chat' && userPairs.nombre === '42' && userPairs.couleur === 'Bleu';
        setValidationResult(isCorrect);
    };

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header Conceptuel */}
            <header className="bg-amber-500 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-amber-100 text-xs font-black uppercase tracking-[0.2em] mb-4">Module 01 : Fondations</h2>
                    <p className="text-2xl font-black leading-tight">
                        La Variable : <br/>
                        <span className="text-amber-900 italic italic">L'art de stocker.</span>
                    </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-20 text-[12rem] font-black italic">VAR</div>
            </header>



            {/* Visualisation Interactive */}
            <section className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Explorateur de Mémoire</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {exampleVariables.map(v => (
                        <div key={v.name} className={`group ${v.color} border-2 rounded-3xl p-6 transition-all hover:scale-105 hover:shadow-lg`}>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black text-amber-600/50 uppercase tracking-widest">Étiquette</span>
                                <span className="text-xl">🏷️</span>
                            </div>
                            <div className="text-2xl font-black text-slate-800 mb-6">{v.name}</div>
                            <div className="bg-white/50 rounded-xl p-3 border border-white/50 text-center">
                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Contenu</div>
                                <div className="text-xl font-black text-amber-700">{v.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quiz Interactif */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <section className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl">
                    <h4 className="text-amber-400 font-black text-sm uppercase mb-4 tracking-widest">Auto-Évaluation</h4>
                    <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                        Pour ton cerveau de futur développeur, une <strong>variable</strong> est comparable à quel objet du quotidien ?
                    </p>
                    <form onSubmit={handleQuizSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={quizAnswer}
                            onChange={e => {setQuizAnswer(e.target.value); setQuizResult(null);}}
                            className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl p-4 text-white outline-none focus:border-amber-500 transition-all font-bold"
                            placeholder="Ta réponse..."
                        />
                        <button className="w-full bg-amber-500 text-white py-4 rounded-xl font-black hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-900/20">
                            Vérifier
                        </button>
                    </form>
                    {quizResult !== null && (
                        <div className={`mt-4 p-4 rounded-xl text-center text-xs font-black animate-question ${quizResult ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                            {quizResult ? '🎯 GAGNÉ ! La métaphore de la boîte est parfaite.' : '❌ Indice : on y range des choses pour plus tard...'}
                        </div>
                    )}
                </section>

                {/* Mini-Jeu d'Assignation */}
                <section className="bg-amber-50 rounded-[2rem] border-2 border-amber-100 p-8 shadow-sm">
                    <h4 className="text-amber-800 font-black text-sm uppercase mb-4 tracking-widest">Atelier d'Assignation</h4>
                    <div className="space-y-4">
                        {gameVariables.map(v => (
                            <div key={v.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-amber-100 transition-all hover:border-amber-300">
                                <code className="text-amber-600 font-black text-lg underline decoration-amber-200 underline-offset-4">{v.label}</code>
                                <select
                                    onChange={e => setUserPairs(prev => ({...prev, [v.id]: e.target.value}))}
                                    className="bg-slate-50 border-2 border-slate-100 rounded-xl p-2 font-bold text-slate-700 outline-none focus:border-amber-400"
                                >
                                    <option value="">???</option>
                                    {possibleValues.map(val => <option key={val} value={val}>{val}</option>)}
                                </select>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={checkPairs}
                        className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-slate-800 transition-all active:scale-95"
                    >
                        Tester les liens
                    </button>
                    {validationResult !== null && (
                        <p className={`mt-4 text-center font-black animate-question ${validationResult ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {validationResult ? '✨ Mémoire organisée ! Bravo.' : '⚙️ Il y a un bug dans les étiquettes...'}
                        </p>
                    )}
                </section>
            </div>

            {/* Syntaxe réelle */}
            <footer className="bg-slate-50 border border-slate-100 p-6 rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-mono text-xs italic">js</div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">En langage réel</span>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 font-mono text-xs sm:text-sm text-indigo-300 overflow-hidden relative">
                    <p><span className="text-pink-400 font-bold italic">let</span> animal = <span className="text-emerald-400">"Chat"</span>;</p>
                    <p><span className="text-pink-400 font-bold italic">let</span> nombre = <span className="text-amber-400">42</span>;</p>
                    <p><span className="text-pink-400 font-bold italic">let</span> couleur = <span className="text-emerald-400">"Bleu"</span>;</p>
                    <div className="absolute top-4 right-4 text-[10px] text-slate-600 font-black tracking-widest">UTF-8</div>
                </div>
            </footer>
        </div>
    );
}