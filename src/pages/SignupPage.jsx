import React from "react";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Créer un compte</h2>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nom complet"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="email"
                        placeholder="Adresse email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition"
                    >
                        S'inscrire
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Déjà inscrit ? <a href="/login" className="text-teal-600 font-medium">Connexion</a>
                </p>
            </div>
        </div>
    );
}
