import React, { useState } from "react";

export default function Profile() {
    // Simulation de données utilisateur (à remplacer plus tard par une API ou Firebase)
    const [user, setUser] = useState({
        username: "AlgoLearner",
        email: "contact@exemple.com",
        bio: "Passionné par l'algorithmique et le développement React.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        level: "Intermédiaire",
        points: 1250
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
        // Ici, tu ajouterais l'appel API pour sauvegarder
        console.log("Données sauvegardées :", user);
    };

    return (
        <div className="min-h-screen pt-10 px-6">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">

                {/* Header du Profil (Bannière) */}
                <div className="h-32 bg-gradient-to-r from-teal-400 to-indigo-500"></div>

                <div className="px-8 pb-8">
                    {/* Avatar et Infos de base */}
                    <div className="relative -mt-12 flex items-end justify-between mb-8">
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt="Avatar"
                                className="w-32 h-32 rounded-3xl border-4 border-white dark:border-slate-900 bg-slate-100 shadow-lg"
                            />
                            <button className="absolute bottom-2 right-2 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-md text-xs hover:scale-110 transition-transform">
                                📸
                            </button>
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`${isEditing ? 'bg-emerald-500' : 'bg-slate-900 dark:bg-teal-500'} text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95`}
                        >
                            {isEditing ? "Enregistrer" : "Modifier le profil"}
                        </button>
                    </div>

                    {/* Formulaire / Infos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nom d'utilisateur</span>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={user.username}
                                    onChange={(e) => setUser({...user, username: e.target.value})}
                                    className="mt-1 w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-semibold dark:text-white disabled:opacity-60 transition-all"
                                />
                            </label>

                            <label className="block">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</span>
                                <input
                                    type="email"
                                    disabled={!isEditing}
                                    value={user.email}
                                    className="mt-1 w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-semibold dark:text-white disabled:opacity-60 transition-all"
                                />
                            </label>
                        </div>

                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Bio</span>
                                <textarea
                                    rows="4"
                                    disabled={!isEditing}
                                    value={user.bio}
                                    onChange={(e) => setUser({...user, bio: e.target.value})}
                                    className="mt-1 w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-semibold dark:text-white disabled:opacity-60 transition-all resize-none"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Stats de progression */}
                    <div className="mt-10 grid grid-cols-2 gap-4">
                        <div className="p-6 bg-indigo-50 dark:bg-indigo-500/10 rounded-[2rem] border border-indigo-100 dark:border-indigo-500/20 text-center">
                            <p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Niveau actuel</p>
                            <p className="text-xl font-black text-indigo-900 dark:text-indigo-300">{user.level}</p>
                        </div>
                        <div className="p-6 bg-teal-50 dark:bg-teal-500/10 rounded-[2rem] border border-teal-100 dark:border-teal-500/20 text-center">
                            <p className="text-[10px] font-black text-teal-400 uppercase mb-1">Score Total</p>
                            <p className="text-xl font-black text-teal-900 dark:text-teal-300">{user.points} pts</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}