import React, { useState } from 'react';

export default function ConsoleLogIntro() {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    function checkAnswer(e) {
        e.preventDefault();
        // Validation plus flexible : on accepte avec ou sans espace après les deux-points
        const cleaned = answer.trim().toLowerCase();
        if (cleaned === 'le résultat est : 9' || cleaned === 'le résultat est :9' || cleaned === 'lerésultatest:9') {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header Conceptuel */}
            <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-4">La commande Console.log</h3>
                    <p className="text-white text-xl font-medium leading-relaxed">
                        C'est la voix de ton programme. <br/>
                        Utilise <span className="text-amber-400 font-mono">console.log()</span> pour que l'ordinateur te parle et affiche ses calculs.
                    </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10 text-9xl font-black text-white">" "</div>
            </div>

            {/* Démo Visuelle : Code vs Sortie */}
            <section className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <p className="text-slate-500 text-[10px] font-black uppercase ml-4">Ton Code ✍️</p>
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 p-6 rounded-[1.5rem] font-mono text-sm text-indigo-600 shadow-sm">
                        console.log(<span className="text-amber-600">"Bonjour !"</span>);
                    </div>
                </div>
                <div className="space-y-3">
                    <p className="text-slate-500 text-[10px] font-black uppercase ml-4">Résultat 🖥️</p>
                    <div className="bg-slate-800 p-6 rounded-[1.5rem] font-mono text-sm text-emerald-400 shadow-inner flex items-center">
                        <span className="mr-2 text-slate-500">{'>'}</span> Bonjour !
                    </div>
                </div>
            </section>

            {/* Challenge : Le Prédicteur */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-xl shadow-slate-200/50">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-slate-800">Mission : Prédire la Console</h2>
                    <p className="text-slate-500 font-medium mt-1 text-sm">Observe ce bloc de code et devine ce qui s'affichera.</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm space-y-2 border border-slate-100 mb-8">
                    <div className="flex gap-4"><span className="text-slate-300">1</span> <span className="text-indigo-600">console</span>.<span className="text-sky-500">log</span>(<span className="text-amber-600">"Le résultat est :"</span>);</div>
                    <div className="flex gap-4"><span className="text-slate-300">2</span> <span className="text-indigo-600">console</span>.<span className="text-sky-500">log</span>(<span className="text-pink-500">3 * 3</span>);</div>
                </div>

                <form onSubmit={checkAnswer} className="space-y-4">
                    <div className="relative group">
                        <input
                            type="text"
                            className={`w-full p-5 bg-slate-50 border-2 rounded-2xl outline-none font-bold transition-all text-lg ${
                                isCorrect === null ? "border-slate-100 focus:border-indigo-500" :
                                    isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-900" : "border-rose-500 bg-rose-50 text-rose-900"
                            }`}
                            placeholder='Ex: Le résultat est : 9'
                            value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value);
                                setIsCorrect(null);
                            }}
                        />
                        {isCorrect && <span className="absolute right-5 top-5 text-2xl animate-bounce">✨</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
                    >
                        Vérifier l'affichage
                    </button>
                </form>

                {isCorrect === false && (
                    <div className="mt-4 p-4 bg-rose-100 text-rose-700 rounded-xl text-center font-bold animate-question">
                        ❌ Pas tout à fait... Indice : calcule 3 x 3 !
                    </div>
                )}
            </section>

            {/* Sandbox Tips */}
            <section className="bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100">
                <div className="flex items-start gap-4">
                    <div className="text-3xl bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm">🚀</div>
                    <div>
                        <h4 className="text-indigo-900 font-black text-lg mb-2">À toi de tester !</h4>
                        <p className="text-indigo-700 font-medium text-sm leading-relaxed mb-4">
                            Savais-tu que tu peux faire des calculs complexes directement dans un log ?
                        </p>
                        <div className="bg-white/50 p-4 rounded-xl font-mono text-xs text-indigo-800 border border-indigo-200">
                            console.log("5 + 7 = " + (5 + 7));
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center">
                <a
                    href="https://jsconsole.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-indigo-500 transition-colors text-sm"
                >
                    Ouvrir une console en ligne <span className="text-lg">↗</span>
                </a>
            </div>
        </div>
    );
}