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
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-teal-800 mb-6">Mon Profil</h1>
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row items-center gap-8">
                <img
                    src={user.avatarUrl}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full border-4 border-teal-300"
                />

                <div className="flex-1 space-y-2">
                    <h2 className="text-2xl font-semibold text-teal-700">{user.username}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">Membre depuis le {new Date(user.joinedAt).toLocaleDateString("fr-FR")}</p>

                    <div className="mt-4">
                        <p className="font-semibold text-gray-700">Niveau : <span className="text-teal-600">{user.level}</span></p>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                            <div
                                className="bg-teal-500 h-4 rounded-full"
                                style={{ width: `${user.totalXP % 100}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{user.totalXP % 100}% vers le prochain niveau</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
