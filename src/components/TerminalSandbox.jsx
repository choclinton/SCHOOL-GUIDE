import React, { useState } from 'react';

const TerminalSandbox = ({ initialDir = '/home/student' }) => {
  const [history, setHistory] = useState([
    { text: 'Interactive Terminal Simulator (v1.0)', type: 'system' },
    { text: 'Type "help" to see available commands.', type: 'system' }
  ]);
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState(initialDir);
  const [fileSystem, setFileSystem] = useState({
    '/home/student': ['projects', 'notes.txt', 'script.py'],
    '/home/student/projects': ['my_first_app', 'website'],
    '/etc': ['nginx', 'hosts', 'resolv.conf']
  });

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newHistory = [...history, { text: `${currentDir} $ ${cmd}`, type: 'user' }];
    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1];

    switch (mainCmd) {
      case 'help':
        newHistory.push({ text: 'Supported commands: ls, pwd, cd, mkdir, cat, clear, help', type: 'output' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'pwd':
        newHistory.push({ text: currentDir, type: 'output' });
        break;
      case 'ls':
        const files = fileSystem[currentDir] || [];
        newHistory.push({ text: files.join('   ') || '(empty directory)', type: 'output' });
        break;
      case 'mkdir':
        if (!arg) {
          newHistory.push({ text: 'mkdir: missing operand', type: 'error' });
        } else {
          const currentFiles = fileSystem[currentDir] || [];
          setFileSystem({ ...fileSystem, [currentDir]: [...currentFiles, arg] });
          newHistory.push({ text: `Directory created: ${arg}`, type: 'output' });
        }
        break;
      case 'cat':
        if (!arg) {
          newHistory.push({ text: 'cat: missing filename', type: 'error' });
        } else if (arg === 'notes.txt') {
          newHistory.push({ text: 'Welcome to Cameroonian Tech Studies! Practice makes perfect.', type: 'output' });
        } else {
          newHistory.push({ text: `cat: ${arg}: No such file or directory`, type: 'error' });
        }
        break;
      case 'cd':
        if (!arg || arg === '~') {
          setCurrentDir('/home/student');
        } else if (arg === '..') {
          const parent = currentDir.substring(0, currentDir.lastIndexOf('/')) || '/';
          setCurrentDir(parent);
        } else {
          const target = currentDir === '/' ? `/${arg}` : `${currentDir}/${arg}`;
          if (fileSystem[target]) {
            setCurrentDir(target);
          } else {
            newHistory.push({ text: `cd: no such file or directory: ${arg}`, type: 'error' });
          }
        }
        break;
      default:
        newHistory.push({ text: `command not found: ${mainCmd}. Type "help" for options.`, type: 'error' });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div style={{ background: '#2E2623', color: '#FAF7F2', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-dark)', fontFamily: 'monospace', fontSize: '0.85rem', padding: '1rem', marginTop: '1rem' }}>
      <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '0.5rem' }}>
        {history.map((line, idx) => (
          <div key={idx} style={{ color: line.type === 'error' ? '#E57373' : line.type === 'system' ? '#B5A89E' : '#FAF7F2', marginBottom: '0.2rem' }}>
            {line.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#D9CFBD', marginRight: '0.5rem' }}>{currentDir} $</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ background: 'transparent', border: 'none', color: '#FAF7F2', outline: 'none', fontFamily: 'monospace', flex: 1, fontSize: '0.85rem' }}
          placeholder="Type command here..."
        />
      </form>
    </div>
  );
};

export default TerminalSandbox;
