import express from 'express';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/users';
import postRoutes from './routes/posts';
import offerRoutes from './routes/offers';
import locationRoutes from './routes/location';

interface StorageFile {
    name: string;
    id?: string;
    metadata?: Record<string, any>;
}

const fs = require('fs');
const supabase = require('./lib/supabaseClient');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3002', // Allow requests only from your Next.js frontend
  credentials: true,               // Allow sending and receiving cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers your frontend might send
}));
app.use(cookieParser());


// app.use('/api', routes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/offer', offerRoutes);
app.use('/api/location', locationRoutes);

app.get('/', (_req, res) => {
    res.send('Hello from TypeScript Express!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// app.get('/upload.html', (_req, res) => {
//     res.sendFile(path.join(publicPath, 'upload.html'));
// });