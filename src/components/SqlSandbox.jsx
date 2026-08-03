import React, { useState } from 'react';

const MOCK_TABLES = {
  users: [
    { id: 1, name: 'Marie-Claire', city: 'Douala', track: 'Web Development' },
    { id: 2, name: 'Junior', city: 'Buea', track: 'Mobile Development' },
    { id: 3, name: 'Achille', city: 'Yaounde', track: 'Cybersecurity' }
  ],
  restaurants: [
    { id: 101, name: 'Le Repas', city: 'Douala', rating: 4.5 },
    { id: 102, name: 'Maison de Saveur', city: 'Yaounde', rating: 4.8 },
    { id: 103, name: 'Silicon Cafe', city: 'Buea', rating: 4.2 }
  ]
};

const SqlSandbox = () => {
  const [query, setQuery] = useState('SELECT * FROM users');
  const [result, setResult] = useState(MOCK_TABLES.users);
  const [error, setError] = useState('');

  const handleRunQuery = (e) => {
    e.preventDefault();
    setError('');
    const cleanCmd = query.trim().toLowerCase();

    if (cleanCmd.includes('from users')) {
      setResult(MOCK_TABLES.users);
    } else if (cleanCmd.includes('from restaurants')) {
      setResult(MOCK_TABLES.restaurants);
    } else {
      setError('Query error: Table not found. Try "SELECT * FROM users" or "SELECT * FROM restaurants"');
      setResult(null);
    }
  };

  return (
    <div style={{ marginTop: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem', background: 'var(--card-bg-subtle)' }}>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
        SQL Query Simulator (Available tables: <code>users</code>, <code>restaurants</code>)
      </div>
      <form onSubmit={handleRunQuery} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.85rem' }}
        />
        <button type="submit" className="btn btn-primary btn-sm">Run Query</button>
      </form>

      {error && <div style={{ color: '#A8322D', fontSize: '0.85rem' }}>{error}</div>}

      {result && result.length > 0 && (
        <div style={{ overflowX: 'auto', background: 'white', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textStyle: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--primary-light)', borderBottom: '1px solid var(--border)' }}>
                {Object.keys(result[0]).map((key) => (
                  <th key={key} style={{ padding: '0.4rem 0.6rem', textAlign: 'left', color: 'var(--primary)' }}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} style={{ padding: '0.4rem 0.6rem' }}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SqlSandbox;
