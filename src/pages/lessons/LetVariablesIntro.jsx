import React, { useState } from 'react';

export default function LetVariablesIntro() {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        // Validation flexible (on accepte avec ou sans l'espace après la virgule pour ne pas frustrer)
        const normalized = answer.trim().toLowerCase();
        if (normalized === 'bonjour, samira!' || normalized === 'bonjour,samira!') {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header Conceptuel */}
            <div className="bg-orange-500 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden text-white">
                <div className="relative z-10">
                    <h3 className="text-orange-100 text-xs font-black uppercase tracking-[0.2em] mb-4">Le concept de Variable</h3>
                    <p className="text-2xl font-black leading-tight">
                        Une variable, c'est comme une <span className="underline decoration-white underline-offset-4 italic text-slate-900">boîte étiquetée</span>.
                    </p>
                    <p className="mt-4 text-orange-50 font-medium">
                        Tu ranges une information dedans, et tu l'appelles par son nom dès que tu en as besoin.
                    </p>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-20 text-[10rem] font-black italic">LET</div>
            </div>

            {/* Illustration : Boîte vs Code */}
            <section className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border-2 border-slate-100 flex flex-col items-center justify-center space-y-4 shadow-sm">
                    <div className="relative">
                        <span className="text-6xl">📦</span>
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-md font-bold shadow-sm">
                            prenom
                        </div>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest text-center">
                        La boîte contient <br/> <span className="text-slate-900 dark:text-slate-100 text-lg">"Samira"</span>
                    </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-[2rem] flex flex-col justify-center shadow-xl">
                    <p className="text-slate-500 text-[10px] font-black uppercase mb-4 tracking-widest">En JavaScript</p>
                    <code className="text-orange-400 font-mono text-lg">
                        <span className="text-pink-400 font-bold">let</span> prenom = <span className="text-amber-200">"Samira"</span>;
                    </code>
                </div>
            </section>

            {/* Mini Challenge interactif */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-xl shadow-slate-200/50">
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Le Prédicteur de Message</h2>
                    <p className="text-slate-400 font-bold text-[10px] uppercase mt-1">Devine ce que l'ordinateur va dire</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl font-mono text-sm space-y-2 border border-slate-100 mb-8 overflow-hidden">
                    <div className="flex gap-4"><span className="text-slate-300">1</span> <span className="text-pink-400 italic">let</span> prenom = <span className="text-orange-600">"Samira"</span>;</div>
                    <div className="flex gap-4"><span className="text-slate-300">2</span> <span className="text-indigo-500">console</span>.<span className="text-sky-500">log</span>(<span className="text-orange-600">"Bonjour, "</span> + prenom + <span className="text-orange-600">"!"</span>);</div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                        <input
                            type="text"
                            className={`w-full p-5 bg-slate-50 border-2 rounded-2xl outline-none font-bold transition-all text-center text-lg ${
                                isCorrect === null ? "border-slate-100 focus:border-orange-500" :
                                    isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-900" : "border-rose-500 bg-rose-50 text-rose-900"
                            }`}
                            placeholder='Bonjour, Samira !'
                            value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value);
                                setIsCorrect(null);
                            }}
                        />
                        {isCorrect && <span className="absolute right-5 top-5 text-2xl animate-bounce">🎯</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all active:scale-95 shadow-xl"
                    >
                        Vérifier la valeur
                    </button>
                </form>

                {isCorrect === false && (
                    <div className="mt-4 p-4 bg-rose-100 text-rose-700 rounded-xl text-center font-bold animate-question text-sm">
                        ❌ Oups ! N'oublie pas la virgule et le point d'exclamation.
                    </div>
                )}
            </section>

            {/* Aide Mémoire */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
                <span className="text-2xl">💡</span>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    Le signe <span className="font-bold text-slate-800">=</span> ne veut pas dire "égal" comme en maths. Il veut dire <span className="text-orange-600 font-bold italic">"range cette valeur dans cette boîte"</span>.
                </p>
            </div>
        </div>
    );
}