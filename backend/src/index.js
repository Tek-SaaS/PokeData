const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS: permitir localhost y tu frontend de Vercel (cuando lo sepas)
const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  process.env.FRONTEND_URL // ej: 'https://tu-app.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS no permitido'));
    }
  }
}));
app.use(express.json());

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// 1. Obtener un Pokémon por nombre o ID
app.get('/api/pokemon/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!resp.ok) return res.status(resp.status).json({ error: 'Pokémon no encontrado' });
    const data = await resp.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Error interno' });
  }
});

// 2. Listado de Pokémon (con paginación)
app.get('/api/pokemon', async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await resp.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Error interno' });
  }
});

// 3. Especie de un Pokémon
app.get('/api/pokemon-species/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!resp.ok) return res.status(resp.status).json({ error: 'Especie no encontrada' });
    const data = await resp.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Error interno' });
  }
});

// 4. Cadena de evolución
app.get('/api/evolution-chain/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
    if (!resp.ok) return res.status(resp.status).json({ error: 'Cadena no encontrada' });
    const data = await resp.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Error interno' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});