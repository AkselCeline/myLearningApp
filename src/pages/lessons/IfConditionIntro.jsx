import React, { useState } from 'react';

export default function IfConditionIntro() {
    const [age, setAge] = useState('');
    const [result, setResult] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        const num = parseInt(age, 10);
        if (!isNaN(num)) {
            if (num >= 18) {
                setResult({ text: "Tu es majeur !", type: "success" });
            } else {
                setResult({ text: "Tu es mineur.", type: "warning" });
            }
        } else {
            setResult({ text: "Entre un nombre valide !", type: "error" });
        }
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header Conceptuel */}
            <div className="bg-amber-500 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden text-white">
                <div className="relative z-10">
                    <h3 className="text-amber-100 text-xs font-black uppercase tracking-[0.2em] mb-4">La structure If / Else</h3>
                    <p className="text-2xl font-black leading-tight">
                        C'est l'heure de faire <br/>
                        un <span className="underline decoration-white underline-offset-4 text-slate-900 italic">choix logique</span>.
                    </p>
                    <p className="mt-4 text-amber-50 font-medium">
                        Le programme agit comme un aiguillage sur un chemin de fer.
                    </p>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-20 text-[10rem] font-black italic">IF</div>
            </div>



            [Image of an if-else condition flowchart]


            {/* Bloc de Code Interactif */}
            <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl font-mono text-sm border-4 border-slate-800">
                <div className="flex gap-2 mb-6 border-b border-slate-800 pb-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <pre className="space-y-1 overflow-x-auto">
                    <div><span className="text-pink-400">let</span> <span className="text-sky-300">age</span> = <span className="text-amber-300">{age || '??'}</span>;</div>
                    <div className="h-2"></div>
                    <div><span className="text-pink-400">if</span> (<span className="text-sky-300">age</span> {'>'}= <span className="text-amber-300">18</span>) {'{'}</div>
                    <div className={`transition-opacity duration-300 ${result?.type === 'success' ? 'opacity-100' : 'opacity-40'}`}>
                        <span className="text-indigo-400">  console</span>.<span className="text-sky-400">log</span>(<span className="text-emerald-400">"Majeur !"</span>);
                    </div>
                    <div>{'}'} <span className="text-pink-400">else</span> {'{'}</div>
                    <div className={`transition-opacity duration-300 ${result?.type === 'warning' ? 'opacity-100' : 'opacity-40'}`}>
                        <span className="text-indigo-400">  console</span>.<span className="text-sky-400">log</span>(<span className="text-amber-400">"Mineur."</span>);
                    </div>
                    <div>{'}'}</div>
                </pre>
            </div>

            {/* Simulateur de Condition */}
            <section className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-xl shadow-slate-200/50">
                <div className="mb-8 text-center">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Machine à Décider</h2>
                    <p className="text-slate-400 font-bold text-xs uppercase mt-1">Teste l'algorithme avec ton âge</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <label className="absolute -top-3 left-6 bg-white px-2 text-[10px] font-black text-amber-500 uppercase tracking-widest z-10">
                            Entrée de donnée
                        </label>
                        <input
                            type="number"
                            value={age}
                            onChange={e => {
                                setAge(e.target.value);
                                setResult(null);
                            }}
                            className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none focus:border-amber-400 font-black text-2xl text-slate-700 transition-all text-center"
                            placeholder="Tape un âge..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
                    >
                        Lancer le test →
                    </button>
                </form>

                {result && (
                    <div className={`mt-8 p-6 rounded-[2rem] text-center font-black text-xl animate-question border-2 flex items-center justify-center gap-3 ${
                        result.type === 'success' ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                            result.type === 'warning' ? "bg-amber-50 border-amber-100 text-amber-600" :
                                "bg-rose-50 border-rose-100 text-rose-600"
                    }`}>
                        <span className="text-2xl">
                            {result.type === 'success' ? '✅' : result.type === 'warning' ? '⏳' : '❌'}
                        </span>
                        {result.text}
                    </div>
                )}
            </section>

            {/* Note pédagogique */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
                <span className="text-2xl">💡</span>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    Le <span className="font-bold text-slate-800">else</span> n'est pas obligatoire, mais il est très utile pour prévoir un plan B si la condition du <span className="font-bold text-slate-800">if</span> n'est pas remplie !
                </p>
            </div>
        </div>
    );
}