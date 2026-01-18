import React, { useState } from 'react';

export default function FunctionIntro() {
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);
    const [functionMatch, setFunctionMatch] = useState({});
    const [matchResult, setMatchResult] = useState(null);

    const functions = [
        { name: 'saluer', description: 'Affiche un message de bienvenue', icon: '👋' },
        { name: 'addition', description: 'Calcule la somme de deux nombres', icon: '➕' },
        { name: 'afficherDate', description: 'Montre la date du jour', icon: '📅' },
    ];

    const descriptions = [
        'Affiche un message de bienvenue',
        'Calcule la somme de deux nombres',
        'Montre la date du jour',
    ];

    const correctMatches = {
        saluer: 'Affiche un message de bienvenue',
        addition: 'Calcule la somme de deux nombres',
        afficherDate: 'Montre la date du jour',
    };

    function handleQuizSubmit(e) {
        e.preventDefault();
        const keywords = ['répète', 'réutilisable', 'tâche', 'action', 'groupe', 'bloc'];
        const isCorrect = keywords.some(word => quizAnswer.toLowerCase().includes(word));
        setQuizResult(isCorrect);
    }

    function handleFunctionMatchChange(funcName, desc) {
        setFunctionMatch(prev => ({ ...prev, [funcName]: desc }));
        setMatchResult(null);
    }

    function validateMatches() {
        const keys = Object.keys(correctMatches);
        const allSelected = keys.every(key => functionMatch[key]);
        if (!allSelected) return;

        const allCorrect = keys.every(key => functionMatch[key] === correctMatches[key]);
        setMatchResult(allCorrect);
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Concept de la Machine */}
            <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200 mb-4">Le concept de Fonction</h2>
                    <p className="text-xl font-medium leading-relaxed">
                        Imagine une <span className="text-amber-300 font-black italic">machine</span> : tu lui donnes un ingrédient, elle suit sa recette, et elle te donne un résultat.
                    </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-10 text-[12rem] font-black">f(x)</div>
            </section>



            {/* Éditeur de code stylisé */}
            <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl font-mono text-sm border-4 border-slate-800">
                <div className="flex gap-2 mb-4 border-b border-slate-800 pb-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <pre className="space-y-1">
                    <div><span className="text-pink-400">function</span> <span className="text-sky-400">direBonjour</span>(<span className="text-orange-300">prenom</span>) {'{'}</div>
                    <div className="text-slate-500 italic">  // Cette tâche est rangée dans un tiroir</div>
                    <div>  <span className="text-indigo-400">console</span>.<span className="text-sky-400">log</span>(<span className="text-amber-200">"Bonjour "</span> + prenom);</div>
                    <div>{'}'}</div>
                    <div className="h-4"></div>
                    <div className="text-slate-500 italic">// On l'utilise (on l'appelle) quand on veut</div>
                    <div><span className="text-sky-400">direBonjour</span>(<span className="text-amber-200">"Alice"</span>);</div>
                </pre>
            </div>

            {/* Quiz de réflexion */}
            <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
                <h3 className="text-xl font-black text-slate-800 mb-4">Challenge de compréhension</h3>
                <form onSubmit={handleQuizSubmit} className="space-y-4">
                    <label className="block text-slate-600 font-bold mb-2">
                        En tes propres mots, pourquoi utilise-t-on une fonction plutôt que de copier-coller du code ?
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <textarea
                            className="flex-1 p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 rounded-2xl focus:border-violet-500 outline-none font-medium text-slate-700 transition-all resize-none"
                            rows="2"
                            value={quizAnswer}
                            onChange={e => setQuizAnswer(e.target.value)}
                            placeholder="Ta réponse..."
                        />
                        <button
                            type="submit"
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95"
                        >
                            Valider
                        </button>
                    </div>
                </form>
                {quizResult !== null && (
                    <div className={`mt-4 p-4 rounded-xl font-bold flex items-center gap-2 animate-question ${quizResult ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                        {quizResult ? "✨ Exact ! C'est pour éviter la répétition et mieux organiser son code." : "🤔 Pas tout à fait. Pense à la notion de 'gain de temps' ou de 'réutilisation'."}
                    </div>
                )}
            </section>

            {/* Jeu de tri : La console de commande */}
            <section className="space-y-6">
                <div className="text-center">
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Tableau de Bord des Fonctions</h3>
                    <p className="text-slate-400 font-bold text-xs mt-1">Configure chaque module pour qu'il fonctionne</p>
                </div>

                <div className="grid gap-4">
                    {functions.map(func => (
                        <div key={func.name} className="group bg-white dark:bg-slate-900 p-5 rounded-[1.5rem] border-2 border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-violet-200 transition-all hover:shadow-lg">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-violet-50 transition-colors">
                                    {func.icon}
                                </span>
                                <span className="font-mono font-black text-violet-600">{func.name}()</span>
                            </div>

                            <select
                                value={functionMatch[func.name] || ''}
                                onChange={e => handleFunctionMatchChange(func.name, e.target.value)}
                                className="bg-slate-50 border-2 border-slate-100 p-3 rounded-xl font-bold text-slate-600 outline-none focus:border-violet-400 transition-all cursor-pointer"
                            >
                                <option value="">Choisir la mission...</option>
                                {descriptions.map(desc => (
                                    <option key={desc} value={desc}>{desc}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <button
                        onClick={validateMatches}
                        className="w-full bg-violet-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-violet-100 hover:bg-violet-700 hover:-translate-y-1 transition-all active:scale-95"
                    >
                        Vérifier la Configuration
                    </button>

                    {matchResult !== null && (
                        <div className={`mt-6 p-6 rounded-[2rem] text-center font-black animate-question ${matchResult ? "bg-emerald-500 text-white shadow-2xl shadow-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-200"}`}>
                            {matchResult ? "🏆 SYSTÈME OPÉRATIONNEL ! Tes fonctions sont parfaites." : "⚙️ Une erreur de câblage... Vérifie tes associations !"}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}