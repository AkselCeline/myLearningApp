import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function JavaJvm() {
    const [processStep, setProcessStep] = useState(0);
    const [terminalInput, setTerminalInput] = useState("");
    const [terminalOutput, setTerminalOutput] = useState([
        "Bienvenue sur le terminal Java.",
        "Tape 'help' pour voir les commandes."
    ]);
    const [hasCompiled, setHasCompiled] = useState(false);

    const steps = [
        { title: "Code Source (.java)", desc: "Le code que tu écris (lisible par l'humain).", icon: "📄" },
        { title: "Compilateur (javac)", desc: "Il transforme ton code en Bytecode.", icon: "⚙️" },
        { title: "Bytecode (.class)", desc: "Un langage universel intermédiaire.", icon: "📦" },
        { title: "JVM", desc: "La machine virtuelle qui exécute le code sur ton PC.", icon: "💻" }
    ];

    const handleTerminalCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.trim().toLowerCase();
            let newLines = [...terminalOutput, `> ${terminalInput}`];

            switch (cmd) {
                case 'help':
                    newLines.push(
                        "📜 Commandes disponibles :",
                        "  ls             : Lister les fichiers",
                        "  cat main.java  : Voir le code source",
                        "  javac main.java: Compiler le code",
                        "  java main      : Lancer le programme",
                        "  java -version  : Voir la version de Java",
                        "  clear          : Nettoyer l'écran"
                    );
                    break;
                case 'ls':
                    newLines.push(hasCompiled ? "main.java  Main.class" : "main.java");
                    break;
                case 'cat main.java':
                    newLines.push(
                        "public class Main {",
                        "  public static void main(String[] args) {",
                        "    System.out.println(\"Bonjour Java !\");",
                        "  }",
                        "}"
                    );
                    break;
                case 'java -version':
                    newLines.push("openjdk version \"21.0.1\" (Build 21.0.1+12)");
                    break;
                case 'javac main.java':
                    newLines.push("⚙️ Compilation : main.java -> Main.class", "✅ Succès !");
                    setHasCompiled(true);
                    setProcessStep(2);
                    break;
                case 'java main':
                    if (hasCompiled) {
                        newLines.push("☕ Lancement de la JVM...", "🚀 Résultat : Bonjour Java !");
                        setProcessStep(3);
                    } else {
                        newLines.push("❌ Erreur : Main.class introuvable. Tape 'javac main.java' d'abord.");
                    }
                    break;
                case 'java main.class':
                    newLines.push("⚠️ Erreur : N'ajoute pas '.class'.", "👉 Utilise : java main");
                    break;
                case 'clear':
                    newLines = ["Console nettoyée. Tape 'help' pour de l'aide."];
                    break;
                default:
                    newLines.push(`sh: command not found: ${cmd} (Tape 'help' pour l'aide)`);
            }

            setTerminalOutput(newLines);
            setTerminalInput("");
        }
    };

    return (
        <LessonLayout theme="Java" title="Le Secret de Java : La JVM" lessonId="java_02">
            <div className="space-y-12 py-4">
                {/* 1. INTRODUCTION */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-600 to-blue-800 text-white shadow-xl">
                    <h2 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">Write Once, Run Anywhere 🌍</h2>
                    <p className="text-cyan-100 text-lg leading-relaxed font-medium">
                        Grâce à la <strong>JVM (Java Virtual Machine)</strong>, ton code peut tourner sur n'importe quel ordinateur. Elle agit comme un traducteur universel.
                    </p>
                </section>

                {/* 2. SIMULATEUR VISUEL */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] text-center shadow-sm">
                    <h3 className="text-xl font-black mb-10 dark:text-white uppercase tracking-widest italic">Le voyage du code</h3>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative mb-10">
                        {steps.map((s, i) => (
                            <React.Fragment key={i}>
                                <motion.div
                                    animate={{
                                        scale: processStep === i ? 1.1 : 1,
                                        opacity: processStep >= i ? 1 : 0.3
                                    }}
                                    className={`flex-1 p-6 rounded-3xl border-2 transition-all duration-500 ${processStep === i ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg' : 'border-slate-100 dark:border-slate-800'}`}
                                >
                                    <div className="text-3xl mb-2">{s.icon}</div>
                                    <h4 className="font-black text-[10px] uppercase mb-1 dark:text-white">{s.title}</h4>
                                    <p className="text-[10px] text-slate-500 leading-tight">{s.desc}</p>
                                </motion.div>
                                {i < steps.length - 1 && (
                                    <div className="text-slate-300 text-2xl hidden md:block">→</div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            const next = (processStep + 1) % 4;
                            setProcessStep(next);
                            if (next === 0) setHasCompiled(false);
                        }}
                        className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all active:scale-95 mb-12 shadow-blue-500/20 shadow-lg"
                    >
                        {processStep === 3 ? "RÉINITIALISER LE COURS" : "ÉTAPE SUIVANTE"}
                    </button>

                    <hr className="border-slate-100 dark:border-slate-800 mb-10 w-1/2 mx-auto" />

                    {/* TERMINAL INTERACTIF */}
                    <div className="text-left max-w-2xl mx-auto">
                        <p className="text-xs font-black text-slate-400 uppercase mb-4 text-center tracking-widest">Essaie les commandes réelles ⌨️</p>
                        <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-t-[30px] border-slate-800 relative font-mono">
                            {/* Boutons de fenêtre */}
                            <div className="absolute top-[-22px] left-4 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500" />
                                <div className="w-3 h-3 rounded-full bg-amber-500" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            </div>

                            <div className="h-48 overflow-y-auto p-5 text-[13px] text-blue-400 space-y-1 scrollbar-hide">
                                {terminalOutput.map((line, i) => (
                                    <div key={i} className={line.startsWith('>') ? "text-white font-bold" : ""}>
                                        {line}
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-slate-900/50 flex items-center gap-2 border-t border-slate-800">
                                <span className="text-emerald-500 font-bold">$</span>
                                <input
                                    type="text"
                                    value={terminalInput}
                                    onChange={(e) => setTerminalInput(e.target.value)}
                                    onKeyDown={handleTerminalCommand}
                                    placeholder="Tape 'help'..."
                                    className="bg-transparent border-none outline-none text-white w-full text-sm focus:ring-0"
                                    autoFocus
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. RÉSUMÉ TECHNIQUE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-cyan-50 dark:bg-slate-800/50 rounded-3xl border-l-4 border-cyan-500">
                        <h4 className="text-xl font-black dark:text-white mb-2 uppercase text-sm tracking-widest">Le JDK</h4>
                        <p className="text-slate-500 text-sm italic">
                            Le kit de développement qui contient <strong>javac</strong> pour transformer ton code en programme.
                        </p>
                    </div>
                    <div className="p-6 bg-blue-50 dark:bg-slate-800/50 rounded-3xl border-l-4 border-blue-500">
                        <h4 className="text-xl font-black dark:text-white mb-2 uppercase text-sm tracking-widest">Le JRE / JVM</h4>
                        <p className="text-slate-500 text-sm italic">
                            L'environnement qui utilise la <strong>JVM</strong> pour exécuter tes fichiers .class.
                        </p>
                    </div>
                </div>
            </div>
        </LessonLayout>
    );
}