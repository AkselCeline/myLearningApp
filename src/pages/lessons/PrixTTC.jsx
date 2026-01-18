import React, { useState } from 'react';

const tauxTVAOptions = [
    { label: '5.5% (Réduit)', value: 5.5 },
    { label: '10% (Intermédiaire)', value: 10 },
    { label: '20% (Normal)', value: 20 },
];

export default function AlgoPrixHTTTC() {
    const [prixHT, setPrixHT] = useState('');
    const [tauxTVA, setTauxTVA] = useState(20);
    const [prixTTC, setPrixTTC] = useState(null);
    const [erreur, setErreur] = useState('');
    const [algoLines, setAlgoLines] = useState(['']);
    const [algoMessage, setAlgoMessage] = useState(null);

    function calculerTTC() {
        setErreur('');
        const ht = parseFloat(prixHT.replace(',', '.'));
        if (isNaN(ht) || ht < 0) {
            setErreur('⚠️ Entrez un prix HT valide (ex: 42.50)');
            return;
        }
        const ttc = ht * (1 + tauxTVA / 100);
        setPrixTTC(ttc.toFixed(2));
    }

    function validerAlgo() {
        const lignes = algoLines.map(l => l.trim().toLowerCase());
        const motsCles = [['lire', 'ht'], ['tva'], ['*'], ['afficher', 'ttc']];

        let score = 0;
        motsCles.forEach(groupe => {
            if (lignes.some(ligne => groupe.every(mot => ligne.includes(mot)))) score++;
        });

        if (score >= 3) {
            setAlgoMessage({ text: '🚀 Bravo ! Ta logique est solide. Tu as respecté la structure séquentielle.', type: 'success' });
        } else {
            setAlgoMessage({ text: '🤔 Pas tout à fait. N\'oublie pas les 3 étapes : Lire, Calculer, Afficher.', type: 'error' });
        }
    }

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header : La Séquence Logique */}
            <header className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-indigo-200 text-xs font-black uppercase tracking-[0.2em] mb-4">Structure Séquentielle</h3>
                    <p className="text-xl font-medium leading-relaxed">
                        Un algorithme est une <span className="text-white font-black italic underline decoration-indigo-300 underline-offset-4">recette mathématique</span>.
                    </p>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-10 text-[10rem] font-black italic">TTC</div>
            </header>



            {/* Simulateur de Caisse */}
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-100 p-8 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Prix Hors Taxe (€)</label>
                        <input
                            type="text" value={prixHT}
                            onChange={e => setPrixHT(e.target.value)}
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold text-xl transition-all"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Taux TVA</label>
                        <select
                            value={tauxTVA}
                            onChange={e => setTauxTVA(parseFloat(e.target.value))}
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold text-lg appearance-none cursor-pointer"
                        >
                            {tauxTVAOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                </div>

                <button onClick={calculerTTC} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
                    Calculer le Résultat
                </button>

                {(prixTTC || erreur) && (
                    <div className={`mt-6 p-6 rounded-2xl text-center animate-question border-2 ${erreur ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-indigo-50 border-indigo-100'}`}>
                        {erreur ? erreur : (
                            <div>
                                <span className="block text-xs font-bold text-indigo-400 uppercase mb-1 tracking-widest">Total à payer</span>
                                <span className="text-3xl font-black text-indigo-900">{prixTTC} €</span>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Atelier de Code */}
            <section className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 text-xl">✍️</div>
                    <h3 className="text-white font-black text-lg">Écris ton Pseudo-Code</h3>
                </div>

                <div className="relative mb-6">
                    <textarea
                        rows={5}
                        value={algoLines.join('\n')}
                        onChange={e => setAlgoLines(e.target.value.split('\n'))}
                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 font-mono text-indigo-300 outline-none focus:border-indigo-500 transition-all"
                        placeholder="Ex: lire prixHT..."
                    />
                    <div className="absolute top-4 right-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Éditeur .algo</div>
                </div>

                <button onClick={validerAlgo} className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
                    Compiler l'Algorithme
                </button>

                {algoMessage && (
                    <div className={`mt-6 p-4 rounded-xl text-sm font-bold text-center animate-question ${algoMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {algoMessage.text}
                    </div>
                )}
            </section>

            {/* Note finale */}
            <footer className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4">
                <span className="text-2xl">🧩</span>
                <p className="text-indigo-900 text-xs font-medium leading-relaxed italic">
                    "Un algorithme n'est pas du code informatique, c'est la <strong>pensée</strong> qui précède le code. Si tu sais le décrire en français, tu sauras l'écrire en n'importe quel langage."
                </p>
            </footer>
        </div>
    );
}