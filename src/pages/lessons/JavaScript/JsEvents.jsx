import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion } from 'framer-motion';

export default function JsEvents() {
    const [status, setStatus] = useState("En attente...");
    const [bg, setBg] = useState("bg-slate-100 dark:bg-slate-800");

    return (
        <LessonLayout theme="JavaScript" title="Les Événements : Réagir à l'utilisateur" lessonId="js_12">
            <div className="space-y-10 py-4">
                <section className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-xl border-b-8 border-yellow-400">
                    <h2 className="text-3xl font-black mb-4">L'écouteur (Event Listener) 👂</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        En JavaScript, on place des <strong>"écouteurs"</strong> sur les éléments. C'est comme dire : "Hé le bouton, si quelqu'un te clique dessus, préviens-moi pour que je lance cette fonction !"
                    </p>
                </section>

                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] text-center">
                    <h3 className="text-xl font-black mb-8 dark:text-white uppercase">🕹️ Terrain d'Expérimentation</h3>

                    <div className={`mb-8 p-12 rounded-[2rem] border-4 border-dashed border-slate-300 transition-all duration-500 ${bg}`}>
                        <span className="text-2xl font-black text-slate-600 dark:text-slate-300 uppercase tracking-tighter">
                            État : {status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* CLICK EVENT */}
                        <button
                            onClick={() => { setStatus("Cliqué ! ✅"); setBg("bg-emerald-100 border-emerald-500"); }}
                            className="p-6 bg-yellow-400 text-slate-900 font-black rounded-2xl shadow-lg hover:scale-105 transition-all"
                        >
                            onClick
                        </button>

                        {/* DOUBLE CLICK */}
                        <button
                            onDoubleClick={() => { setStatus("Double Clic ! 🚀"); setBg("bg-indigo-100 border-indigo-500"); }}
                            className="p-6 bg-indigo-500 text-white font-black rounded-2xl shadow-lg hover:scale-105 transition-all"
                        >
                            onDoubleClick
                        </button>

                        {/* MOUSE ENTER */}
                        <button
                            onMouseEnter={() => { setStatus("Survolé ! 👀"); setBg("bg-pink-100 border-pink-500"); }}
                            onMouseLeave={() => setStatus("Sortie... 👋")}
                            className="p-6 bg-pink-500 text-white font-black rounded-2xl shadow-lg hover:scale-105 transition-all"
                        >
                            onMouseEnter
                        </button>
                    </div>
                </section>



                <section className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl font-mono text-sm border-2 border-slate-200 dark:border-slate-700">
                    <h4 className="text-yellow-600 dark:text-yellow-400 font-black mb-4 uppercase text-xs tracking-widest">// Comment on écrit ça en vrai JS :</h4>
                    <p className="text-indigo-500">const <span className="text-slate-800 dark:text-white">monBouton</span> = document.querySelector(<span className="text-emerald-500">'button'</span>);</p>
                    <p className="mt-2 text-slate-800 dark:text-white">monBouton.addEventListener(<span className="text-emerald-500">'click'</span>, () ={">"} {"{"}</p>
                    <p className="ml-6 text-slate-500 italic">// Faire quelque chose ici...</p>
                    <p className="text-slate-800 dark:text-white">{"});"}</p>
                </section>
            </div>
        </LessonLayout>
    );
}