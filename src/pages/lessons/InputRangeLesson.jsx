import React, { useState } from 'react';

const numbers = [0, 5, 11, 3, 10, -1, 7, 12, 1, 15];

export default function InputRangeLesson() {
    const [input, setInput] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [message, setMessage] = useState('');
    const [valid, setValid] = useState(null);

    const [validBox, setValidBox] = useState([]);
    const [invalidBox, setInvalidBox] = useState([]);
    const [dragged, setDragged] = useState(null);

    const checkInput = () => {
        const value = parseInt(input);
        if (isNaN(value)) {
            setMessage("🚫 Ce n’est pas un nombre.");
            setValid(false);
        } else if (value >= 1 && value <= 10) {
            setMessage("✅ Parfait ! Ce nombre est bien dans l'intervalle [1, 10].");
            setValid(true);
        } else {
            setMessage("⚠️ Hors limite ! Le nombre doit être entre 1 et 10.");
            setValid(false);
        }
    };

    const handleDragStart = (num) => setDragged(num);

    const handleDrop = (boxType) => {
        if (dragged === null) return;
        if (boxType === 'valid') {
            setValidBox([...validBox, dragged]);
        } else {
            setInvalidBox([...invalidBox, dragged]);
        }
        setDragged(null);
    };

    const isValid = (n) => n >= 1 && n <= 10;

    const handleCheck = () => {
        const allValidCorrect = validBox.every(isValid);
        const allInvalidCorrect = invalidBox.every(n => !isValid(n));
        const allSorted = validBox.length + invalidBox.length === numbers.length;

        if (!allSorted) {
            setResultMessage('❗️ Il reste des nombres à classer dans la liste.');
            return;
        }

        if (allValidCorrect && allInvalidCorrect) {
            setResultMessage('🎉 Superbe ! Ton algorithme de filtrage fonctionne parfaitement.');
        } else {
            setResultMessage('❌ Attention, certains nombres ont glissé dans la mauvaise boîte !');
        }
    };

    const getRemaining = () =>
        numbers.filter(n => !validBox.includes(n) && !invalidBox.includes(n));

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header Conceptuel */}
            <section className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-emerald-200 text-xs font-black uppercase tracking-[0.2em] mb-4">Le Contrôle de Saisie</h3>
                    <p className="text-xl font-medium leading-relaxed">
                        Un bon programme est un programme qui <span className="text-emerald-900 font-black italic underline decoration-white underline-offset-4">vérifie</span> ses entrées.
                    </p>
                    <p className="mt-4 text-emerald-50 text-sm">
                        C'est comme un videur à l'entrée d'un club : si tu n'as pas le bon ticket (entre 1 et 10), tu n'entres pas !
                    </p>
                </div>
                <div className="absolute -right-8 -bottom-10 opacity-10 text-[12rem] font-black italic">1..10</div>
            </section>



            {/* Testeur Interactif */}
            <section className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 shadow-sm">
                <div className="flex flex-col gap-6">
                    <div>
                        <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Poste de contrôle</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="number"
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    setMessage('');
                                }}
                                className="flex-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold text-slate-700 transition-all text-center text-xl"
                                placeholder="Tape ici..."
                            />
                            <button
                                onClick={checkInput}
                                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                            >
                                Valider
                            </button>
                        </div>
                    </div>
                    {message && (
                        <div className={`p-4 rounded-xl font-bold text-center animate-question border-2 ${valid ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </section>

            {/* Pseudo-code Style Terminal */}
            <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl font-mono text-sm border-4 border-slate-800">
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
                <pre className="text-emerald-400 leading-relaxed">
                    <span className="text-pink-400">RÉPÉTER</span><br/>
                    {"  "}LIRE nombre<br/>
                    <span className="text-pink-400">JUSQU'À CE QUE</span> (nombre {'>'}= <span className="text-amber-300">1</span> <span className="text-pink-400">ET</span> nombre {'<'}= <span className="text-amber-300">10</span>)<br/>
                    <span className="text-sky-400">AFFICHER</span> <span className="text-amber-200">"Saisie correcte !"</span>
                </pre>
            </div>

            {/* Jeu de Tri : L'Usine à Nombres */}
            <section className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-slate-800">🎮 Défi : L'Usine à Nombres</h2>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Glisse les jetons dans la bonne zone</p>
                </div>

                {/* Jetons restants */}
                <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-slate-200 min-h-[100px] flex flex-wrap justify-center gap-3 mb-8">
                    {getRemaining().map((num) => (
                        <div
                            key={num}
                            draggable
                            onDragStart={() => handleDragStart(num)}
                            className="w-12 h-12 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-700 shadow-sm cursor-grab active:cursor-grabbing hover:border-emerald-300 hover:text-emerald-600 transition-all"
                        >
                            {num}
                        </div>
                    ))}
                    {getRemaining().length === 0 && <span className="text-slate-300 font-bold italic text-sm self-center">Tous les jetons sont triés !</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Zone Valide */}
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop('valid')}
                        className="p-6 bg-emerald-50 border-4 border-dashed border-emerald-200 rounded-[2rem] flex flex-col items-center min-h-[180px] transition-colors hover:bg-emerald-100"
                    >
                        <h3 className="font-black text-emerald-700 text-xs uppercase tracking-widest mb-4">✅ Admis (1 à 10)</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {validBox.map((num) => (
                                <span key={num} className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md animate-question">
                                    {num}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Zone Invalide */}
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop('invalid')}
                        className="p-6 bg-rose-50 border-4 border-dashed border-rose-200 rounded-[2rem] flex flex-col items-center min-h-[180px] transition-colors hover:bg-rose-100"
                    >
                        <h3 className="font-black text-rose-700 text-xs uppercase tracking-widest mb-4">❌ Rejeté</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {invalidBox.map((num) => (
                                <span key={num} className="w-10 h-10 bg-rose-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md animate-question">
                                    {num}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        onClick={handleCheck}
                        className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
                    >
                        Vérifier l'Usine
                    </button>

                    {resultMessage && (
                        <div className={`w-full p-4 rounded-2xl text-center font-black animate-question ${resultMessage.includes('Bravo') ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-200' : 'bg-rose-100 text-rose-700 border border-rose-200'}`}>
                            {resultMessage}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}