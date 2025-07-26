import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import booksRoutes from './components/books/books.routes.js';
import authRoutes from './components/auth/auth.routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config()


const apiKey = process.env.GEMINI_KEY;


const genAI = new GoogleGenerativeAI(apiKey);

const app = express();
const PORT = process.env.API_PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Request-With'],
    credentials: true})
);
app.options('*', cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/users', authRoutes);
app.use('/books', booksRoutes);


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})