import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Signup() {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();

        // 1. Récupérer le score de démo s'il existe
        const savedDemoScore = parseInt(localStorage.getItem('temp_demo_score')) || 0;

        // 2. Créer l'objet utilisateur avec le bonus
        const newUser = {
            email,
            username: email.split('@')[0], // Nom par défaut
            points: savedDemoScore,        // On injecte les points ici !
            level: Math.floor(savedDemoScore / 100),
            isLoggedIn: true
        };

        // 3. Sauvegarder et nettoyer
        setUser(newUser);
        localStorage.setItem('algo_user', JSON.stringify(newUser));
        localStorage.removeItem('temp_demo_score'); // On nettoie après usage

        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
            <form onSubmit={handleSignup} className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md space-y-6 border border-slate-100 dark:border-slate-800">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Créer un compte</h2>

                {localStorage.getItem('temp_demo_score') && (
                    <div className="bg-amber-50 dark:bg-amber-500/10 p-4 rounded-2xl border border-amber-200 dark:border-amber-500/20">
                        <p className="text-amber-700 dark:text-amber-400 text-sm font-bold">
                            🎁 Félicitations ! Vos **{localStorage.getItem('temp_demo_score')} XP** seront ajoutés à votre compte.
                        </p>
                    </div>
                )}

                <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-teal-500/10 dark:text-white font-bold"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-teal-500/10 dark:text-white font-bold"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="w-full bg-teal-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Commencer l'aventure
                </button>
            </form>
        </div>
    );
}