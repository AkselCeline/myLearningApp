import React, { useState } from 'react';

export default function InverserVariables() {
    const [a, setA] = useState(5);
    const [b, setB] = useState(10);
    const [message, setMessage] = useState('');

    function echanger() {
        // échange classique avec variable temporaire
        let temp = a;
        setA(b);
        setB(temp);
        setMessage('Les variables ont été inversées !');
    }

    function reset() {
        setA(5);
        setB(10);
        setMessage('');
    }

    return (
        <div style={{ maxWidth: 300, margin: '30px auto', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h2>Inverser deux variables</h2>
            <p>
                Voici deux variables avec leurs valeurs :
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
                <div style={{ padding: 10, border: '2px solid #007bff', borderRadius: 8 }}>
                    <strong>a</strong>
                    <div style={{ fontSize: 24, marginTop: 10 }}>{a}</div>
                </div>
                <div style={{ padding: 10, border: '2px solid #28a745', borderRadius: 8 }}>
                    <strong>b</strong>
                    <div style={{ fontSize: 24, marginTop: 10 }}>{b}</div>
                </div>
            </div>

            <button
                onClick={echanger}
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: 5,
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: 10,
                    fontSize: 16,
                }}
            >
                Inverser a et b
            </button>

            <button
                onClick={reset}
                style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: 5,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16,
                }}
            >
                Réinitialiser
            </button>

            {message && (
                <p style={{ marginTop: 20, fontWeight: 'bold', color: '#28a745' }}>
                    {message}
                </p>
            )}

            <div style={{ marginTop: 30, fontSize: 14, textAlign: 'left' }}>
                <h3>Explication</h3>
                <p>
                    Pour échanger deux variables, on utilise une variable temporaire qui stocke la valeur de la première.
                    Ensuite, on met la valeur de la deuxième dans la première, puis la valeur sauvegardée dans la deuxième.
                </p>
                <pre style={{ background: '#f8f9fa', padding: 10, borderRadius: 4 }}>
          {`let temp = a;
a = b;
b = temp;`}
        </pre>
                <p>
                    C’est un peu comme utiliser une boîte temporaire pour garder une valeur le temps de faire l’échange.
                </p>
            </div>
        </div>
    );
}
