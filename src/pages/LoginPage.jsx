import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useUser();

    // États pour le formulaire
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Fonction de connexion réelle
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulation d'une vérification (à remplacer par ton API plus tard)
        setTimeout(() => {
            if (email === "test@test.com" && password === "123456") {
                login({
                    username: "Félix Dev",
                    email: email,
                    points: 450,
                    level: "Apprenti"
                });
                navigate("/dashboard");
            } else {
                setError("Email ou mot de passe incorrect (Indice: test@test.com / 123456)");
                setIsLoading(false);
            }
        }, 1000);
    };

    // Fonction pour remplir le test rapidement
    const fillTestCredentials = () => {
        setEmail("test@test.com");
        setPassword("123456");
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-500">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 w-full max-w-md animate-question">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-500/10 rounded-2xl mb-4 text-3xl">
                        🔑
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Bon retour !</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Heureux de vous revoir parmi nous.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl text-rose-600 dark:text-rose-400 text-xs font-bold text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="test@test.com"
                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 dark:text-white transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Mot de passe</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 dark:text-white transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-slate-900 dark:bg-teal-500 text-white font-black py-4 rounded-2xl hover:bg-slate-800 dark:hover:bg-teal-600 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>

                {/* Bouton de Test Rapide */}
                <button
                    onClick={fillTestCredentials}
                    className="w-full mt-4 py-2 text-[10px] font-black text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors uppercase tracking-[0.2em]"
                >
                    Utiliser le compte de test
                </button>

                <div className="mt-8 text-center border-t border-slate-50 dark:border-slate-800 pt-6">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Pas encore de compte ?{" "}
                        <Link to="/signup" className="text-teal-600 dark:text-teal-400 font-bold hover:underline underline-offset-4">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}