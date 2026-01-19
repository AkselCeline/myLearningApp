import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        /* Correction : Ajout de dark:bg-slate-950 et changement du dégradé pour le mode sombre */
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 transition-colors duration-500 flex items-center justify-center p-6">

            {/* Container Principal adaptatif */}
            <div className="max-w-6xl w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-white dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center p-10 md:p-16 gap-12 transition-all">

                <div className="flex flex-col flex-1 space-y-8 text-center md:text-left">
                    {/* Badge */}
                    <span className="self-center md:self-start px-4 py-1.5 bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-widest rounded-full">
                        🚀 Plateforme Interactive
                    </span>

                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1]">
                        Apprends en <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                            t'amusant.
                        </span>
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                        Explore les fondamentaux du dev : <span className="font-semibold text-teal-600">Algorithme, Java, Réseau</span> et plus, à travers une expérience ludique.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* BOUTON DÉMARRER : Oriente vers les modules (Dashboard) */}
                        <button
                            className="bg-teal-500 hover:bg-teal-600 text-white font-black py-4 px-10 rounded-2xl shadow-[0_10px_20px_rgba(20,184,166,0.3)] transition-all hover:-translate-y-1 active:scale-95"
                            onClick={() => navigate('/dashboard')}
                        >
                            Démarrer maintenant
                        </button>

                        <button
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold py-4 px-10 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                            onClick={() => navigate('/dashboard')}
                        >
                            Voir les cours
                        </button>
                    </div>
                </div>

                <div className="flex-1 relative">
                    {/* Décoration derrière l'image (s'adapte au mode dark) */}
                    <div className="absolute -inset-4 bg-teal-200/30 dark:bg-teal-500/10 rounded-full blur-3xl" />
                    <img
                        src="/images/learning-illustration.png"
                        alt="Illustration"
                        className="relative z-10 w-full transform hover:rotate-2 transition-transform duration-500 drop-shadow-2xl"
                        onError={(e) => { e.target.src = "https://illustrations.popsy.co/teal/learning.svg" }} // Image de secours si ton lien local échoue
                    />
                </div>
            </div>
        </div>
    );
}