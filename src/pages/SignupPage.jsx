import React from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-50 via-slate-50 to-white px-4">
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white w-full max-w-md">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500 rounded-2xl mb-4 text-3xl shadow-lg shadow-teal-200">
                        🚀
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Rejoindre l'aventure</h2>
                    <p className="text-slate-500 mt-2">Commencez à apprendre dès aujourd'hui.</p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">Nom complet</label>
                        <input
                            type="text"
                            placeholder="Jean Dupont"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="jean@exemple.fr"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="Minimum 8 caractères"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white font-bold py-4 rounded-2xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-200 active:scale-[0.98] mt-4"
                    >
                        S'inscrire gratuitement
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-slate-400 px-4">
                    En vous inscrivant, vous acceptez nos <span className="underline cursor-pointer">Conditions d'utilisation</span>.
                </div>

                <div className="mt-6 text-center border-t border-slate-100 pt-6">
                    <p className="text-sm text-slate-500">
                        Déjà inscrit ?{" "}
                        <Link to="/login" className="text-teal-600 font-bold hover:underline">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}