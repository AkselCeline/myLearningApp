import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function GitCommit() {
    const [step, setStep] = useState(0); // 0: Modifié, 1: Staged, 2: Committed
    const [message, setMessage] = useState("");

    const stepsInfo = [
        { title: "1. Modification", desc: "Tu as changé ton fichier index.html", icon: "📝", color: "bg-amber-500" },
        { title: "2. Indexation (Add)", desc: "Tu prépares tes changements pour la photo", icon: "📦", color: "bg-blue-500" },
        { title: "3. Validation (Commit)", desc: "La photo est prise et archivée !", icon: "📸", color: "bg-emerald-500" }
    ];

    return (
        <LessonLayout theme="Git" title="Le Commit : Enregistrer une étape" lessonId="git_02">
            <div className="space-y-10 py-4">
                {/* EXPLICATION DU WORKFLOW */}
                <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <span className="text-orange-500">⚡</span> Le Workflow Git
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {stepsInfo.map((s, i) => (
                            <div key={i} className={`p-4 rounded-2xl border-2 transition-all ${step === i ? 'border-orange-500 bg-orange-500/10' : 'border-slate-800 opacity-50'}`}>
                                <span className="text-2xl mb-2 block">{s.icon}</span>
                                <h4 className="font-bold text-sm">{s.title}</h4>
                                <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SIMULATEUR INTERACTIF */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] text-center">
                    <h3 className="text-xl font-black mb-8 uppercase italic dark:text-white">Simulateur de Commit</h3>

                    <div className="flex flex-col items-center gap-8">
                        {/* L'élément qui change d'état */}
                        <motion.div
                            animate={{
                                scale: step === 2 ? [1, 1.1, 1] : 1,
                                rotate: step === 2 ? [0, 5, -5, 0] : 0
                            }}
                            className={`w-32 h-32 rounded-3xl flex items-center justify-center text-5xl shadow-xl ${stepsInfo[step].color} text-white`}
                        >
                            {stepsInfo[step].icon}
                        </motion.div>

                        <div className="space-y-4 w-full max-w-sm">
                            {step === 0 && (
                                <button onClick={() => setStep(1)} className="w-full bg-blue-500 text-white p-4 rounded-xl font-black shadow-lg hover:bg-blue-600 transition-all">
                                    git add index.html
                                </button>
                            )}

                            {step === 1 && (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Message du commit..."
                                        className="w-full p-4 rounded-xl border-2 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-orange-500 outline-none"
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button
                                        onClick={() => step === 1 && message.length > 2 && setStep(2)}
                                        className="w-full bg-emerald-500 text-white p-4 rounded-xl font-black shadow-lg disabled:opacity-50"
                                        disabled={message.length < 3}
                                    >
                                        git commit -m "{message || '...'}"
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="text-emerald-500 font-black animate-bounce">
                                    ✅ Étape sauvegardée avec succès !
                                    <button onClick={() => {setStep(0); setMessage("");}} className="block mx-auto mt-4 text-xs text-slate-400 underline">Recommencer</button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* LA COMMANDE À RETENIR */}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl dark:bg-slate-800/50">
                    <p className="text-orange-800 dark:text-orange-400 font-bold mb-2">💡 À retenir :</p>
                    <p className="text-sm text-orange-900/70 dark:text-slate-400 italic font-medium">
                        Un commit doit toujours être accompagné d'un message <strong>court et explicatif</strong>. Évite les messages comme "test" ou "update", préfère "Ajout du bouton de contact".
                    </p>
                </div>
            </div>
        </LessonLayout>
    );
}