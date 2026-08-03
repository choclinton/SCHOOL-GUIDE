import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use the PORT environment variable provided by Render, fallback to 3000
const PORT = process.env.PORT || 3000;

// Serve all static files from the dist folder (built React app)
app.use(express.static(path.join(__dirname, 'dist')));

// For any route not found in dist (React Router routes like /dashboard, /blueprint/:id etc.)
// send back index.html so React Router can handle client-side navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`IT Pathway CM server running on port ${PORT}`);
});
