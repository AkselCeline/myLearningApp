import React, { useState, useEffect, useRef } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function GitTerminalGame() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { type: 'info', text: 'Bienvenue dans le GitTerminal v1.0' },
        { type: 'info', text: 'Mission : Sauvegarde ton fichier index.html et envoie-le sur GitHub.' },
        { type: 'command', text: 'Tape "help" pour voir les commandes disponibles.' }
    ]);
    const [step, setStep] = useState(0); // 0: Start, 1: Added, 2: Committed, 3: Pushed
    const scrollRef = useRef(null);

    // Scroll automatique vers le bas de la console
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'user', text: `> ${input}` }];

            if (cmd === 'help') {
                newHistory.push({ type: 'info', text: 'Commandes : git add, git commit -m "msg", git push, clear' });
            } else if (cmd === 'clear') {
                setHistory([]);
                setInput("");
                return;
            } else if (cmd === 'git add index.html' || cmd === 'git add .') {
                if (step === 0) {
                    setStep(1);
                    newHistory.push({ type: 'success', text: '✅ Fichiers ajoutés à l\'index (Staging Area).' });
                } else {
                    newHistory.push({ type: 'error', text: 'Fichiers déjà ajoutés.' });
                }
            } else if (cmd.startsWith('git commit -m')) {
                if (step === 1) {
                    setStep(2);
                    newHistory.push({ type: 'success', text: '✅ Commit créé avec succès sur ta branche main.' });
                } else if (step === 0) {
                    newHistory.push({ type: 'error', text: '⚠️ Erreur : Tu dois d\'abord faire "git add" !' });
                } else {
                    newHistory.push({ type: 'error', text: 'Déjà committé.' });
                }
            } else if (cmd === 'git push') {
                if (step === 2) {
                    setStep(3);
                    newHistory.push({ type: 'success', text: '🚀 TRANSMISSION... 100% OK ! Ton code est sur GitHub.' });
                } else {
                    newHistory.push({ type: 'error', text: '⚠️ Erreur : Tu dois faire "add" puis "commit" avant de "push".' });
                }
            } else {
                newHistory.push({ type: 'error', text: `Commande inconnue : ${cmd}` });
            }

            setHistory(newHistory);
            setInput("");
        }
    };

    return (
        <LessonLayout theme="Git" title="Défi : Terminal Git" lessonId="git_challenge">
            <div className="max-w-3xl mx-auto py-6">

                {/* ÉTAT DE LA MISSION */}
                <div className="flex justify-between mb-4 px-2">
                    {['ADD', 'COMMIT', 'PUSH'].map((label, i) => (
                        <div key={label} className={`flex items-center gap-2 font-black text-xs ${step > i ? 'text-emerald-500' : 'text-slate-400'}`}>
                            <div className={`w-4 h-4 rounded-full border-2 ${step > i ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`} />
                            {label}
                        </div>
                    ))}
                </div>

                {/* LA CONSOLE */}
                <div className="bg-slate-950 rounded-3xl shadow-2xl border-t-[30px] border-slate-800 relative overflow-hidden">
                    {/* Boutons de fenêtre factices */}
                    <div className="absolute top-[-22px] left-4 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>

                    <div
                        ref={scrollRef}
                        className="h-80 overflow-y-auto p-6 font-mono text-sm space-y-2 scrollbar-hide"
                    >
                        {history.map((line, i) => (
                            <div key={i} className={`
                                ${line.type === 'error' ? 'text-rose-400' : ''}
                                ${line.type === 'success' ? 'text-emerald-400' : ''}
                                ${line.type === 'info' ? 'text-blue-400' : ''}
                                ${line.type === 'user' ? 'text-white font-bold' : ''}
                                ${line.type === 'command' ? 'text-slate-500 italic' : ''}
                            `}>
                                {line.text}
                            </div>
                        ))}
                        {step === 3 && (
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="mt-4 p-4 bg-emerald-500/20 border border-emerald-500 rounded-xl text-emerald-400 text-center"
                            >
                                🎉 MISSION ACCOMPLIE ! Tu maîtrises le workflow Git.
                            </motion.div>
                        )}
                    </div>

                    {/* CHAMP DE SAISIE */}
                    <div className="p-4 bg-slate-900/50 flex items-center gap-3 border-t border-slate-800">
                        <span className="text-emerald-500 font-bold">➜</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            disabled={step === 3}
                            placeholder={step === 3 ? "Mission terminée" : "Tape une commande..."}
                            className="bg-transparent border-none outline-none text-white w-full font-mono focus:ring-0"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-2xl">
                        <h4 className="font-black text-blue-600 text-xs uppercase mb-1">Indice 1</h4>
                        <p className="text-xs text-slate-500">Commence par ajouter les fichiers avec <code>git add .</code></p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-slate-800 rounded-2xl">
                        <h4 className="font-black text-amber-600 text-xs uppercase mb-1">Indice 2</h4>
                        <p className="text-xs text-slate-500">N'oublie pas les guillemets pour le message du commit.</p>
                    </div>
                </div>
            </div>
        </LessonLayout>
    );
}