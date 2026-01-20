import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function JavaConditions() {
    const [age, setAge] = useState(15);
    const [doorOpen, setDoorOpen] = useState(false);
    const [log, setLog] = useState("En attente du test...");

    // États pour l'exercice final
    const [userCode, setUserCode] = useState("");
    const [exerciseSuccess, setExerciseSuccess] = useState(false);
    const [feedback, setFeedback] = useState("Complète le code pour vérifier si le client a 21 ans ou plus.");

    const testCondition = (currentAge) => {
        if (currentAge >= 18) {
            setDoorOpen(true);
            setLog("✅ age >= 18 est TRUE : Accès autorisé !");
        } else {
            setDoorOpen(false);
            setLog("❌ age >= 18 est FALSE : Accès refusé !");
        }
    };

    const validateExercise = (input) => {
        setUserCode(input);
        // On vérifie si l'utilisateur a utilisé >= 21 et la structure if/else
        if (input.includes("if") && input.includes("age >= 21") && input.includes("else") && input.includes(";")) {
            setExerciseSuccess(true);
            setFeedback("🏆 Bravo ! Tu as maîtrisé la logique des conditions Java.");
        } else {
            setExerciseSuccess(false);
            setFeedback("Indice : Utilise 'if (age >= 21) { ... } else { ... }'");
        }
    };

    return (
        <LessonLayout theme="Java" title="Les Conditions (If/Else)" lessonId="java_05">
            <div className="space-y-12 py-4">
                {/* 1. CONCEPT */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl">
                    <h2 className="text-3xl font-black mb-4 uppercase italic">Prendre des décisions 🚦</h2>
                    <p className="text-indigo-100 text-lg leading-relaxed font-medium">
                        Le bloc <code>if</code> permet d'exécuter du code **uniquement si** une condition est vraie. C'est le cerveau de ton programme.
                    </p>
                </section>

                {/* 2. SIMULATEUR INTERACTIF */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] shadow-sm">
                    <h3 className="text-center font-black uppercase tracking-widest mb-10 dark:text-white italic text-sm">Simulateur : Le Videur Java</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="bg-slate-900 p-6 rounded-3xl font-mono text-sm border-l-8 border-purple-500 shadow-2xl">
                                <p className="text-purple-400 font-bold italic">// Code exécuté en temps réel :</p>
                                <p className="text-purple-400 mt-2">int <span className="text-white">age = {age};</span></p>
                                <p className="text-pink-500 mt-4">if <span className="text-white">(age {'>'}= 18) {"{"}</span></p>
                                <p className="text-emerald-400 ml-4">System.out.println("Entrez !");</p>
                                <p className="text-pink-500">{"}"} else {"{"}</p>
                                <p className="text-rose-400 ml-4">System.out.println("Refusé !");</p>
                                <p className="text-pink-500">{"}"}</p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Modifier l'âge : {age} ans</label>
                                <input
                                    type="range" min="10" max="30" value={age}
                                    onChange={(e) => {
                                        setAge(parseInt(e.target.value));
                                        testCondition(parseInt(e.target.value));
                                    }}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600 mt-4"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] min-h-[300px] border-2 border-dashed border-slate-100 dark:border-slate-800">
                            <motion.div
                                animate={{ rotateY: doorOpen ? -110 : 0, originX: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="w-32 h-48 bg-amber-800 border-4 border-amber-900 rounded-lg shadow-2xl relative"
                            >
                                <div className="absolute right-4 top-1/2 w-4 h-4 bg-yellow-500 rounded-full shadow-inner" />
                            </motion.div>
                            <motion.p
                                key={log}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-8 font-black uppercase text-center text-xs tracking-tighter ${doorOpen ? 'text-emerald-500' : 'text-rose-500'}`}
                            >
                                {log}
                            </motion.p>
                        </div>
                    </div>
                </section>



                {/* 3. EXERCICE DE CODE FINAUX */}
                <section className="bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800">
                    <div className="p-8 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
                        <div>
                            <h3 className="text-white font-black uppercase tracking-widest text-sm italic">Challenge : La Loi Américaine 🇺🇸</h3>
                            <p className="text-slate-500 text-[11px] mt-1 font-medium">{feedback}</p>
                        </div>
                        {exerciseSuccess && <span className="bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full font-black animate-bounce">RÉUSSI !</span>}
                    </div>

                    <div className="p-8">
                        <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm relative">
                            <div className="text-slate-500 mb-4">// Écris ton code ici :</div>
                            <textarea
                                value={userCode}
                                onChange={(e) => validateExercise(e.target.value)}
                                placeholder={`if (age >= 21) {\n  System.out.println("OK");\n} else {\n  System.out.println("NON");\n}`}
                                className="bg-transparent border-none outline-none text-emerald-400 w-full h-32 resize-none focus:ring-0"
                            />
                        </div>

                        <div className="mt-6 flex gap-4">
                            <div className="flex-1 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                                <h4 className="text-[10px] text-slate-500 uppercase font-black mb-2">Opérateurs à utiliser</h4>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-slate-800 text-purple-400 rounded text-xs font-bold">{'>'}=</span>
                                    <span className="px-2 py-1 bg-slate-800 text-purple-400 rounded text-xs font-bold">{'<'}=</span>
                                    <span className="px-2 py-1 bg-slate-800 text-purple-400 rounded text-xs font-bold">{"{"} {"}"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. TABLEAU DES OPÉRATEURS */}
                <section className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-white">
                    <h3 className="text-purple-400 font-mono text-sm mb-6 uppercase tracking-widest">// Récapitulatif</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px]">
                        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700"><span className="text-pink-500">==</span> égal</div>
                        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700"><span className="text-pink-500">!=</span> différent</div>
                        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700"><span className="text-pink-500">{'>'}=</span> sup ou égal</div>
                        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700"><span className="text-pink-500">{'<'}=</span> inf ou égal</div>
                    </div>
                </section>
            </div>
        </LessonLayout>
    );
}