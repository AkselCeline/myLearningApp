import React, { useState } from 'react';

const weatherConditions = [
    {
        id: 1,
        condition: 'Il pleut',
        actions: ['Prendre un parapluie', 'Mettre des lunettes de soleil', 'Mettre un manteau'],
        correctAction: 'Prendre un parapluie',
    },
    {
        id: 2,
        condition: 'Il fait soleil',
        actions: ['Mettre des lunettes de soleil', 'Prendre un parapluie', 'Mettre un manteau'],
        correctAction: 'Mettre des lunettes de soleil',
    },
    {
        id: 3,
        condition: 'Il fait froid',
        actions: ['Mettre un manteau', 'Prendre un parapluie', 'Mettre des lunettes de soleil'],
        correctAction: 'Mettre un manteau',
    },
];

export default function ConditionIntroComplet() {
    // Pour quiz simple
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);

    // Pour jeu d’association
    const [selectedWeather, setSelectedWeather] = useState(null);
    const [selectedAction, setSelectedAction] = useState('');
    const [gameFeedback, setGameFeedback] = useState('');

    function handleQuizSubmit(e) {
        e.preventDefault();
        if (quizAnswer.toLowerCase().trim() === 'prendre un parapluie') {
            setQuizResult(true);
        } else {
            setQuizResult(false);
        }
    }

    function handleActionSelect(action) {
        setSelectedAction(action);
        setGameFeedback('');
    }

    function validateChoice() {
        if (!selectedWeather) {
            setGameFeedback("Choisis d'abord une météo !");
            return;
        }
        const correctAction = weatherConditions.find(w => w.condition === selectedWeather).correctAction;
        if (selectedAction === correctAction) {
            setGameFeedback("🎉 Bravo ! C'est la bonne action.");
        } else {
            setGameFeedback("❌ Ce n'est pas la bonne action, essaie encore.");
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-8 font-sans">
            {/* Définition */}
            <p className="text-lg">
                Une condition dans un algorithme, c’est une question qui guide les actions à faire. Par exemple :
                <strong> Si </strong> il pleut, <strong> alors </strong> je prends un parapluie.
            </p>

            {/* Exemple */}
            <h2 className="text-2xl font-semibold mt-6">Exemple : Que faire selon la météo ?</h2>
            <ul className="list-disc list-inside space-y-1">
                {weatherConditions.map(({ id, condition, correctAction }) => (
                    <li key={id}>
                        {condition} → {correctAction}
                    </li>
                ))}
            </ul>

            {/* Mini quiz */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold">Quiz rapide</h3>
                <form onSubmit={handleQuizSubmit} className="mt-2 space-y-2">
                    <label className="block">
                        Si « Il pleut », que dois-tu faire ?
                        <input
                            type="text"
                            className="block border border-gray-400 rounded px-2 py-1 mt-1 w-full"
                            value={quizAnswer}
                            onChange={(e) => setQuizAnswer(e.target.value)}
                            placeholder="Écris ta réponse ici"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Valider
                    </button>
                </form>
                {quizResult === true && <p className="mt-2 text-green-600 font-semibold">Bravo ! C’est la bonne réponse.</p>}
                {quizResult === false && <p className="mt-2 text-red-600 font-semibold">Essaie encore :)</p>}
            </section>

            {/* Jeu interactif */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Associe la bonne action à la météo</h3>
                <p>Clique sur une météo :</p>
                <div className="flex gap-4 mb-4">
                    {weatherConditions.map(({ id, condition }) => (
                        <button
                            key={id}
                            onClick={() => {
                                setSelectedWeather(condition);
                                setSelectedAction('');
                                setGameFeedback('');
                            }}
                            className={`px-4 py-2 rounded border ${
                                selectedWeather === condition ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                            } transition`}
                        >
                            {condition}
                        </button>
                    ))}
                </div>

                {selectedWeather && (
                    <>
                        <p className="mb-2">
                            Choisis l'action adaptée pour : <strong>{selectedWeather}</strong>
                        </p>
                        <div className="flex flex-col gap-2">
                            {weatherConditions.find((w) => w.condition === selectedWeather).actions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleActionSelect(action)}
                                    className={`px-4 py-2 rounded border text-left ${
                                        selectedAction === action ? 'bg-green-400 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                    } transition`}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={validateChoice}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                            disabled={!selectedAction}
                        >
                            Valider
                        </button>
                        {gameFeedback && (
                            <p className={`mt-2 font-semibold ${gameFeedback.startsWith('🎉') ? 'text-green-600' : 'text-red-600'}`}>
                                {gameFeedback}
                            </p>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
