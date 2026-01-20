import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function JavaVariables() {
    const [message, setMessage] = useState("Glisse la donnée dans la bonne boîte !");
    const [score, setScore] = useState(0);
    const [placedItems, setPlacedItems] = useState([]);

    // États pour l'éditeur de code
    const [codeResult, setCodeResult] = useState({ value: "...", type: "none" });
    const [editorError, setEditorError] = useState("");

    const allItems = [
        { id: 1, val: "42", type: "int", color: "bg-blue-500" },
        { id: 2, val: '"Hello"', type: "String", color: "bg-amber-500" },
        { id: 3, val: "true", type: "boolean", color: "bg-emerald-500" }
    ];

    const handleDragEnd = (event, info, item) => {
        const dropTarget = document.elementFromPoint(info.point.x, info.point.y);
        const container = dropTarget?.closest('.drop-zone');
        const targetType = container?.getAttribute('data-type');

        if (container && targetType === item.type) {
            setMessage(`✅ Parfait ! ${item.val} est bien un ${item.type}.`);
            setScore(prev => prev + 1);
            setPlacedItems(prev => [...prev, item.id]);
        } else if (container) {
            setMessage("❌ Oups ! Mauvaise boîte pour cette donnée.");
        }
    };

    const handleCodeChange = (val) => {
        const input = val.trim();

        if (!input.endsWith(";")) {
            setEditorError("N'oublie pas le point-virgule ';' !");
            setCodeResult({ value: "...", type: "none" });
            return;
        }

        // Regex pour détecter : Type Nom = Valeur;
        const regex = /^(int|String|boolean)\s+(\w+)\s*=\s*(.+);$/;
        const match = input.match(regex);

        if (match) {
            const [_, type, name, value] = match;

            // Validation spécifique par type
            if (type === "int") {
                if (!isNaN(value) && !value.includes('"')) {
                    setCodeResult({ value: value, type: "int" });
                    setEditorError("");
                } else {
                    setEditorError("Un 'int' doit être un nombre entier.");
                }
            }
            else if (type === "String") {
                if (value.startsWith('"') && value.endsWith('"')) {
                    setCodeResult({ value: value.replace(/"/g, ""), type: "String" });
                    setEditorError("");
                } else {
                    setEditorError("Un 'String' doit être entre guillemets \" \".");
                }
            }
            else if (type === "boolean") {
                if (value === "true" || value === "false") {
                    setCodeResult({ value: value, type: "boolean" });
                    setEditorError("");
                } else {
                    setEditorError("Un 'boolean' doit être true ou false.");
                }
            }
        } else {
            setEditorError("Syntaxe : Type nom = valeur;");
            setCodeResult({ value: "...", type: "none" });
        }
    };

    const remainingItems = allItems.filter(item => !placedItems.includes(item.id));

    return (
        <LessonLayout theme="Java" title="Variables : La Rigueur Java" lessonId="java_03">
            <div className="space-y-12 py-4">

                {/* 1. EXPLICATION THÉORIQUE */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-700 to-cyan-600 text-white shadow-xl">
                    <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Le Typage Statique 🔒</h2>
                    <p className="text-blue-50 text-lg leading-relaxed font-medium">
                        En Java, déclarer une variable c'est comme choisir la taille d'une boîte. Une fois choisie, tu ne peux pas changer son contenu pour un autre type.
                    </p>
                </section>

                {/* 2. JEU DE DRAG AND DROP */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] text-center shadow-sm">
                    <div className="mb-10">
                        <span className="text-xs font-black text-blue-500 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                            Progression : {score} / {allItems.length}
                        </span>
                        <p className="text-slate-600 dark:text-slate-400 font-bold mt-6 text-lg h-8">{message}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {['int', 'String', 'boolean'].map((type) => (
                            <div
                                key={type}
                                data-type={type}
                                className={`drop-zone p-8 rounded-3xl border-4 border-dashed transition-all flex flex-col items-center justify-center min-h-[140px]
                                    ${placedItems.some(id => allItems.find(a => a.id === id).type === type)
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-inner'
                                    : 'border-slate-200 dark:border-slate-700'}`}
                            >
                                <h4 className={`font-black text-2xl mb-2 ${type === 'int' ? 'text-blue-500' : type === 'String' ? 'text-amber-500' : 'text-emerald-500'}`}>
                                    {type}
                                </h4>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {placedItems.map(id => {
                                        const item = allItems.find(a => a.id === id);
                                        return item.type === type ? (
                                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={id} className="text-xs font-mono font-bold bg-white dark:bg-slate-800 px-3 py-1 rounded shadow-sm border border-slate-100 dark:border-slate-700">
                                                {item.val}
                                            </motion.span>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-8 h-24 items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
                        <AnimatePresence>
                            {remainingItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layoutId={item.id}
                                    drag
                                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                    dragElastic={0.6}
                                    onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                                    exit={{ scale: 0, opacity: 0 }}
                                    whileDrag={{ scale: 1.1, zIndex: 50 }}
                                    className={`cursor-grab active:cursor-grabbing px-6 py-3 ${item.color} text-white rounded-xl font-mono font-black shadow-md`}
                                >
                                    {item.val}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {remainingItems.length === 0 && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-500 font-black">
                                🌟 Excellent ! Passons au code réel.
                            </motion.p>
                        )}
                    </div>
                </section>

                {/* 3. ÉDITEUR MULTI-TYPES */}
                <section className="bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800">
                    <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm italic">Poly-Editeur Java</h3>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-8 border-r border-slate-800">
                            <div className="font-mono text-sm space-y-4">
                                <p className="text-slate-500 text-xs">// Exemples à tester :</p>
                                <ul className="text-[10px] text-slate-600 space-y-1">
                                    <li>• int age = 25;</li>
                                    <li>• String pseudo = "Neo";</li>
                                    <li>• boolean isDev = true;</li>
                                </ul>
                                <input
                                    type="text"
                                    onChange={(e) => handleCodeChange(e.target.value)}
                                    placeholder="Ecris ton code ici..."
                                    className="bg-slate-900 border-2 border-slate-800 rounded-xl p-4 text-white outline-none focus:border-blue-500 transition-all w-full"
                                />
                                {editorError && (
                                    <p className="text-rose-400 text-[11px] font-bold mt-2">⚠️ {editorError}</p>
                                )}
                            </div>
                        </div>

                        <div className="p-8 bg-black/20 flex flex-col justify-center items-center text-center">
                            <span className="text-slate-600 font-black text-[10px] uppercase tracking-widest mb-6 italic">Visualisation RAM</span>
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        scale: codeResult.value !== "..." ? [1, 1.1, 1] : 1,
                                        borderColor: codeResult.type === "int" ? "#3b82f6" : codeResult.type === "String" ? "#f59e0b" : codeResult.type === "boolean" ? "#10b981" : "#1e293b"
                                    }}
                                    className="w-32 h-32 rounded-[2.5rem] border-4 flex flex-col items-center justify-center shadow-2xl transition-colors bg-slate-900"
                                >
                                    <span className="text-[10px] text-slate-500 font-black mb-1 uppercase tracking-tighter">Valeur stockée</span>
                                    <span className={`text-xl font-black truncate max-w-[100px] ${codeResult.type === "int" ? "text-blue-500" : codeResult.type === "String" ? "text-amber-500" : "text-emerald-500"}`}>
                                        {codeResult.value}
                                    </span>
                                </motion.div>

                                <AnimatePresence>
                                    {codeResult.type !== "none" && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 10, opacity: 0 }}
                                            className="absolute -bottom-3 bg-white text-slate-900 text-[10px] px-3 py-1 rounded-full font-black uppercase shadow-xl"
                                        >
                                            Type: {codeResult.type}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 text-white font-mono text-sm">
                    <p className="text-slate-400 leading-relaxed italic text-center text-xs">
                        "En Java, le compilateur est ton meilleur ami. S'il te donne une erreur, c'est pour t'éviter un bug plus grave plus tard."
                    </p>
                </section>
            </div>
        </LessonLayout>
    );
}