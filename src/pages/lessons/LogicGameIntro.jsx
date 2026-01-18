import React, { useState } from 'react';

export default function LogicGameIntro() {
    const [answers, setAnswers] = useState({ fly: '', swim: '', mammal: '' });
    const [result, setResult] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleChange = (name, value) => {
        setAnswers(prev => ({ ...prev, [name]: value }));
        setResult(null); // Réinitialise le résultat si on change une réponse
    };

    function evaluate() {
        const { fly, swim, mammal } = answers;
        if (!fly || !swim || !mammal) return;

        let identification = "";
        if (fly === 'yes' && swim === 'no' && mammal === 'no') identification = '🐦 Un Oiseau';
        else if (fly === 'no' && swim === 'yes' && mammal === 'no') identification = '🐟 Un Poisson';
        else if (fly === 'no' && swim === 'no' && mammal === 'yes') identification = '🐱 Un Chat';
        else identification = "❓ Une créature inconnue";

        setResult(identification);
        setShowExplanation(true);
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header : Thématique Détective */}
            <header className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-4 text-center sm:text-left">Système Expert v1.0</h2>
                    <p className="text-2xl font-black leading-tight text-center sm:text-left">
                        L'algorithme de <br/>
                        <span className="text-emerald-400 italic italic">classification</span>.
                    </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-10 text-[12rem] font-black italic">IF</div>
            </header>



            {/* Zone de Jeu */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <section className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Collecte de données</h3>

                    {[
                        { id: 'fly', label: 'Peut-il voler ?', icon: '☁️' },
                        { id: 'swim', label: 'Sait-il nager ?', icon: '🌊' },
                        { id: 'mammal', label: 'Est-ce un mammifère ?', icon: '🧬' }
                    ].map((q) => (
                        <div key={q.id} className="space-y-2">
                            <label className="text-sm font-black text-slate-700 flex items-center gap-2">
                                <span>{q.icon}</span> {q.label}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {['yes', 'no'].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => handleChange(q.id, val)}
                                        className={`py-3 rounded-xl font-bold transition-all border-2 ${
                                            answers[q.id] === val
                                                ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100 scale-[1.02]"
                                                : "bg-slate-50 border-slate-50 text-slate-400 hover:border-slate-200"
                                        }`}
                                    >
                                        {val === 'yes' ? 'OUI' : 'NON'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={evaluate}
                        disabled={!answers.fly || !answers.swim || !answers.mammal}
                        className="w-full mt-4 bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                    >
                        IDENTIFIER L'ANIMAL
                    </button>
                </section>

                {/* Résultat et Code */}
                <div className="space-y-6">
                    {result && (
                        <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-[2.5rem] text-center animate-question">
                            <p className="text-emerald-600 text-xs font-black uppercase mb-2">Résultat de l'analyse</p>
                            <div className="text-3xl font-black text-emerald-900">{result}</div>
                        </div>
                    )}

                    {showExplanation && (
                        <div className="bg-slate-900 rounded-[2.5rem] p-6 text-indigo-300 font-mono text-xs leading-relaxed shadow-2xl border-4 border-slate-800">
                            <div className="flex gap-2 mb-4 border-b border-slate-800 pb-3">
                                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            </div>
                            <p className="text-slate-500 italic mb-2">// Logique de classification</p>
                            <p><span className="text-pink-400">if</span> (fly === <span className="text-amber-200">'yes'</span>) {'{'}</p>
                            <p className="pl-4 text-emerald-400">return "Oiseau";</p>
                            <p>{'}'} <span className="text-pink-400">else if</span> (swim === <span className="text-amber-200">'yes'</span>) {'{'}</p>
                            <p className="pl-4 text-emerald-400">return "Poisson";</p>
                            <p>{'}'} <span className="text-pink-400">else</span> {'{'}</p>
                            <p className="pl-4 text-emerald-400">return "Mammifère";</p>
                            <p>{'}'}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Conclusion Pédagogique */}
            <footer className="bg-slate-50 border border-slate-100 p-6 rounded-3xl">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    <span className="text-lg mr-2">🔍</span>
                    En informatique, ce jeu s'appelle un <strong>Arbre de Décision</strong>. Chaque question divise les possibilités par deux. C'est la base de nombreux systèmes d'Intelligence Artificielle !
                </p>
            </footer>
        </div>
    );
}