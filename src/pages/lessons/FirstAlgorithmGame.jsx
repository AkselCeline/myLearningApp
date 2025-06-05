import React, { useState } from 'react';

const gridSize = 3;
const goalPosition = { x: 2, y: 0 }; // coin haut droit

const tournerDroite = dir => {
    const ordre = ['haut', 'droite', 'bas', 'gauche'];
    return ordre[(ordre.indexOf(dir) + 1) % 4];
};

const tournerGauche = dir => {
    const ordre = ['haut', 'gauche', 'bas', 'droite'];
    return ordre[(ordre.indexOf(dir) + 1) % 4];
};

export default function FirstAlgorithmGame() {
    const [code, setCode] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 2 });
    const [direction, setDirection] = useState('haut');
    const [message, setMessage] = useState('');

    function runCode() {
        let pos = { ...position };
        let dir = direction;

        const commands = code
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        for (let cmd of commands) {
            if (cmd === 'avancer()') {
                if (dir === 'haut') pos.y -= 1;
                else if (dir === 'bas') pos.y += 1;
                else if (dir === 'gauche') pos.x -= 1;
                else if (dir === 'droite') pos.x += 1;
            } else if (cmd === 'tournerDroite()') {
                dir = tournerDroite(dir);
            } else if (cmd === 'tournerGauche()') {
                dir = tournerGauche(dir);
            } else {
                setMessage(`Commande inconnue : ${cmd}`);
                return;
            }

            if (pos.x < 0 || pos.x >= gridSize || pos.y < 0 || pos.y >= gridSize) {
                setMessage('❌ Le robot est sorti de la grille !');
                return;
            }
        }

        setPosition(pos);
        setDirection(dir);

        if (pos.x === goalPosition.x && pos.y === goalPosition.y) {
            setMessage('🎉 Bravo ! Le robot est arrivé à destination !');
        } else {
            setMessage('🙈 Le robot n’est pas encore arrivé. Réessaie !');
        }
    }

    const renderGrid = () => {
        let rows = [];
        for (let y = 0; y < gridSize; y++) {
            let cells = [];
            for (let x = 0; x < gridSize; x++) {
                let content = null;
                if (position.x === x && position.y === y) {
                    const dirEmoji = {
                        haut: '⬆️',
                        bas: '⬇️',
                        gauche: '⬅️',
                        droite: '➡️',
                    };
                    content = (
                        <span role="img" aria-label="robot">
              🤖{dirEmoji[direction]}
            </span>
                    );
                } else if (goalPosition.x === x && goalPosition.y === y) {
                    content = <span role="img" aria-label="drapeau">🚩</span>;
                }
                cells.push(
                    <td
                        key={`${x}-${y}`}
                        style={{
                            border: '1px solid black',
                            width: 60,
                            height: 60,
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            fontSize: '24px',
                            backgroundColor: '#f0f0f0',
                        }}
                    >
                        {content}
                    </td>
                );
            }
            rows.push(<tr key={y}>{cells}</tr>);
        }
        return (
            <table
                style={{
                    borderCollapse: 'collapse',
                    margin: '20px auto',
                    userSelect: 'none',
                }}
            >
                <tbody>{rows}</tbody>
            </table>
        );
    };

    return (
        <div
            style={{
                maxWidth: 400,
                margin: '30px auto',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                color: '#333',
            }}
        >
            <h1>🤖 Écris ton premier algorithme</h1>

            {/* Mini tutoriel */}
            <section
                style={{
                    backgroundColor: '#e0f7fa',
                    padding: 15,
                    borderRadius: 8,
                    marginBottom: 20,
                    fontSize: 14,
                    lineHeight: '1.4em',
                    textAlign: 'left',
                }}
            >
                <h2 style={{ fontSize: 18, marginBottom: 8 }}>📚 Mini tutoriel</h2>
                <p>
                    Le robot commence en bas à gauche, face vers le haut. Tu dois l'amener au 🚩 en haut à droite.
                </p>
                <p>Voici les commandes que tu peux utiliser (une par ligne) :</p>
                <ul>
                    <li>
                        <b>avancer()</b> : avance d’une case dans la direction actuelle.
                    </li>
                    <li>
                        <b>tournerDroite()</b> : tourne le robot de 90° vers la droite (sens horaire).
                    </li>
                    <li>
                        <b>tournerGauche()</b> : tourne le robot de 90° vers la gauche (sens antihoraire).
                    </li>
                </ul>
                <p>
                    <b>Exemple :</b>
                    <br />
                    <code>
                        avancer()<br />
                        avancer()<br />
                        tournerDroite()<br />
                        avancer()<br />
                        avancer()
                    </code>
                    <br />
                    Ce programme fera avancer le robot vers le haut, puis tourner à droite et avancer vers la droite jusqu’au drapeau.
                </p>
            </section>

            <textarea
                rows={6}
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder={`avancer()\ntournerDroite()\navancer()`}
                style={{ width: '100%', fontFamily: 'monospace', padding: 8, fontSize: 16 }}
            />

            <button
                onClick={runCode}
                style={{
                    marginTop: 15,
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    fontSize: 16,
                }}
            >
                Lancer
            </button>

            <div style={{ marginTop: 20, fontWeight: 'bold', minHeight: 24 }}>{message}</div>

            {renderGrid()}
        </div>
    );
}
