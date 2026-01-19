import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function CssIntro() {
    const [color, setColor] = useState("#f97316");
    const [fontSize, setFontSize] = useState(32);
    const [isRounded, setIsRounded] = useState(false);
    const [quizStatus, setQuizStatus] = useState(null);

    return (
        <LessonLayout
            theme="HTML/CSS"
            title="CSS : L'Art du Style"
            lessonId="css_9"
        >
            <div className="space-y-12 py-4">
                {/* 1. INTRODUCTION AU CONCEPT */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl overflow-hidden relative">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Maquiller le HTML</h2>
                        <p className="text-blue-50 text-lg leading-relaxed font-medium">
                            Le CSS permet de dire au navigateur comment afficher les éléments.
                            On utilise une règle simple : <strong>Sélecteur</strong> {`{ propriété : valeur; }`}
                        </p>
                    </div>
                    <span className="absolute -right-4 -bottom-4 text-9xl opacity-20 rotate-12">🎨</span>
                </section>

                {/* 2. LE GÉNÉRATEUR CSS INTERACTIF */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
                    <h3 className="text-xl font-black mb-8 text-center dark:text-white uppercase tracking-widest">🧪 Laboratoire de Style</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Contrôles CSS */}
                        <div className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase mb-2">Couleur du texte (color)</label>
                                <input
                                    type="color" value={color} onChange={(e) => setColor(e.target.value)}
                                    className="w-full h-12 rounded-xl cursor-pointer bg-white dark:bg-slate-700 p-1"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase mb-2">Taille (font-size) : {fontSize}px</label>
                                <input
                                    type="range" min="16" max="60" value={fontSize} onChange={(e) => setFontSize(e.target.value)}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-slate-400 uppercase">Bords arrondis (border-radius)</span>
                                <button
                                    onClick={() => setIsRounded(!isRounded)}
                                    className={`w-14 h-8 rounded-full transition-colors relative ${isRounded ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                >
                                    <motion.div
                                        animate={{ x: isRounded ? 24 : 4 }}
                                        className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-sm"
                                    />
                                </button>
                            </div>

                            <div className="mt-6 p-4 bg-slate-900 rounded-xl font-mono text-sm text-blue-300">
                                <span className="text-pink-400">h1</span> {"{"} <br/>
                                &nbsp;&nbsp;<span className="text-cyan-400">color</span>: {color}; <br/>
                                &nbsp;&nbsp;<span className="text-cyan-400">font-size</span>: {fontSize}px; <br/>
                                &nbsp;&nbsp;<span className="text-cyan-400">border-radius</span>: {isRounded ? '20px' : '0px'}; <br/>
                                {"}"}
                            </div>
                        </div>

                        {/* Rendu visuel */}
                        <div className="flex items-center justify-center border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-4 min-h-[300px]">
                            <h1
                                style={{
                                    color: color,
                                    fontSize: `${fontSize}px`,
                                    borderRadius: isRounded ? '20px' : '0px',
                                    backgroundColor: isRounded ? `${color}22` : 'transparent',
                                    padding: '20px',
                                    transition: 'all 0.3s ease'
                                }}
                                className="font-black text-center"
                            >
                                TEXTE HTML
                            </h1>
                        </div>
                    </div>
                </section>



                {/* 3. LE QUIZ SANS CONSOLE */}
                <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                    <h3 className="text-2xl font-black mb-6">Le Défi du Sélecteur 🎯</h3>
                    <p className="text-slate-300 mb-6 font-bold italic">Comment changerait-on la couleur de TOUS les boutons d'une page ?</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onClick={() => setQuizStatus('wrong')} className={`p-4 rounded-xl border-2 font-mono transition-all ${quizStatus === 'wrong' ? 'border-rose-500 bg-rose-500/10' : 'bg-slate-800 border-slate-700'}`}>.bouton {"{ color: red; }"}</button>
                        <button onClick={() => setQuizStatus('correct')} className={`p-4 rounded-xl border-2 font-mono transition-all ${quizStatus === 'correct' ? 'border-emerald-500 bg-emerald-500/10' : 'bg-slate-800 border-slate-700'}`}>button {"{ color: red; }"}</button>
                        <button onClick={() => setQuizStatus('wrong2')} className={`p-4 rounded-xl border-2 font-mono transition-all ${quizStatus === 'wrong2' ? 'border-rose-500 bg-rose-500/10' : 'bg-slate-800 border-slate-700'}`}>#button {"{ color: red; }"}</button>
                    </div>

                    <AnimatePresence>
                        {quizStatus && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className={`mt-6 p-4 rounded-xl text-center font-black ${quizStatus === 'correct' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-rose-500/20 text-rose-400 border border-rose-500/50'}`}>
                                {quizStatus === 'correct' ? "✅ GAGNÉ ! On utilise le nom de la balise HTML (button) pour cibler tous les éléments de ce type." : "❌ Faux ! Rappelle-toi : pour cibler une balise directement, on écrit son nom sans point ni hashtag."}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </LessonLayout>
    );
}