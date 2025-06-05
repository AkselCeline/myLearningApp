import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate(); // Hook pour redirection

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-100 to-teal-300 px-4">
            <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center p-8 gap-8">
                <div className="flex flex-col flex-1 space-y-6">
                    <h1 className="text-4xl font-extrabold text-teal-800">
                        Apprends en t'amusant avec <br />
                        <span className="text-teal-600">My Learning App</span>
                    </h1>
                    <p className="text-teal-700 text-lg">
                        Explore des thèmes comme réseau, git, http, Java, Spring, sécurité... <br />
                        Grâce à des jeux et des quizz interactifs.
                    </p>
                    <button
                        className="self-start bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
                        onClick={() => navigate('/dashboard')} // ← Redirection
                    >
                        Accéder au tableau de bord
                    </button>
                </div>

                <div className="flex-1">
                    <img
                        src="/images/learning-illustration.png"
                        alt="Illustration apprentissage"
                        className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                    />
                </div>
            </div>
        </div>
    );
}
