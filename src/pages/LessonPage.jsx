import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import lessonsData from '../data/lessonsData';

export default function LessonPage() {
    const { theme } = useParams();
    const themeData = lessonsData[theme.toLowerCase()];
    const [openLevel, setOpenLevel] = useState(null); // ID ou nom du level ouvert

    if (!themeData) {
        return <div className="p-8 text-red-500">Thème introuvable</div>;
    }

    const toggleLevel = (levelName) => {
        setOpenLevel(prev => (prev === levelName ? null : levelName));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-teal-800 mb-6">Leçons - {themeData.theme}</h1>

            {themeData.levels.map((level) => (
                <div key={level.name} className="mb-4 border rounded-xl overflow-hidden bg-white shadow">
                    <button
                        onClick={() => toggleLevel(level.name)}
                        className="w-full text-left px-6 py-4 bg-teal-100 hover:bg-teal-200 transition font-semibold text-teal-800"
                    >
                        {level.name}
                    </button>

                    {openLevel === level.name && (
                        <ul className="p-6 space-y-3">
                            {level.courses.map((course) => {
                                const courseUrl = `/lessons/${theme.toLowerCase()}/course/${course.id}`;
                                return (
                                    <li
                                        key={course.id}
                                        className="bg-gray-50 rounded-lg shadow p-4 hover:shadow-md transition"
                                    >
                                        <Link to={courseUrl} className="block">
                                            <span className="font-medium">{course.title}</span>
                                            <span className="ml-2 text-sm text-gray-500">
                                                ({course.type === 'jeu' ? '🎮 Jeu' : '📘 Cours'})
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
