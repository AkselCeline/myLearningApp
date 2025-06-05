import React from "react";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Connexion</h2>
                <form className="space-y-4">
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
                        Se connecter
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Pas encore de compte ? <a href="/signup" className="text-teal-600 font-medium">Créer un compte</a>
                </p>
            </div>
        </div>
    );
}
