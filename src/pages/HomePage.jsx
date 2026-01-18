import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        // Fond avec un dégradé plus subtil (Radial)
        <div className="min-h-[calc(100-64px)] bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-teal-50 via-white to-slate-50 flex items-center justify-center p-6">

            <div className="max-w-6xl w-full bg-white/70 backdrop-blur-lg border border-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center p-10 md:p-16 gap-12">

                <div className="flex flex-col flex-1 space-y-8 text-center md:text-left">
                    {/* Badge */}
                    <span className="self-center md:self-start px-4 py-1.5 bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest rounded-full">
                        🚀 Plateforme Interactive
                    </span>

                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-100 leading-[1.1]">
                        Apprends en <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                            t'amusant.
                        </span>
                    </h1>

                    <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                        Explore les fondamentaux du dev : <span className="font-semibold text-slate-700 text-teal-600">Git, Java, Réseau</span> et plus, à travers une expérience ludique.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-10 rounded-2xl shadow-[0_10px_20px_rgba(20,184,166,0.3)] transition-all hover:-translate-y-1 active:scale-95"
                            onClick={() => navigate('/dashboard')}
                        >
                            Démarrer maintenant
                        </button>
                        <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 font-bold py-4 px-10 rounded-2xl hover:bg-slate-50 transition-all">
                            Voir les cours
                        </button>
                    </div>
                </div>

                <div className="flex-1 relative">
                    {/* Décoration derrière l'image */}
                    <div className="absolute -inset-4 bg-teal-200/30 rounded-full blur-3xl" />
                    <img
                        src="/images/learning-illustration.png"
                        alt="Illustration"
                        className="relative z-10 w-full transform hover:rotate-2 transition-transform duration-500"
                    />
                </div>
            </div>
        </div>
    );
}
