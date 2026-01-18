import React, { useState } from 'react';

const words = ['Abricot', 'Banane', 'Cerise', 'Orange', 'Pomme'];
const shuffledWords = [...words].sort(() => Math.random() - 0.5);

export default function AlphabetOrderLesson() {
    const [userAnswer, setUserAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);
    const [orderedWords, setOrderedWords] = useState(shuffledWords);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [orderCheckResult, setOrderCheckResult] = useState(null);
    const [tutorialStep, setTutorialStep] = useState(0);

    const tutorialTexts = [
        "Le tri alphabétique compare les mots selon la première lettre.",
        "Par exemple, 'Abricot' commence par A, 'Banane' par B, donc 'Abricot' vient avant.",
        "On range les mots comme dans un dictionnaire, de A à Z.",
        "Essaie maintenant de trier toi-même les mots en les glissant dans le bon ordre."
    ];

    function handleQuizSubmit(e) {
        e.preventDefault();
        if (userAnswer.trim().toLowerCase() === 'abricot') {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    const handleDragStart = (index) => setDraggedIndex(index);
    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (dropIndex) => {
        if (draggedIndex === null) return;
        const newOrder = [...orderedWords];
        const draggedItem = newOrder.splice(draggedIndex, 1)[0];
        newOrder.splice(dropIndex, 0, draggedItem);
        setOrderedWords(newOrder);
        setDraggedIndex(null);
    };

    const checkOrder = () => {
        const correct = orderedWords.every((word, i, arr) =>
            i === 0 || word.toLowerCase() >= arr[i - 1].toLowerCase()
        );
        setOrderCheckResult(correct);
    };

    return (
        <div className="space-y-10 py-4 animate-question">
            {/* Header d'introduction */}
            <section className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 italic underline decoration-teal-500 underline-offset-8">
                    Trier par ordre alphabétique
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                    En algorithme, trier des données est essentiel. On compare la <strong>première lettre</strong>,
                    puis la deuxième si besoin, exactement comme dans un dictionnaire.
                </p>
            </section>

            {/* Pseudo-code stylisé */}
            <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-20">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                </div>
                <h3 className="text-teal-400 text-xs font-black uppercase tracking-widest mb-4">Logique de l'algorithme</h3>
                <pre className="font-mono text-sm leading-6">
                    <div className="flex gap-4"><span className="text-slate-500">1</span><span className="text-pink-400">Pour chaque</span> <span className="text-slate-300">mot dans la liste :</span></div>
                    <div className="flex gap-4"><span className="text-slate-500">2</span><span className="text-sky-400">  Si</span> <span className="text-slate-300">lettre1 {'>'} lettre2 :</span></div>
                    <div className="flex gap-4"><span className="text-slate-500">3</span><span className="text-teal-400">    Échanger</span> <span className="text-slate-300">les positions</span></div>
                    <div className="flex gap-4"><span className="text-slate-500">4</span><span className="text-pink-400">Répéter</span> <span className="text-slate-300">jusqu'au tri complet</span></div>
                </pre>
            </div>

            {/* Tutoriel Interactif */}
            <section className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm relative">
                <div className="absolute -top-4 left-8 bg-teal-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                    Guide Interactif
                </div>
                <p className="text-slate-700 font-bold text-lg mb-6 min-h-[3rem]">
                    {tutorialTexts[tutorialStep]}
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={() => setTutorialStep(prev => Math.max(0, prev - 1))}
                        disabled={tutorialStep === 0}
                        className="flex-1 py-3 bg-slate-100 text-slate-500 font-black rounded-xl disabled:opacity-30 transition-all hover:bg-slate-200"
                    >
                        Précédent
                    </button>
                    <button
                        onClick={() => setTutorialStep(prev => Math.min(tutorialTexts.length - 1, prev + 1))}
                        disabled={tutorialStep === tutorialTexts.length - 1}
                        className="flex-1 py-3 bg-teal-500 text-white font-black rounded-xl disabled:opacity-30 transition-all hover:bg-teal-600 shadow-lg shadow-teal-100"
                    >
                        {tutorialStep === tutorialTexts.length - 1 ? "Compris !" : "Suivant"}
                    </button>
                </div>
            </section>

            {/* Quiz Rapide */}
            <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-800 mb-2 text-center">Quiz Éclair ⚡</h3>
                <p className="text-slate-500 text-sm text-center mb-6 italic">Quel mot vient en premier parmi : <strong>{words.join(', ')}</strong> ?</p>
                <form onSubmit={handleQuizSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={e => setUserAnswer(e.target.value)}
                        placeholder="Ta réponse..."
                        className="flex-1 p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-teal-500 outline-none font-bold text-slate-700 transition-all"
                    />
                    <button type="submit" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all">
                        Vérifier
                    </button>
                </form>
                {quizResult !== null && (
                    <div className={`mt-4 p-4 rounded-xl font-bold text-center animate-question ${quizResult ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                        {quizResult ? "🌟 Correct ! L'Abricot gagne." : "❌ Pas tout à fait, regarde l'alphabet !"}
                    </div>
                )}
            </section>

            {/* Mini-jeu Drag & Drop */}
            <section className="space-y-6">
                <div className="text-center">
                    <h3 className="text-2xl font-black text-slate-800">Mini-jeu : Le Grand Tri</h3>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Glisse les mots pour les ordonner</p>
                </div>

                <ul className="space-y-3">
                    {orderedWords.map((word, index) => (
                        <li
                            key={word}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(index)}
                            className="group flex items-center p-5 bg-white border-2 border-slate-100 rounded-2xl cursor-grab active:cursor-grabbing hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/5 transition-all animate-question"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mr-4 group-hover:bg-teal-50 group-hover:border-teal-200 transition-colors font-black text-slate-400 group-hover:text-teal-500">
                                {index + 1}
                            </div>
                            <span className="font-black text-slate-700 text-lg">{word}</span>
                        </li>
                    ))}
                </ul>

                <div className="pt-6">
                    <button
                        onClick={checkOrder}
                        className="w-full bg-teal-500 text-white py-5 rounded-[1.5rem] font-black text-xl shadow-xl shadow-teal-200 hover:bg-teal-600 hover:-translate-y-1 transition-all active:scale-95"
                    >
                        Vérifier l'ordre final
                    </button>
                    {orderCheckResult !== null && (
                        <div className={`mt-6 p-6 rounded-[2rem] text-center font-black text-lg animate-question ${orderCheckResult ? "bg-emerald-500 text-white shadow-2xl shadow-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-100"}`}>
                            {orderCheckResult ? "🏆 Perfection ! L'ordre est impeccable." : "🧐 Un intrus s'est glissé, réessaie !"}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}