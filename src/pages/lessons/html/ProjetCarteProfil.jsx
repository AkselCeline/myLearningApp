import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjetCarteProfil() {
    const [html, setHtml] = useState(
        `<div class="card">
  <div class="avatar">👨‍💻</div>
  <h1>Ton Nom</h1>
  <p>Apprenti Développeur</p>
  <button>Contacter</button>
</div>`
    );

    const [css, setCss] = useState(
        `.card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
}

h1 {
  color: #6366f1;
  margin-top: 15px;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
}`
    );

    return (
        <LessonLayout
            theme="PROJET"
            title="🎯 Projet : Créer ta Carte de Profil"
            lessonId="html_css_final"
        >
            <div className="space-y-8 py-4">
                <section className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
                    <h2 className="text-2xl font-black mb-2 uppercase italic">Ton premier vrai composant</h2>
                    <p className="text-slate-400">Combine le HTML et le CSS pour styliser ta carte. Essaie de changer la couleur du bouton ou d'ajouter une bordure à la carte !</p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* ÉDITEUR HTML */}
                    <div className="flex flex-col h-[400px] bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-800">
                        <div className="bg-orange-500 text-white px-4 py-2 text-xs font-black uppercase tracking-widest">HTML</div>
                        <textarea
                            value={html} onChange={(e) => setHtml(e.target.value)}
                            className="flex-1 p-4 bg-slate-950 text-orange-200 font-mono text-sm outline-none resize-none"
                        />
                    </div>

                    {/* ÉDITEUR CSS */}
                    <div className="flex flex-col h-[400px] bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-800">
                        <div className="bg-blue-500 text-white px-4 py-2 text-xs font-black uppercase tracking-widest">CSS</div>
                        <textarea
                            value={css} onChange={(e) => setCss(e.target.value)}
                            className="flex-1 p-4 bg-slate-950 text-blue-200 font-mono text-sm outline-none resize-none"
                        />
                    </div>

                    {/* RENDU RÉEL */}
                    <div className="flex flex-col h-[400px] bg-slate-200 dark:bg-slate-950 rounded-3xl overflow-hidden border-2 border-slate-300 dark:border-slate-800 shadow-inner">
                        <div className="bg-slate-300 dark:bg-slate-800 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 text-center">Aperçu</div>
                        <div className="flex-1 flex items-center justify-center p-4">
                            {/* Injection sécurisée du style et du HTML */}
                            <style>{css}</style>
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </div>
                    </div>
                </div>

                {/* GUIDE DE PERSONNALISATION */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-black mb-4 dark:text-white uppercase tracking-tighter">💡 Idées de modification :</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-500 font-medium">
                        <li className="flex items-center gap-2">✅ Dans le CSS, ajoute <code>box-shadow: 0 10px 30px rgba(0,0,0,0.1);</code> à la classe <b>.card</b></li>
                        <li className="flex items-center gap-2">✅ Change le <code>background</code> du bouton en <b>#e11d48</b> (rouge)</li>
                        <li className="flex items-center gap-2">✅ Ajoute une balise <code>&lt;span&gt;Disponible&lt;/span&gt;</code> dans le HTML</li>
                        <li className="flex items-center gap-2">✅ Modifie le <code>border-radius</code> pour une carte plus carrée ou plus ronde</li>
                    </ul>
                </section>
            </div>
        </LessonLayout>
    );
}