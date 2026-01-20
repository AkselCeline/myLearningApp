import React from 'react';
import LessonLayout from '../../LessonLayout';

export default function GitIntro() {
    return (
        <LessonLayout theme="Git" title="Qu'est-ce que Git ?" lessonId="git_01">
            <div className="space-y-12 py-4">
                {/* 1. L'ANALOGIE DU JEU VIDÉO */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-xl">
                    <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Le "Point de Sauvegarde" 🎮</h2>
                    <p className="text-orange-50 text-lg leading-relaxed">
                        Imagine Git comme le système de sauvegarde dans un jeu vidéo. Avant d'affronter un "Boss" (une nouvelle fonctionnalité difficile), tu crées un point de sauvegarde. Si tu perds, tu peux revenir en arrière instantanément.
                    </p>
                </section>

                {/* 2. COMPARAISON VISUELLE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                    <div className="p-8 bg-rose-50 dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-900 rounded-3xl">
                        <span className="text-4xl mb-4 block">❌</span>
                        <h4 className="font-black text-rose-700 mb-2 italic text-sm uppercase">Sans Git</h4>
                        <p className="text-xs font-mono text-slate-500">
                            index.html<br/>
                            index_final.html<br/>
                            index_final_V2.html<br/>
                            index_VRAIMENT_final.html
                        </p>
                    </div>
                    <div className="p-8 bg-emerald-50 dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-900 rounded-3xl">
                        <span className="text-4xl mb-4 block">✅</span>
                        <h4 className="font-black text-emerald-700 mb-2 italic text-sm uppercase">Avec Git</h4>
                        <p className="text-xs font-mono text-slate-500">
                            index.html<br/>
                            └─ Sauvegarde 1 : "Ajout logo"<br/>
                            └─ Sauvegarde 2 : "Fix bouton"<br/>
                            └─ Sauvegarde 3 : "Fini !"
                        </p>
                    </div>
                </div>



                {/* 3. VOCABULAIRE CLÉ */}
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem]">
                    <h3 className="text-xl font-black mb-6 dark:text-white uppercase tracking-widest">Le Lexique de base</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-xl flex items-center justify-center font-black flex-shrink-0">1</div>
                            <div>
                                <h5 className="font-black dark:text-white">Le Repository (Le "Repo")</h5>
                                <p className="text-sm text-slate-500">C'est le dossier magique qui contient tout ton projet et son historique.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-rose-100 text-rose-600 w-12 h-12 rounded-xl flex items-center justify-center font-black flex-shrink-0">2</div>
                            <div>
                                <h5 className="font-black dark:text-white">Le Commit</h5>
                                <p className="text-sm text-slate-500">C'est l'action de valider une étape. On laisse toujours un petit message pour dire ce qu'on a fait.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </LessonLayout>
    );
}