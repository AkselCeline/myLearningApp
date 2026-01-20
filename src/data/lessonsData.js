// data/lessonsData.js
import ConditionIntro from "../pages/lessons/algo/ConditionIntro";

const lessonsData = {
    java: {
        id: "java",
        theme: "Java",
        icon: "☕",
        color: "from-blue-600 to-cyan-700",
        levels: [
            {
                name: "Débutant – Les Fondations",
                courses: [
                    { id: 1, title: "Java : Pourquoi ce langage ?", type: "cours", component: "JavaIntro" },
                    { id: 2, title: "La Machine Virtuelle (JVM)", type: "cours", component: "JavaJvm" },
                    { id: 3, title: "Variables & Types Stricts", type: "cours", component: "JavaVariables" },
                    { id: 4, title: "Les Tableaux : Listes Rigides", type: "cours", component: "JavaArrays" },
                    { id: 5, title: "🏆 Quiz Final : Java", type: "jeux", component: "JavaQuiz" },
                ],
            }
        ]
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
    },

    JavaScript: {
        theme: "JavaScript",
        levels: [
            {
                name: "Débutant – JavaScript Interactif",
                courses: [
                    { id: 1, title: "JS : Hello World !", type: "cours", component: "JsBasics"},
                    { id: 2, title: "Les Événements : Réagir au clic", type: "cours", component: "JsEvents" },
                    { id: 3, title: "DOM : Créer des éléments magiques", type: "cours", component: "JsDom" },
                    { id: 4, title: "Mini-Projet : Compteur de Clics", type: "jeux", component: "JsCounter" },
                    { id: 5, title: "🏆 Quiz Final : JavaScript", type: "jeux", component: "JsQuiz" },                ],
            }
        ]
    },

    git: {
        id: "git",
        theme: "Git",
        icon: "📜",
        color: "from-orange-600 to-rose-700",
        levels: [
            {
                name: "Débutant – Sauvegarder son code",
                courses: [
                    { id: 1, title: "Qu'est-ce que Git ?", type: "cours", component: "GitIntro" },
                    { id: 2, title: "Le Commit : Enregistrer une étape", type: "cours", component: "GitCommit" },
                    { id: 3, title: "GitHub & Push : Partager son travail", type: "cours", component: "GitPush" },
                    { id: 4, title: "⌨️ Défi : Le Terminal Git", type: "jeux", component: "GitTerminalGame" },
                ],
            }
        ]
    },



    // Tu peux ajouter HTTP, Spring, etc. de la même manière
};

export default lessonsData;
