import React from "react";

export default function Profile() {
    const user = {
        username: "CodeAventurier",
        email: "aventurier@code.com",
        level: 3,
        totalXP: 280,
        avatarUrl: "https://i.pravatar.cc/150?img=15",
        joinedAt: "2024-09-12",
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-slate-900 mb-10">Mon Profil</h1>

                <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
                    {/* Header du profil avec bannière colorée */}
                    <div className="h-32 bg-gradient-to-r from-teal-400 to-emerald-500 w-full" />

                    <div className="px-8 pb-10 -mt-16 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                        <img
                            src={user.avatarUrl}
                            alt="Avatar"
                            className="w-40 h-40 rounded-[2.5rem] border-8 border-white shadow-lg object-cover"
                        />
                        <div className="pb-4 flex-1">
                            <h2 className="text-3xl font-black text-slate-900">{user.username}</h2>
                            <p className="text-slate-500 font-medium">{user.email}</p>
                        </div>
                        <div className="pb-4">
                            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-xl transition-all">
                                Éditer le profil
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-slate-50/50">
                        {/* Carte XP */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Points d'XP</span>
                            <p className="text-3xl font-black text-teal-600 mt-1">{user.totalXP} XP</p>
                            <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${user.totalXP % 100}%` }}></div>
                            </div>
                        </div>

                        {/* Carte Niveau */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Niveau actuel</span>
                            <div className="text-5xl font-black text-slate-900 mt-1 tracking-tighter">Lvl {user.level}</div>
                        </div>

                        {/* Carte Date */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Aventure commencée</span>
                            <p className="text-xl font-bold text-slate-700 mt-2">
                                {new Date(user.joinedAt).toLocaleDateString("fr-FR", { month: 'long', year: 'numeric' })}
                            </p>
                            <p className="text-slate-400 text-sm italic">Soit plus de 1 an d'apprentissage !</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
