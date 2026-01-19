import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function HtmlIntro() {
    // Le code par défaut que l'élève verra au début
    const [htmlCode, setHtmlCode] = useState(
        `<h1>Mon premier site</h1>\n<p>C'est génial de coder !</p>\n<button>Clique ici</button>`
    );

    return (
        <LessonLayout
            theme="HTML"
            title="HTML : L'Éditeur Interactif"
            lessonId="html_8"
        >
            <div className="space-y-10 py-4">
                {/* 1. INTRODUCTION */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-xl">
                    <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Deviens Architecte Web 🏗️</h2>
                    <p className="text-orange-50 text-lg leading-relaxed font-medium">
                        Modifie le code dans la fenêtre de gauche et regarde ton site se construire tout seul à droite.
                        C'est ainsi que les vrais développeurs travaillent !
                    </p>
                </section>

                {/* 2. L'ÉDITEUR INTERACTIF (Live Playground) */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">

                    {/* CÔTÉ GAUCHE : ÉDITEUR DE CODE */}
                    <div className="flex flex-col bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-800">
                        <div className="bg-slate-800 px-6 py-3 flex items-center justify-between">
                            <span className="text-slate-400 font-black text-xs uppercase tracking-widest">index.html</span>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                        </div>
                        <textarea
                            value={htmlCode}
                            onChange={(e) => setHtmlCode(e.target.value)}
                            spellCheck="false"
                            className="flex-1 w-full p-6 bg-slate-900 text-orange-300 font-mono text-lg resize-none outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                            placeholder="Tape ton code HTML ici..."
                        />
                    </div>

                    {/* CÔTÉ DROIT : RÉSULTAT VISUEL */}
                    <div className="flex flex-col bg-white dark:bg-slate-950 rounded-[2rem] overflow-hidden shadow-xl border-4 border-slate-100 dark:border-slate-800">
                        <div className="bg-slate-100 dark:bg-slate-800 px-6 py-3">
                            <span className="text-slate-500 font-black text-xs uppercase tracking-widest">Aperçu du Navigateur</span>
                        </div>
                        <div className="flex-1 p-8 overflow-auto">
                            {/* Le secret : dangerouslySetInnerHTML permet d'injecter du texte en tant que vrai HTML */}
                            <div
                                className="prose prose-slate dark:prose-invert max-w-none
                                           [&_h1]:text-3xl [&_h1]:font-black [&_h1]:mb-4
                                           [&_p]:text-slate-600 [&_p]:dark:text-slate-400 [&_p]:mb-4
                                           [&_button]:bg-orange-500 [&_button]:text-white [&_button]:px-6 [&_button]:py-2 [&_button]:rounded-xl [&_button]:font-bold"
                                dangerouslySetInnerHTML={{ __html: htmlCode }}
                            />
                        </div>
                    </div>
                </section>

                {/* 3. GUIDE DES BALISES À TESTER */}
                <section className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-black mb-6 dark:text-white uppercase">📋 Choses à essayer :</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => setHtmlCode(`<h1>Titre 1</h1>\n<h2>Titre 2</h2>\n<h3>Titre 3</h3>`)}
                            className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 text-left transition-all"
                        >
                            <span className="block text-orange-500 font-black mb-1">Les Titres</span>
                            <code className="text-xs">h1, h2, h3</code>
                        </button>
                        <button
                            onClick={() => setHtmlCode(`<p>Ceci est <b>gras</b> et cela est <i>italique</i>.</p>`)}
                            className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 text-left transition-all"
                        >
                            <span className="block text-orange-500 font-black mb-1">Le Style de Texte</span>
                            <code className="text-xs">b, i, p</code>
                        </button>
                        <button
                            onClick={() => setHtmlCode(`<ul>\n  <li>Élément 1</li>\n  <li>Élément 2</li>\n</ul>`)}
                            className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 text-left transition-all"
                        >
                            <span className="block text-orange-500 font-black mb-1">Les Listes</span>
                            <code className="text-xs">ul, li</code>
                        </button>
                    </div>
                </section>



                {/* 4. RAPPEL PÉDAGOGIQUE */}
                <footer className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                    <h3 className="text-xl font-black mb-2 italic">⚠️ Attention aux balises !</h3>
                    <p className="text-slate-400">
                        N'oublie jamais de fermer tes balises avec un <code>/</code> (par exemple <code>&lt;/h1&gt;</code>). Si tu ne le fais pas, le navigateur risque de ne plus savoir où s'arrête ton élément !
                    </p>
                </footer>
            </div>
        </LessonLayout>
    );
}