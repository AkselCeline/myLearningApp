import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const themes = [
        { name: "Algorithme", progress: 60 },
        { name: "Git", progress: 60 },
        { name: "HTTP", progress: 40 },
        { name: "Java", progress: 20 },
        { name: "Spring", progress: 10 },
        { name: "Sécurité", progress: 0 },
    ];

    const badges = [
        { name: "Algorithme", unlocked: false },
        { name: "Débutant Git", unlocked: true },
        { name: "HTTP Explorer", unlocked: true },
        { name: "Ninja Java", unlocked: false },
        { name: "Spring Starter", unlocked: false },
        { name: "Cyber Sécurité", unlocked: false },
    ];

    const totalXP = themes.reduce((sum, t) => sum + t.progress, 0);
    const level = Math.floor(totalXP / 100);
    const nextLevelProgress = totalXP % 100;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-teal-800 mb-6">Tableau de bord</h1>

            {/* Niveau global */}
            <div className="mb-8 bg-white p-6 rounded-2xl shadow text-center">
                <h2 className="text-xl font-semibold text-teal-700 mb-2">Niveau global</h2>
                <p className="text-2xl font-bold text-teal-600">Niveau {level}</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                    <div
                        className="bg-teal-500 h-4 rounded-full"
                        style={{ width: `${nextLevelProgress}%` }}
                    ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{nextLevelProgress}% vers le prochain niveau</p>
            </div>

            {/* Progression par thème */}
            <div className="grid gap-6 md:grid-cols-2 mb-12">
                {themes.map((theme) => (
                    <Link
                        key={theme.name}
                        to={`/lessons/${theme.name.toLowerCase()}`}
                        className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition block"
                    >
                        <h2 className="text-xl font-semibold text-teal-700 mb-2">{theme.name}</h2>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-teal-500 h-4 rounded-full"
                                style={{ width: `${theme.progress}%` }}
                            ></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{theme.progress}% complété</p>
                    </Link>
                ))}
            </div>

            {/* Badges */}
            <div>
                <h2 className="text-xl font-semibold text-teal-700 mb-4">Badges débloqués</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {badges.map((badge) => (
                        <div
                            key={badge.name}
                            className={`p-4 rounded-lg border shadow text-center text-sm ${
                                badge.unlocked ? "bg-teal-100 text-teal-800" : "bg-gray-100 text-gray-400"
                            }`}
                        >
                            <p>{badge.name}</p>
                            <p className="mt-1">
                                {badge.unlocked ? "✅ Débloqué" : "🔒 Verrouillé"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
