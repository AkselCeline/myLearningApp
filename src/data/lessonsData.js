// data/lessonsData.js
import ConditionIntro from "../pages/lessons/algo/ConditionIntro";

const lessonsData = {
    java: {
        theme: "Java",
        levels: [
            {
                name: "Débutant",
                courses: [
                    {
                        id: 1,
                        title: "Introduction à Java",
                        type: "cours",
                        content: "Java est un langage orienté objet très populaire...",
                    },
                    {
                        id: 2,
                        title: "Variables et types",
                        type: "cours",
                        content: "Les variables en Java permettent de stocker des données...",
                    },
                    {
                        id: 3,
                        title: "Jeu : Quiz Java",
                        type: "jeu",
                        content: {
                            questions: [
                                {
                                    question: "Quel est le type de variable pour un nombre entier ?",
                                    options: ["int", "String", "boolean"],
                                    answer: 0,
                                },
                                {
                                    question: "Quelle est la bonne façon de déclarer une variable ?",
                                    options: ["int x = 5;", "var x 5;", "x := 5;"],
                                    answer: 0,
                                },
                            ],
                        },
                    },
                ],
            },
            // niveaux intermédiaire, etc.
        ],
    },

    git: {
        theme: "Git",
        levels: [
            {
                name: "Débutant",
                courses: [
                    { id: 1, title: "Qu'est-ce que Git ?", type: "cours" },
                    { id: 2, title: "Git init / Git add", type: "cours" },
                ],
            },
        ],
    },

    algorithme: {
        theme: "Algorithme",
        levels: [
            {
                name: "Débutant – Les bases de la logique",
                courses: [
                    { id: 1, title: "Qu’est-ce qu’un algorithme ?", type: "cours",  component: "AlgorithmeIntro" },
                    { id: 2, title: "Conditions : si… alors… sinon…", type: "cours",  component: "ConditionIntro" },
                    { id: 3, title: "Boucles : répéter facilement une action", type: "cours",  component: "BoucleIntro" },
                    // { id: 15, title: "LoopAnimation – Jeu sur les boucles", type: "jeux",  component: "LoopAnimation" },
                    { id: 4, title: "Les variables : stocker et réutiliser des valeurs", type: "cours",  component: "VariableIntro" },
                    { id: 5, title: "Fonctions : regrouper des instructions", type: "cours",  component: "FonctionIntro" },
                    { id: 6, title: "Les Tableaux (Arrays)", type: "cours",  component: "TableauIntro" },
                    { id: 7, title: "Donjon de l'Algo", type: "jeux",  component: "AlgoRevision" }
                ],

            },
            {
                name: "Débutant + – Premiers pas en code",
                courses: [
                    { id: 7, title: "Afficher un message avec console.log", type: "cours",  component: "ConsoleLogIntro" },
                    { id: 8, title: "Let Variables — Créer et utiliser une variable", type: "cours",  component: "LetVariablesIntro" },
                    { id: 9, title: "If Condition — Prendre des décisions", type: "cours",  component: "IfConditionIntro" },
                    { id: 10, title: "Écris ton premier algorithme !", type: "jeu",  component: "FirstAlgorithmGame" },
                ],

            },
            {
                name: "Débutant ++ – Appliquer la logique",
                courses: [
                    { id: 11, title: "Défi : inverser deux variables", type: "jeu",  component: "InverserVariables" },
                    { id: 12, title: "Calculer un prix TTC et HT", type: "cours",  component: "PrixTTC" },
                    { id: 13, title: "Est-ce une année bissextile ?", type: "cours",  component: "LeapYearLesson" },
                    { id: 14, title: "📥 Saisir un nombre entre 1 et 10", type: "jeu",  component: "InputRangeLesson" },
                    { id: 16, title: "Positif, négatif ou nul ?", type: "cours",  component: "PositiveNegativeLesson" },
                    { id: 17, title: "Trier par ordre alphabétique", type: "cours",  component: "AlphabetOrderLesson" },
                    { id: 18, title: "Pair ou Impair", type: "cours",  component: "EvenOddLesson" },


                ],

            },
        ],
    },

    html: {
        theme: "html",
        levels: [
            {
                name: "Débutant – Les bases de HTML",
                courses: [
                    {id: 1, title: "Le HTML, ce sont les murs et les poutres. Sans lui, rien ne tient", type: "cours", component: "HtmlIntro"},
                    {id: 2, title: "Le CSS - Donner du Style", type: "cours", component: "CssIntro"},
                    {id: 3, title: "Le CSS - Le Box Model", type: "cours", component: "BoxModelIntro"},
                    {id: 4, title: "Projet Pratique : La Carte de Profil de Développeur", type: "jeux", component: "ProjetCarteProfil"},

                ],
            }
        ]
    }

    // Tu peux ajouter HTTP, Spring, etc. de la même manière
};

export default lessonsData;
