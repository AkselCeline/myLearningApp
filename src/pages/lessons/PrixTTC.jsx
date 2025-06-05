import React, { useState } from 'react';

const tauxTVAOptions = [
    { label: '5.5%', value: 5.5 },
    { label: '10%', value: 10 },
    { label: '20%', value: 20 },
];

export default function AlgoPrixHTTTC() {
    const [prixHT, setPrixHT] = useState('');
    const [tauxTVA, setTauxTVA] = useState(20);
    const [prixTTC, setPrixTTC] = useState(null);
    const [erreur, setErreur] = useState('');

    const [algoLines, setAlgoLines] = useState(['']); // pour écrire l’algorithme
    const [algoResult, setAlgoResult] = useState(null);
    const [algoMessage, setAlgoMessage] = useState('');

    // Calcul du prix TTC avec explication algorithmique
    function calculerTTC() {
        setErreur('');
        setPrixTTC(null);
        const ht = parseFloat(prixHT.replace(',', '.'));
        if (isNaN(ht) || ht < 0) {
            setErreur('Veuillez entrer un prix HT valide (nombre positif)');
            return;
        }
        const taux = tauxTVA / 100;
        const ttc = ht * (1 + taux);
        setPrixTTC(ttc.toFixed(2));
    }

    // Validation ligne par ligne de l’algorithme écrit par l’utilisateur
    function validerAlgo() {
        // Algo attendu simplifié (pseudo-code) :
        // 1. lire prixHT
        // 2. lire tauxTVA
        // 3. calculer prixTTC = prixHT * (1 + tauxTVA / 100)
        // 4. afficher prixTTC

        const lignes = algoLines.map(l => l.trim().toLowerCase());

        const attendu = [
            ['lire', 'prixht'],
            ['lire', 'tva'], // on accepte aussi 'taux' ou 'taux de tva'
            ['prixttc', '=', 'prixht', '*', '(', '1', '+', 'tva', '/', '100', ')'],
            ['afficher', 'prixttc'],
        ];

        // Vérif simple ligne par ligne (tolérance minimale)
        let valide = true;
        if (lignes.length !== attendu.length) {
            valide = false;
        } else {
            for (let i = 0; i < attendu.length; i++) {
                for (let mot of attendu[i]) {
                    if (!lignes[i].includes(mot)) {
                        valide = false;
                        break;
                    }
                }
                if (!valide) break;
            }
        }

        if (valide) {
            setAlgoMessage('Bravo ! Ton algorithme est correct et suit bien la logique du calcul.');
        } else {
            setAlgoMessage("Il y a des erreurs dans ton algorithme. Essaie de suivre les étapes : lire les variables, calculer le TTC, afficher le résultat.");
        }
    }

    // Gestion de la saisie multi-lignes
    function handleAlgoChange(e) {
        setAlgoLines(e.target.value.split('\n'));
    }

    return (
        <div style={{ maxWidth: 500, margin: '30px auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>Apprenons les algorithmes : calcul Prix TTC à partir du Prix HT</h2>

            <section style={{ marginBottom: 20 }}>
                <h3>1. Comprendre la logique</h3>
                <p>Un algorithme est une suite d'instructions qui permettent d’arriver à un résultat.</p>
                <p>Ici, on veut calculer le prix TTC à partir du prix HT et du taux de TVA.</p>
                <p><strong>Formule :</strong> <em>Prix TTC = Prix HT × (1 + TVA / 100)</em></p>
            </section>

            <section style={{ marginBottom: 20 }}>
                <h3>2. Essayons le calcul directement</h3>
                <label>
                    Prix HT (€) :<br />
                    <input
                        type="text"
                        value={prixHT}
                        onChange={e => setPrixHT(e.target.value)}
                        placeholder="Ex : 100"
                        style={{ width: '100%', padding: 8, marginTop: 5, boxSizing: 'border-box' }}
                    />
                </label>

                <label style={{ display: 'block', marginTop: 10 }}>
                    Taux de TVA :<br />
                    <select
                        value={tauxTVA}
                        onChange={e => setTauxTVA(parseFloat(e.target.value))}
                        style={{ width: '100%', padding: 8, marginTop: 5 }}
                    >
                        {tauxTVAOptions.map(({ label, value }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </label>

                <button
                    onClick={calculerTTC}
                    style={{ marginTop: 15, padding: '10px 15px', fontSize: 16, cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 5 }}
                >
                    Calculer le prix TTC
                </button>

                {erreur && <p style={{ color: 'red', marginTop: 10 }}>{erreur}</p>}
                {prixTTC && !erreur && (
                    <p style={{ marginTop: 15, fontWeight: 'bold' }}>
                        Prix TTC = {prixTTC} €
                    </p>
                )}
            </section>

            <section style={{ marginBottom: 20 }}>
                <h3>3. Écris ton algorithme (ligne par ligne)</h3>
                <p>Exemple d'algorithme (pseudo-code) :</p>
                <pre style={{ background: '#f0f0f0', padding: 10, borderRadius: 5 }}>
{`lire prixHT
lire tva
prixTTC = prixHT * (1 + tva / 100)
afficher prixTTC`}
        </pre>
                <textarea
                    rows={6}
                    value={algoLines.join('\n')}
                    onChange={handleAlgoChange}
                    placeholder="Écris ici ton algorithme..."
                    style={{ width: '100%', padding: 10, fontFamily: 'monospace', fontSize: 14 }}
                />
                <button
                    onClick={validerAlgo}
                    style={{ marginTop: 10, padding: '10px 15px', fontSize: 16, cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 5 }}
                >
                    Valider mon algorithme
                </button>
                {algoMessage && (
                    <p style={{ marginTop: 15, fontWeight: 'bold', color: algoMessage.startsWith('Bravo') ? 'green' : 'red' }}>
                        {algoMessage}
                    </p>
                )}
            </section>

            <section style={{ fontSize: 14, color: '#555' }}>
                <h3>Pourquoi écrire un algorithme ?</h3>
                <p>Un algorithme décompose un problème en petites étapes claires et ordonnées.
                    Ici, on a : lire les données, calculer, puis afficher le résultat.</p>
                <p>Cette démarche est la base de la programmation et t’aide à penser comme un développeur.</p>
            </section>
        </div>
    );
}
