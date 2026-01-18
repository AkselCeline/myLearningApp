import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function SignupPage() {
    const navigate = useNavigate();
    const { login } = useUser();

    // États du formulaire
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulation d'inscription (API Call)
        setTimeout(() => {
            // On connecte l'utilisateur immédiatement après l'inscription
            login({
                username: formData.username,
                email: formData.email,
                points: 0, // Nouveau joueur
                level: "Débutant"
            });
            setIsLoading(false);
            navigate("/dashboard"); // Redirection vers le labo
        }, 1500);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-500">
            <div className="bg-white/80 dark:bg-slate-900 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-white/20 dark:border-slate-800 w-full max-w-md animate-question">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500 rounded-2xl mb-4 text-3xl shadow-lg shadow-teal-500/20">
                        🚀
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Rejoindre l'aventure</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Commencez à apprendre dès aujourd'hui.</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Nom complet</label>
                        <input
                            type="text"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Jean Dupont"
                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 dark:text-white transition-all shadow-inner"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jean@exemple.fr"
                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 dark:text-white transition-all shadow-inner"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength="6"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 6 caractères"
                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 dark:text-white transition-all shadow-inner"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-teal-500 text-white font-black py-4 rounded-2xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 active:scale-[0.98] mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Création...
                            </>
                        ) : "S'inscrire gratuitement"}
                    </button>
                </form>

                <div className="mt-8 text-center text-[10px] text-slate-400 dark:text-slate-500 px-4 uppercase tracking-widest font-bold">
                    En vous inscrivant, vous acceptez nos <br/>
                    <span className="text-teal-500 cursor-pointer hover:underline">Conditions d'utilisation</span>.
                </div>

                <div className="mt-6 text-center border-t border-slate-100 dark:border-slate-800 pt-6">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        Déjà inscrit ?{" "}
                        <Link to="/login" className="text-teal-600 dark:text-teal-400 font-black hover:underline underline-offset-4">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}