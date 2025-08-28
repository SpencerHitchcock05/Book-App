import { GoogleGenerativeAI } from '@google/generative-ai';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import db from '../../db/connection.js';
import { amazonScrape } from './books.service.js';

dotenv.config();

const apiKey = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

export const getBooks = async (req, res) => {
    const parameter = req.body.text;
    const { userId } = req.query;

    console.log(parameter)

    let userBooks;

    if (userId) {
        try {
            console.log(userId)
            const [rows] = await db.execute('SELECT title, author FROM user_books WHERE user_id = ?', [userId]);
            console.log(rows)
            userBooks = rows
        } catch (error) {
            userBooks = undefined
            console.error(error)
        }  
    }

    console.log(userBooks)

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generation_config: {"response_mime_type": "application/json"} });    

    const prompt = `

        You are giving book suggestions in an app based on the preferences of a user. 
        this user has already inputted what some of they're preferences are and they are the following

        ${parameter.genre ? `the user wants to see books that are from the following genres: ${parameter.genre}` : ''}

        ${parameter.book ? `the user wants books that similar to the following books: ${parameter.book}` : ''} 
        
        ${parameter.author ? `the user likes books from the following author, do not only include books from these authors: ${parameter.author}` : ''} 
        
        ${parameter.age ? `the user wants the books to be in this age range: ${parameter.age}` : ''} 

        ${parameter.misc ? `these are some random preferences that the user wants: ${parameter.misc}` : ''} 

        ${userBooks ? `this is a list of books the user is already interested in, DO NOT recommend ANY of these books!: ${userBooks.map(book => `[${book.title}, ${book.author}] `)}` : ''}

        please give 10 to 20 recomendations based off of these parameters, try to make the books interesting and something that the user has not already read

        please give these book recomendations in the form a JSON file. 

        use the following JSON format:

        Recomendation = {'title': string, 'author' : string, 'description': string, 'longDescription': string}
        Return: Array<Recomendation>

        please don't include any comment code
        
        thank you very much.
    
    
    `;

    console.log(prompt)

    const result = await model.generateContent(prompt);

    const text = result.response.text()
    
    const books = JSON.parse(text.substring(7, text.length - 4));

    const browser = await puppeteer.launch({ headless: true });
    
    const promises = []

    for (let i = books.length - 1; i >= 0; i--) {
        promises.push(amazonScrape(browser, books, i))
    }

    await Promise.allSettled(promises);

    await browser.close()
 
    res.json(books);

}

function clean(input) {
  return input.replace(/[\s\p{P}]+/gu, '').toLowerCase();
}

export const addUserBooks = async (req, res) => {
    const { userId, books } = req.body

    try {
        const [rows] = await db.execute('SELECT title, author FROM user_books WHERE user_id = ?', [userId]);
        
        await Promise.all(
            books.map(async book => {
                let duplicate = false;

                for (const userBook of rows) {
                    if (
                        clean(userBook.title) === clean(book.title) ||
                        clean(userBook.author) === clean(book.author)
                    ) {
                        duplicate = true;
                        break;
                    }
                }

                if (!duplicate) {
                    await db.execute(
                        'INSERT INTO user_books (user_id, title, author, description, image, rating, url) VALUES (?,?,?,?,?,?,?)',
                        [userId, book.title, book.author, book.description, book.image, book.rating, book.url]
                    );
                }
            })
        );


        res.status(201).json({data: "success"});
    } catch(error) {
        res.status(500).json({data: "failure", error})
    }
}

export const getUserBooks = async (req, res) => {
    const { userId } = req.query;

    try {
        const [rows] = await db.execute('SELECT title, author, description, image, rating, url FROM user_books WHERE user_id = ?', [userId]);

        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({data: "failure", error})
    }
}