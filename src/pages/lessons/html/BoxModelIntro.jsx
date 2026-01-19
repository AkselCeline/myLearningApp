import React, { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import { motion } from 'framer-motion';

export default function BoxModelIntro() {
    const [padding, setPadding] = useState(20);
    const [margin, setMargin] = useState(20);
    const [border, setBorder] = useState(2);

    return (
        <LessonLayout
            theme="HTML/CSS"
            title="Le Box Model : Tout est une boîte"
            lessonId="css_10"
        >
            <div className="space-y-12 py-4">
                {/* 1. ANALOGIE DE LA BOÎTE */}
                <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
                    <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">La Boîte de Pizza 🍕</h2>
                    <p className="text-emerald-50 text-lg leading-relaxed font-medium">
                        En CSS, chaque élément est une boîte.
                        Le <strong>Padding</strong> est l'air à l'intérieur, la <strong>Border</strong> est le carton, et la <strong>Margin</strong> est l'espace entre ta boîte et celle des autres.
                    </p>
                </section>

                {/* 2. SIMULATEUR INTERACTIF */}
                <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Contrôles */}
                        <div className="space-y-8 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl">
                            <div>
                                <label className="block text-xs font-black text-orange-500 uppercase mb-2">Margin (Espace extérieur) : {margin}px</label>
                                <input type="range" min="0" max="60" value={margin} onChange={(e) => setMargin(e.target.value)} className="w-full accent-orange-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-blue-500 uppercase mb-2">Padding (Espace intérieur) : {padding}px</label>
                                <input type="range" min="0" max="60" value={padding} onChange={(e) => setPadding(e.target.value)} className="w-full accent-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Border (Épaisseur du carton) : {border}px</label>
                                <input type="range" min="0" max="20" value={border} onChange={(e) => setBorder(e.target.value)} className="w-full accent-slate-500" />
                            </div>
                        </div>

                        {/* Rendu Visuel */}
                        <div className="relative bg-slate-200 dark:bg-slate-950 rounded-2xl p-10 flex items-center justify-center min-h-[300px]">
                            {/* Visualisation de la Marge (Orange) */}
                            <div style={{ padding: `${margin}px` }} className="bg-orange-400/20 border-2 border-dashed border-orange-400 rounded-lg">
                                {/* La Boîte réelle */}
                                <div
                                    style={{
                                        padding: `${padding}px`,
                                        borderWidth: `${border}px`,
                                    }}
                                    className="bg-white dark:bg-slate-800 border-slate-800 dark:border-slate-400 shadow-2xl transition-all duration-300"
                                >
                                    <div className="bg-blue-500/20 border border-blue-500 p-4 text-center font-black text-blue-600 text-xs">
                                        CONTENU (PIZZA)
                                    </div>
                                </div>
                            </div>

                            {/* Étiquettes flottantes */}
                            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-orange-600 uppercase tracking-widest">Margin</span>
                        </div>
                    </div>
                </section>



                {/* 3. RÉSUMÉ TECHNIQUE */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-orange-50 dark:bg-orange-950/30 rounded-3xl border-2 border-orange-200">
                        <h4 className="font-black text-orange-600 mb-2">Margin</h4>
                        <p className="text-sm">Crée de l'espace <strong>autour</strong> de l'élément (repousse les voisins).</p>
                    </div>
                    <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl border-2 border-slate-300">
                        <h4 className="font-black text-slate-600">Border</h4>
                        <p className="text-sm">La ligne qui entoure le padding et le contenu.</p>
                    </div>
                    <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-3xl border-2 border-blue-200">
                        <h4 className="font-black text-blue-600 mb-2">Padding</h4>
                        <p className="text-sm">Crée de l'espace <strong>à l'intérieur</strong> (éloigne le texte du bord).</p>
                    </div>
                </section>

                {/* 4. LE QUIZ FINAL DU MODULE */}
                <footer className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                    <h3 className="text-xl font-black mb-4">🧪 Test de Logique</h3>
                    <p className="mb-6 opacity-80 text-lg">Si je veux que mon texte ne touche pas les bords de son cadre, je dois augmenter le...</p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => alert("Non, la margin éloigne les autres boîtes, pas le contenu interne.")} className="px-8 py-3 bg-slate-800 border-2 border-slate-700 rounded-xl hover:border-orange-500 transition-all font-mono">margin</button>
                        <button onClick={() => alert("Bravo ! Le padding est l'espace de respiration interne.")} className="px-8 py-3 bg-slate-800 border-2 border-slate-700 rounded-xl hover:border-emerald-500 transition-all font-mono">padding</button>
                    </div>
                </footer>
            </div>
        </LessonLayout>
    );
}