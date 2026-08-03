import React, { useState } from 'react';

const HtmlSandbox = ({ initialCode = `<h1>Hello Cameroon!</h1>\n<p>Edit this HTML to see live changes in cream & beige style.</p>` }) => {
  const [code, setCode] = useState(initialCode);

  return (
    <div style={{ marginTop: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--card-bg-subtle)' }}>
        <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
          HTML / CSS Editor
        </div>
        <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
          Live Browser Output
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '180px' }}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: '100%', height: '100%', padding: '0.75rem', border: 'none', borderRight: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.85rem', resize: 'none', outline: 'none', background: '#FAFAFA' }}
        />
        <iframe
          title="live-preview"
          srcDoc={`<html><head><style>body{font-family:sans-serif;padding:12px;margin:0;color:#2A221E;background:#FAF8F5;}</style></head><body>${code}</body></html>`}
          style={{ width: '100%', height: '100%', border: 'none', background: '#FAF8F5' }}
        />
      </div>
    </div>
  );
};

export default HtmlSandbox;
