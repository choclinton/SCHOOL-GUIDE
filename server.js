import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Serve static files from dist
app.use(express.static(distPath));

// Fallback all SPA routes to index.html
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Build files missing. Ensure "Build Command" on Render is set to: npm install && npm run build');
  }
});

app.listen(PORT, () => {
  console.log(`IT Pathway CM server running on port ${PORT}`);
});
