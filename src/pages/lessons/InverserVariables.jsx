import React, { useState } from 'react';

export default function InverserVariables() {
    const [a, setA] = useState(5);
    const [b, setB] = useState(10);
    const [isAnimating, setIsAnimating] = useState(false);
    const [message, setMessage] = useState('');

    function echanger() {
        setIsAnimating(true);
        // On simule un petit délai pour l'effet visuel
        setTimeout(() => {
            let temp = a;
            setA(b);
            setB(temp);
            setMessage('Échange réussi !');
            setIsAnimating(false);
        }, 300);
    }

    function reset() {
        setA(5);
        setB(10);
        setMessage('');
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header Conceptuel */}
            <div className="bg-sky-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-sky-200 text-xs font-black uppercase tracking-[0.2em] mb-4">Logique de Permutation</h3>
                    <p className="text-xl font-medium leading-relaxed">
                        Comment échanger deux valeurs sans en perdre une ? <br/>
                        Il nous faut un <span className="text-sky-900 font-black italic underline decoration-white underline-offset-4">espace temporaire</span>.
                    </p>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-10 text-[10rem] font-black italic">A ⇄ B</div>
            </div>



            {/* Visualisation des Variables */}
            <section className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm">
                <div className="flex justify-around items-end gap-4 mb-10">
                    {/* Variable A */}
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Variable A</span>
                        <div className={`w-24 h-24 rounded-3xl border-4 border-sky-500 flex items-center justify-center text-4xl font-black text-sky-600 bg-sky-50 transition-all duration-500 ${isAnimating ? 'scale-75 opacity-50' : 'scale-100'}`}>
                            {a}
                        </div>
                    </div>

                    {/* L'intermédiaire (Visualisé par l'icône) */}
                    <div className="flex flex-col items-center pb-6">
                        <div className={`text-3xl transition-all duration-500 ${isAnimating ? 'rotate-180 scale-125' : 'rotate-0'}`}>
                            🔄
                        </div>
                    </div>

                    {/* Variable B */}
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Variable B</span>
                        <div className={`w-24 h-24 rounded-3xl border-4 border-emerald-500 flex items-center justify-center text-4xl font-black text-emerald-600 bg-emerald-50 transition-all duration-500 ${isAnimating ? 'scale-75 opacity-50' : 'scale-100'}`}>
                            {b}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={echanger}
                        disabled={isAnimating}
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                        Lancer l'échange
                    </button>
                    <button
                        onClick={reset}
                        className="bg-slate-100 text-slate-500 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
                    >
                        Réinitialiser
                    </button>
                </div>

                {message && (
                    <p className="mt-6 text-center font-black text-emerald-600 animate-bounce">
                        {message}
                    </p>
                )}
            </section>

            {/* Explication Technique */}
            <section className="bg-slate-900 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-sky-400 font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    Le mécanisme "Temp"
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                        <p>
                            Imagine deux verres : un de <span className="text-sky-400 font-bold">sirop (A)</span> et un d'<span className="text-emerald-400 font-bold">eau (B)</span>.
                        </p>
                        <p>
                            Pour mettre l'eau dans le verre du sirop sans tout mélanger, tu as besoin d'un <span className="text-white font-bold underline">troisième verre vide</span> (la variable <code className="text-pink-400">temp</code>).
                        </p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl font-mono text-xs sm:text-sm">
                        <div className="text-pink-400 font-bold mb-2">// 1. On sauvegarde A</div>
                        <div className="text-white mb-4"><span className="text-slate-500">let</span> temp = a;</div>

                        <div className="text-pink-400 font-bold mb-2">// 2. B peut aller dans A</div>
                        <div className="text-white mb-4">a = b;</div>

                        <div className="text-pink-400 font-bold mb-2">// 3. Temp va dans B</div>
                        <div className="text-white">b = temp;</div>
                    </div>
                </div>
            </section>
        </div>
    );
}