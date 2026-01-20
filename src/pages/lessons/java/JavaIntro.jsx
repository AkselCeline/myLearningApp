import React from 'react';
import LessonLayout from '../../LessonLayout';

export default function JavaIntro() {
    return (
        <LessonLayout theme="Java" title="Pourquoi apprendre Java ?" lessonId="java_01">
            <div className="space-y-12 py-4">
                {/* 1. L'ANALOGIE DU TRADUCTEUR UNIVERSEL */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
                    <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter text-blue-100">L'Architecture Java 🏗️</h2>
                    <p className="text-blue-50 text-lg leading-relaxed font-medium">
                        Imagine que tu écrives un livre. Au lieu de le traduire toi-même en 50 langues, tu l'écris dans une langue spéciale (le <strong>Bytecode</strong>) qu'une machine magique (la <strong>JVM</strong>) peut lire sur n'importe quel ordinateur.
                    </p>
                </section>

                {/* 2. LES POINTS FORTS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border-b-4 border-blue-500 shadow-sm text-center">
                        <div className="text-3xl mb-3">🛡️</div>
                        <h4 className="font-black dark:text-white mb-2 uppercase text-xs">Sécurité</h4>
                        <p className="text-xs text-slate-500">Java est conçu pour éviter les erreurs de mémoire qui font planter les PC.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border-b-4 border-cyan-500 shadow-sm text-center">
                        <div className="text-3xl mb-3">📱</div>
                        <h4 className="font-black dark:text-white mb-2 uppercase text-xs">Partout</h4>
                        <p className="text-xs text-slate-500">Des téléphones Android aux serveurs de la NASA, Java est omniprésent.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border-b-4 border-indigo-500 shadow-sm text-center">
                        <div className="text-3xl mb-3">📦</div>
                        <h4 className="font-black dark:text-white mb-2 uppercase text-xs">Objet</h4>
                        <p className="text-xs text-slate-500">Tout est découpé en "Objets" réutilisables, comme des briques de LEGO.</p>
                    </div>
                </div>

                {/* 3. VISUEL DU CODE */}
                <section className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800">
                    <h3 className="text-blue-400 font-mono text-sm mb-6">// Voici à quoi ressemble un programme Java :</h3>
                    <div className="font-mono text-sm leading-relaxed space-y-1">
                        <p><span className="text-pink-500">public class</span> <span className="text-yellow-400">Main</span> {"{"}</p>
                        <p className="ml-6"><span className="text-pink-500">public static void</span> <span className="text-blue-400">main</span>(String[] args) {"{"}</p>
                        <p className="ml-12 text-emerald-400">System.out.println(<span className="text-orange-400">"Bonjour Java !"</span>);</p>
                        <p className="ml-6">{"}"}</p>
                        <p>{"}"}</p>
                    </div>
                </section>
            </div>
        </LessonLayout>
    );
}