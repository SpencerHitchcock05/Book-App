import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import booksRoutes from './components/books/books.routes.js';
import dotenv from 'dotenv';

dotenv.config()


const apiKey = process.env.GEMINI_KEY;


const genAI = new GoogleGenerativeAI(apiKey);

const app = express();
const PORT = 5000;

app.use(cors({origin: '*', methods: ['GET', 'POST']}));
app.use(express.json());

app.use('/books', booksRoutes);


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})