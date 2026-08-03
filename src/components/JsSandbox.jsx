import React, { useState } from 'react';

const JsSandbox = ({ initialCode = `// Write JavaScript here and click Run\nconsole.log("Hello from Cameroon!");` }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState([]);

  const handleRun = () => {
    const logs = [];
    const fakeConsole = {
      log: (...args) => logs.push({ type: 'log', msg: args.join(' ') }),
      error: (...args) => logs.push({ type: 'error', msg: args.join(' ') }),
      warn: (...args) => logs.push({ type: 'warn', msg: args.join(' ') }),
    };

    try {
      const fn = new Function('console', code);
      fn(fakeConsole);
      setOutput(logs.length > 0 ? logs : [{ type: 'log', msg: '(No output — add console.log() to see results)' }]);
    } catch (err) {
      setOutput([{ type: 'error', msg: `ReferenceError: ${err.message}` }]);
    }
  };

  return (
    <div style={{ marginTop: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg-subtle)', padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>JavaScript Sandbox</span>
        <button className="btn btn-primary btn-sm" onClick={handleRun}>Run Code</button>
      </div>

      {/* Editor */}
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
        style={{
          width: '100%',
          minHeight: '140px',
          padding: '0.75rem',
          border: 'none',
          borderBottom: '1px solid var(--border)',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          resize: 'vertical',
          outline: 'none',
          background: '#FAFAFA',
          lineHeight: 1.6
        }}
      />

      {/* Console Output */}
      <div style={{ background: '#2E2623', minHeight: '60px', padding: '0.75rem' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#B5A89E', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Console Output</div>
        {output.length === 0 ? (
          <div style={{ color: '#B5A89E', fontFamily: 'monospace', fontSize: '0.82rem' }}>Click "Run Code" to see output...</div>
        ) : output.map((line, i) => (
          <div key={i} style={{
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: line.type === 'error' ? '#E57373' : line.type === 'warn' ? '#FFB74D' : '#E8F0E6',
            marginBottom: '0.2rem'
          }}>
            {line.type === 'error' ? 'Error: ' : '> '}{line.msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JsSandbox;
