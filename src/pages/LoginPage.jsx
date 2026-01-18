import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-50 via-slate-50 to-white px-4">
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white w-full max-w-md">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-4 text-3xl">
                        🔑
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Bon retour !</h2>
                    <p className="text-slate-500 mt-2">Heureux de vous revoir parmi nous.</p>
                </div>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="nom@exemple.com"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] mt-2"
                    >
                        Se connecter
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        Pas encore de compte ?{" "}
                        <Link to="/signup" className="text-teal-600 font-bold hover:underline underline-offset-4">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}